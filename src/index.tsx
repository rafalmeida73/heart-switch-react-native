import { useCallback, useEffect, useMemo, useState } from 'react';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

import { styles } from './styles';
import type { IHeartSwitchProps } from './types';
import { sizeToScale } from './utils/sizeToScale';
import { HeartSvg } from './components/HeartSvg';
import { TouchableOpacity, View } from 'react-native';

export const HeartSwitch = ({
  size = 'md',
  duration = 200,
  inactiveFillColor = '#dcdada',
  inactiveStrokeColor = '#b0adad',
  fillColor = '#ff708f',
  strokeColor = '#ff4e74',
  circleColor = '#ffffff',
  checked = false,
  onChange,
  disabled = false,
  disabledCircleColor = '#f4f4f4',
  disabledFillColor = '#e1e1e1',
  disabledStrokeColor = '#c8c8c8',
  initialAnimation = false,
}: IHeartSwitchProps) => {
  const initialValues = {
    sm: {
      translateX: -9,
      translateY: 8,
      rotate: 5,
      scaleX: 1,
      differenceY: 8,
    },
    md: {
      translateX: -13.5,
      translateY: 11.3,
      rotate: 5,
      scaleX: 1,
      differenceY: 12,
    },
    lg: {
      translateX: -18,
      translateY: 15.5,
      rotate: 5,
      scaleX: 1,
      differenceY: 16,
    },
  };

  const [heartChecked, setHeartChecked] = useState(checked);

  const initial = initialValues[size];

  const initialTranslateX = initialValues[size].translateX;
  const initialTranslateY = initialValues[size].translateY;
  const easing = Easing.bezier(0.2, 0.8, 0.2, 1);

  const d25 = Math.round(duration * 0.25);
  const d50 = duration - d25 - d25;

  const rotate = useSharedValue(initial.rotate);
  const translateX = useSharedValue(initial.translateX);
  const translateY = useSharedValue(initial.translateY);
  const scaleX = useSharedValue(initial.scaleX);
  const selectedSize = sizeToScale(size);

  const getColor = useMemo(() => {
    return {
      fillColor: disabled ? disabledFillColor : fillColor,
      strokeColor: disabled ? disabledStrokeColor : strokeColor,
      circleColor: disabled ? disabledCircleColor : circleColor,
    };
  }, [
    circleColor,
    disabled,
    fillColor,
    strokeColor,
    disabledStrokeColor,
    disabledFillColor,
    disabledCircleColor,
  ]);

  const handleSetChecked = useCallback(() => {
    translateY.value = withSequence(
      withTiming(initialTranslateY, { duration: 1 }),
      withTiming(0.3 * selectedSize + initial.differenceY, {
        duration: d25,
        easing,
      }),
      withTiming(0.9 * selectedSize + initial.differenceY, {
        duration: d25,
        easing,
      }),
      withTiming(2 * selectedSize + initial.differenceY, {
        duration: d25,
        easing,
      }),
      withTiming(3 * selectedSize + initial.differenceY, {
        duration: d25,
        easing,
      }),
      withTiming(3 * selectedSize + initial.differenceY, {
        duration: d25,
        easing,
      }),
      withTiming(2 * selectedSize + initial.differenceY, {
        duration: d25,
        easing,
      }),
      withTiming(1 * selectedSize + initial.differenceY, {
        duration: d25,
        easing,
      }),
      withTiming(0 * selectedSize + initial.differenceY, {
        duration: d25,
        easing,
      }),
      withTiming(-1.5 * selectedSize + initial.differenceY, {
        duration: d50,
        easing,
      })
    );

    translateX.value = withSequence(
      withTiming(initialTranslateX, { duration: 1 }),
      withTiming(-9 * selectedSize, { duration: d25, easing }),
      withTiming(-8 * selectedSize, { duration: d25, easing }),
      withTiming(-6 * selectedSize, { duration: d25, easing }),
      withTiming(-3 * selectedSize, { duration: d25, easing }),
      withTiming(1 * selectedSize, { duration: d25, easing }),
      withTiming(2 * selectedSize, { duration: d25, easing }),
      withTiming(3 * selectedSize, { duration: d25, easing }),
      withTiming(4 * selectedSize, { duration: d25, easing }),
      withTiming(6.3 * selectedSize, { duration: d50, easing })
    );
  }, [
    d25,
    d50,
    easing,
    initial.differenceY,
    initialTranslateX,
    initialTranslateY,
    selectedSize,
    translateX,
    translateY,
  ]);

  const handleSetUnchecked = useCallback(() => {
    translateY.value = withSequence(
      withTiming(-1 * selectedSize + initial.differenceY, {
        duration: d50,
        easing,
      }),
      withTiming(0 * selectedSize + initial.differenceY, {
        duration: d25,
        easing,
      }),
      withTiming(1 * selectedSize + initial.differenceY, {
        duration: d25,
        easing,
      }),
      withTiming(2 * selectedSize + initial.differenceY, {
        duration: d25,
        easing,
      }),
      withTiming(3 * selectedSize + initial.differenceY, {
        duration: d25,
        easing,
      }),
      withTiming(3 * selectedSize + initial.differenceY, {
        duration: d25,
        easing,
      }),
      withTiming(2 * selectedSize + initial.differenceY, {
        duration: d25,
        easing,
      }),
      withTiming(0.9 * selectedSize + initial.differenceY, {
        duration: d25,
        easing,
      }),
      withTiming(0.3 * selectedSize + initial.differenceY, {
        duration: d25,
        easing,
      }),
      withTiming(initial.translateY, { duration: d50, easing })
    );

    translateX.value = withSequence(
      withTiming(5.8 * selectedSize, { duration: d50, easing }),
      withTiming(4 * selectedSize, { duration: d25, easing }),
      withTiming(3 * selectedSize, { duration: d25, easing }),
      withTiming(2 * selectedSize, { duration: d25, easing }),
      withTiming(1 * selectedSize, { duration: d25, easing }),
      withTiming(-3 * selectedSize, { duration: d25, easing }),
      withTiming(-6 * selectedSize, { duration: d25, easing }),
      withTiming(-8 * selectedSize, { duration: d25, easing }),
      withTiming(-9 * selectedSize, { duration: d25, easing }),
      withTiming(initial.translateX, { duration: d50, easing })
    );
  }, [
    d25,
    d50,
    easing,
    initial.differenceY,
    initial.translateX,
    initial.translateY,
    selectedSize,
    translateX,
    translateY,
  ]);

  const handlePress = useCallback(() => {
    const newChecked = !heartChecked;
    setHeartChecked(newChecked);

    onChange && onChange(newChecked);

    if (newChecked) {
      handleSetChecked();
    } else {
      handleSetUnchecked();
    }
  }, [handleSetChecked, handleSetUnchecked, heartChecked, onChange]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      zIndex: 1,
      transform: [
        { rotate: `${rotate.value}deg` },
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scaleX: scaleX.value },
      ] as const,
    };
  });

  useEffect(() => {
    if (checked && !initialAnimation) {
      translateX.value = 6.3 * selectedSize;
      translateY.value = -1.5 * selectedSize + initial.differenceY;
      setHeartChecked(true);
    } else {
      translateX.value = initial.translateX;
      translateY.value = initial.translateY;
      setHeartChecked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, size]);

  useEffect(() => {
    if (initialAnimation) {
      if (checked) {
        handleSetChecked();
        setHeartChecked(true);
      } else {
        handleSetUnchecked();
        setHeartChecked(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, size, initialAnimation]);

  return (
    <View
      style={[
        styles.container,
        { width: 36 * selectedSize, height: 25 * selectedSize },
      ]}
    >
      <TouchableOpacity onPress={handlePress} disabled={disabled}>
        <Animated.View style={animatedStyle}>
          <View
            style={[
              styles.heartCircle,
              {
                backgroundColor: getColor.circleColor,
                top: 12 * selectedSize,
                left: 12 * selectedSize,
                width: 18 * selectedSize,
                height: 18 * selectedSize,
              },
            ]}
          />
        </Animated.View>
        <HeartSvg
          filled={heartChecked}
          inactiveFillColor={inactiveFillColor}
          inactiveStrokeColor={inactiveStrokeColor}
          fillColor={getColor.fillColor}
          strokeColor={getColor.strokeColor}
          size={selectedSize}
        />
      </TouchableOpacity>
    </View>
  );
};
