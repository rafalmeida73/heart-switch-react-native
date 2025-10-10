import { useEffect } from 'react';

import Animated, {
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import type { IHeartSvgProps } from './types';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const HeartSvg = ({
  filled,
  fillColor,
  strokeColor,
  inactiveFillColor,
  inactiveStrokeColor,
  size,
  duration = 350,
}: IHeartSvgProps) => {
  const progress = useSharedValue(filled ? 1 : 0);

  const animatedProps = useAnimatedProps(() => {
    const fill = interpolateColor(
      progress.value,
      [0, 1],
      [inactiveFillColor, fillColor]
    );
    const stroke = interpolateColor(
      progress.value,
      [0, 1],
      [inactiveStrokeColor, strokeColor]
    );
    return { fill, stroke };
  });

  useEffect(() => {
    progress.value = withTiming(filled ? 1 : 0, { duration });
  }, [filled, duration, progress]);

  return (
    <Svg
      viewBox="0 0 33 23"
      width={36 * size}
      height={25 * size}
      strokeLinejoin="round"
    >
      <AnimatedPath
        d="M23.5,0.5 C28.4705627,0.5 32.5,4.52943725 32.5,9.5 C32.5,16.9484448 21.46672,22.5 16.5,22.5 C11.53328,22.5 0.5,16.9484448 0.5,9.5 C0.5,4.52952206 4.52943725,0.5 9.5,0.5 C12.3277083,0.5 14.8508336,1.80407476 16.5007741,3.84362242 C18.1491664,1.80407476 20.6722917,0.5 23.5,0.5 Z"
        strokeWidth={1}
        animatedProps={animatedProps}
      />
    </Svg>
  );
};
