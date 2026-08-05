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
import { scheduleOnRN } from 'react-native-worklets';

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
  containerProps,
  buttonProps,
  circleProps,
}: IHeartSwitchProps) => {
  const [heartChecked, setHeartChecked] = useState(checked);

  const selectedSize = sizeToScale(size);

  const unchecked = useMemo(
    () => ({ rotate: 30, translateX: 0, translateY: 0 }),
    []
  );
  const checkedRest = useMemo(
    () => ({
      rotate: -30,
      translateX: 13.5 * selectedSize,
      translateY: 8 * selectedSize,
    }),
    [selectedSize]
  );

  const linear = Easing.linear;

  const d25 = Math.round(duration * 0.25);
  const d50 = duration - d25 - d25;

  const rotate = useSharedValue(
    checked ? checkedRest.rotate : unchecked.rotate
  );
  const translateX = useSharedValue(
    checked ? checkedRest.translateX : unchecked.translateX
  );
  const translateY = useSharedValue(
    checked ? checkedRest.translateY : unchecked.translateY
  );
  const scaleX = useSharedValue(1);

  const handleCallOnChange = useCallback(
    (newChecked: boolean) => {
      onChange && onChange(newChecked);
    },
    [onChange]
  );

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

  const handleSetChecked = useCallback(
    (newChecked: boolean) => {
      rotate.value = withSequence(
        withTiming(unchecked.rotate, { duration: 1 }),
        withTiming(unchecked.rotate, { duration: d25 * 2 }),
        withTiming(checkedRest.rotate, { duration: d50, easing: linear })
      );

      scaleX.value = withSequence(
        withTiming(1, { duration: 1 }),
        withTiming(1.1, { duration: d25, easing: linear }),
        withTiming(1, { duration: d25, easing: linear }),
        withTiming(1, { duration: d50, easing: linear })
      );

      translateY.value = withSequence(
        withTiming(unchecked.translateY, { duration: 1 }),
        withTiming(unchecked.translateY, { duration: d25, easing: linear }),
        withTiming(unchecked.translateY, { duration: d25, easing: linear }),
        withTiming(checkedRest.translateY, { duration: d50, easing: linear })
      );

      translateX.value = withSequence(
        withTiming(unchecked.translateX, { duration: 1 }),
        withTiming(4.5 * selectedSize, { duration: d25, easing: linear }),
        withTiming(9 * selectedSize, { duration: d25, easing: linear }),
        withTiming(
          checkedRest.translateX,
          { duration: d50, easing: linear },
          () => {
            scheduleOnRN(handleCallOnChange, newChecked);
          }
        )
      );
    },
    [
      checkedRest.rotate,
      checkedRest.translateX,
      checkedRest.translateY,
      d25,
      d50,
      linear,
      handleCallOnChange,
      rotate,
      scaleX,
      selectedSize,
      translateX,
      translateY,
      unchecked.rotate,
      unchecked.translateX,
      unchecked.translateY,
    ]
  );

  const handleSetUnchecked = useCallback(
    (newChecked: boolean) => {
      rotate.value = withSequence(
        withTiming(checkedRest.rotate, { duration: 1 }),
        withTiming(unchecked.rotate, { duration: d50, easing: linear }),
        withTiming(unchecked.rotate, { duration: d25 * 2 })
      );

      scaleX.value = withSequence(
        withTiming(1, { duration: 1 }),
        withTiming(1, { duration: d50, easing: linear }),
        withTiming(1.1, { duration: d25, easing: linear }),
        withTiming(1, { duration: d25, easing: linear })
      );

      translateY.value = withSequence(
        withTiming(checkedRest.translateY, { duration: 1 }),
        withTiming(unchecked.translateY, { duration: d50, easing: linear }),
        withTiming(unchecked.translateY, { duration: d25, easing: linear }),
        withTiming(unchecked.translateY, { duration: d25, easing: linear })
      );

      translateX.value = withSequence(
        withTiming(checkedRest.translateX, { duration: 1 }),
        withTiming(9 * selectedSize, { duration: d50, easing: linear }),
        withTiming(4.5 * selectedSize, { duration: d25, easing: linear }),
        withTiming(
          unchecked.translateX,
          { duration: d25, easing: linear },
          () => {
            scheduleOnRN(handleCallOnChange, newChecked);
          }
        )
      );
    },
    [
      checkedRest.rotate,
      checkedRest.translateX,
      checkedRest.translateY,
      d25,
      d50,
      linear,
      handleCallOnChange,
      rotate,
      scaleX,
      selectedSize,
      translateX,
      translateY,
      unchecked.rotate,
      unchecked.translateX,
      unchecked.translateY,
    ]
  );

  const handlePress = useCallback(() => {
    const newChecked = !heartChecked;
    setHeartChecked(newChecked);

    if (newChecked) {
      handleSetChecked(newChecked);
    } else {
      handleSetUnchecked(newChecked);
    }
  }, [handleSetChecked, handleSetUnchecked, heartChecked]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: 1 * selectedSize,
      left: 1 * selectedSize,
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
      rotate.value = checkedRest.rotate;
      translateX.value = checkedRest.translateX;
      translateY.value = checkedRest.translateY;
      scaleX.value = 1;
      setHeartChecked(true);
    } else {
      rotate.value = unchecked.rotate;
      translateX.value = unchecked.translateX;
      translateY.value = unchecked.translateY;
      scaleX.value = 1;
      setHeartChecked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, size, initialAnimation]);

  useEffect(() => {
    if (initialAnimation) {
      if (checked) {
        handleSetChecked(checked);
        setHeartChecked(true);
      } else {
        handleSetUnchecked(checked);
        setHeartChecked(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, size, initialAnimation]);

  return (
    <View
      {...containerProps}
      style={[
        styles.container,
        { width: 36 * selectedSize, height: 25 * selectedSize },
        containerProps?.style,
      ]}
      testID="heart-switch-container"
    >
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={1}
        {...buttonProps}
        style={[{ position: 'relative' }, buttonProps?.style]}
        testID="heart-switch-button"
      >
        <Animated.View style={animatedStyle}>
          <View
            {...circleProps}
            style={[
              styles.heartCircle,
              {
                backgroundColor: getColor.circleColor,
                width: 18 * selectedSize,
                height: 18 * selectedSize,
              },
              circleProps?.style,
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
          duration={duration}
        />
      </TouchableOpacity>
    </View>
  );
};
