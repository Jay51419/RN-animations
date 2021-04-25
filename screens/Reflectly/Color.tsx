import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");
export const COLORWIDTH = width / 3;
export const RADIUS = 45;
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: COLORWIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS,
    borderWidth: 4,
    borderColor: "#fff",
  },
});

interface ColorProps {
  color: string;
  index: number;
  translateX: Animated.SharedValue<number>;
  onPress: (y: number) => any;
}
const Color = ({ color, index, onPress, translateX }: ColorProps) => {
  const y = useSharedValue(height / 2);
  const style = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      [
        -COLORWIDTH * (index + 1),
        -COLORWIDTH * index,
        -COLORWIDTH * (index - 1),
      ],
      [50, 0, -50],
      Extrapolate.CLAMP
    );
    const scale = interpolate(
      translateX.value,
      [
        -COLORWIDTH * (index + 1),
        -COLORWIDTH * index,
        -COLORWIDTH * (index - 1),
      ],
      [1, 1.2, 1]
    );
    y.value = height / 2 + translateY;
    return {
      transform: [
        {
          translateY,
        },
        { scale },
      ],
    };
  });
  const onGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onActive: () => {
        onPress(y.value);
      },
    }
  );

  return (
    <TapGestureHandler onGestureEvent={onGestureEvent} key={index}>
      <Animated.View style={[styles.container, style]}>
        <Animated.View
          style={[styles.circle, { backgroundColor: color }]}
        ></Animated.View>
      </Animated.View>
    </TapGestureHandler>
  );
};

export default Color;
