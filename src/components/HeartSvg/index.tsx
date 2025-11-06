import { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import type { IHeartSvgProps } from './types';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

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
  const [currentFill, setCurrentFill] = useState(
    filled ? fillColor : inactiveFillColor
  );
  const [currentStroke, setCurrentStroke] = useState(
    filled ? strokeColor : inactiveStrokeColor
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: 1,
    };
  });

  useEffect(() => {
    progress.value = withTiming(filled ? 1 : 0, {
      duration,
    });

    const timer = setTimeout(() => {
      if (filled) {
        setCurrentFill(fillColor);
        setCurrentStroke(strokeColor);
      } else {
        setCurrentFill(inactiveFillColor);
        setCurrentStroke(inactiveStrokeColor);
      }
    }, duration * 0.1);

    return () => clearTimeout(timer);
  }, [
    filled,
    duration,
    fillColor,
    strokeColor,
    inactiveFillColor,
    inactiveStrokeColor,
    progress,
  ]);

  return (
    <AnimatedSvg
      viewBox="0 0 33 23"
      width={36 * size}
      height={25 * size}
      strokeLinejoin="round"
      style={animatedStyle}
      testID="heart-svg"
    >
      <Path
        d="M23.5,0.5 C28.4705627,0.5 32.5,4.52943725 32.5,9.5 C32.5,16.9484448 21.46672,22.5 16.5,22.5 C11.53328,22.5 0.5,16.9484448 0.5,9.5 C0.5,4.52952206 4.52943725,0.5 9.5,0.5 C12.3277083,0.5 14.8508336,1.80407476 16.5007741,3.84362242 C18.1491664,1.80407476 20.6722917,0.5 23.5,0.5 Z"
        strokeWidth={1}
        fill={currentFill}
        stroke={currentStroke}
        testID="heart-path"
      />
    </AnimatedSvg>
  );
};
