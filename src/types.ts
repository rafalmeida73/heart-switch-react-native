import type { TouchableOpacityProps, ViewProps } from 'react-native';

export type SizePreset = 'sm' | 'md' | 'lg';

export type Size = SizePreset | number;

export interface IHeartSwitchProps {
  size?: Size;
  duration?: number;
  inactiveFillColor?: string;
  inactiveStrokeColor?: string;
  fillColor?: string;
  strokeColor?: string;
  circleColor?: string;
  checked?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  disabledFillColor?: string;
  disabledStrokeColor?: string;
  disabledCircleColor?: string;
  initialAnimation?: boolean;
  containerProps?: ViewProps;
  buttonProps?: TouchableOpacityProps;
  circleProps?: ViewProps;
}
