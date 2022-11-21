import cn from 'classnames';

import styles from './vertical-spacing.module.scss';

export interface VerticalSpacingProps {
  /**
   * Any content.
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Rendered HTML Element. Defaults to "div".
   */
  element?: keyof JSX.IntrinsicElements;
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * size of spacing
   * All children elements are getting {size}em unit of margin-bottom
   */
  size?: 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2 | 2.5;
}

export const VerticalSpacing = (props: VerticalSpacingProps): JSX.Element => {
  const { children, className, element: Element = 'div', size = 1 } = props;
  const VerticalSpacingBEM = cn(
    styles['vertical-spacing'],
    styles[`vertical-spacing--${size}`.replace('.', '-')],
    className
  );

  return <Element className={VerticalSpacingBEM}>{children}</Element>;
};

export default VerticalSpacing;