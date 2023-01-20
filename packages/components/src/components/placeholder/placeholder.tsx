import cn from 'classnames';
import React from 'react';

import { useBreakpoint } from '../../helpers';
import { Card, CardContent, CardProps } from '../card';
import { Col, Row } from '../grid';
import Icon, { IconProps } from '../icon/icon';

export interface PlaceholderProps {
  /**
   * Placeholder block content
   */
  children?: React.ReactNode;
  /**
   * Placeholder icon name, IconProps object or ReactNode(e.g SVG)
   */
  icon?: string | IconProps | React.ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * Card props that get passed to `<Card>`
   */
  cardProps?: Omit<CardProps, 'className'>;
  /**
   * Use when nesting inside other components like `<CardContent>`. Passes certain default props to the inner card, like `type='borderless'`, `padding='none'` etc.
   * This is just a shortcut. The same result can be achieved using `cardProps`
   */
  isNested?: boolean;
}

/**
 * Placeholder is used to indicate, that there is no data to show. It can be used on its own or inside other components, like a `<CardContent>`.
 * Other components also use it internally for displaying empty state. (E.g. `<Table>`)
 */
export const Placeholder = (props: PlaceholderProps): JSX.Element => {
  const { icon = 'spa', className, children, cardProps, isNested, ...rest } = props;
  const breakpoint = useBreakpoint();
  const isMobileLayout = ['xs', 'sm'].includes(breakpoint || '');

  const {
    type = isNested ? 'borderless' : undefined,
    padding = isNested ? 'none' : isMobileLayout ? 'medium' : 'large',
    background = isNested ? undefined : isMobileLayout ? 'background' : 'white',
    ...restCardProps
  } = cardProps ?? {};

  const getIcon = (icon: string | IconProps | React.ReactNode) => {
    const iconBEM = cn('text-primary');
    const defaultIconProps: Partial<IconProps> = { size: 36, className: iconBEM };
    const iconProps: IconProps | undefined =
      typeof icon === 'string'
        ? { ...defaultIconProps, name: icon }
        : typeof icon === 'object' && !React.isValidElement(icon)
        ? {
            ...defaultIconProps,
            ...(icon as IconProps),
            className: cn(defaultIconProps.className, (icon as IconProps)?.className),
          }
        : undefined;

    return iconProps ? <Icon {...iconProps} /> : (icon as React.ReactNode);
  };

  return (
    <Card
      data-name="placeholder"
      {...rest}
      className={className}
      type={type}
      padding={padding}
      background={background}
      {...restCardProps}
    >
      <CardContent>
        <Row direction="column" alignItems="center" gutter={2}>
          {icon && <Col width="auto">{getIcon(icon)}</Col>}
          <Col width="auto" className="text-center text-secondary">
            {children}
          </Col>
        </Row>
      </CardContent>
    </Card>
  );
};

export default Placeholder;
