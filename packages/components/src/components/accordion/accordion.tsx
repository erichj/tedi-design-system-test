import cn from 'classnames';
import React from 'react';

import styles from './accordion.module.scss';

export interface AccordionProps {
  /**
   * Accordion children
   */
  children?: React.ReactNode;
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Open item's property. Used to control the openItems outside the components.
   * Should be used with onToggle function
   */
  openItem?: string[];
  /**
   * onToggle handler.
   */
  onToggleItem?: (id: string) => void;
  /**
   * The list of IDs items that should be open by default
   */
  defaultOpenItem?: string[];
}

export interface IAccordionContext {
  isOpen: (id: string) => boolean;
  onToggle: (id: string) => void;
}

export const AccordionContext = React.createContext<IAccordionContext>({
  isOpen: () => true,
  onToggle: () => null,
});

export const Accordion = (props: AccordionProps): JSX.Element => {
  const { children, className, openItem, onToggleItem, defaultOpenItem = [] } = props;
  const openValues = openItem ? openItem : defaultOpenItem;
  const [innerOpenItem, setOpen] = React.useState<string[]>(openValues);

  const isOpenItemControlled = (openItem = props.openItem): openItem is string[] => {
    return !!onToggleItem && typeof openItem !== 'undefined';
  };

  const onToggle = (id: string): void => {
    if (onToggleItem) {
      return onToggleItem(id);
    }
    if (!isOpenItemControlled(openItem)) {
      setOpen((prevOpen) => {
        if (prevOpen.includes(id)) {
          return prevOpen.filter((i) => i !== id);
        } else {
          return [...prevOpen, id];
        }
      });
    }
  };

  const getOpenItems = (): string[] => {
    return onToggleItem && typeof openItem !== 'undefined' ? openItem : innerOpenItem;
  };

  const isOpen = (id: string): boolean => {
    return getOpenItems().includes(id);
  };

  return (
    <AccordionContext.Provider value={{ isOpen, onToggle }}>
      <div className={cn(styles['accordion'], className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

export default Accordion;