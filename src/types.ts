export type Size = 'sm' | 'md' | 'lg';

export interface IHeartSwitchProps {
  size?: Size;
  duration?: number;
  inactiveFillColor?: string;
  inactiveStrokeColor?: string;
  fillColor?: string;
  strokeColor?: string;
  circleColor?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  disabledFillColor?: string;
  disabledStrokeColor?: string;
  disabledCircleColor?: string;
}

export interface IHeartCircleProps {
  size: number;
  inactiveThumbColor?: string;
}

export interface IContainerProps {
  size: number;
}
