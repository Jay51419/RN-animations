import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import {
  PanGestureHandler,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

const RADIUS = 20;
const CRADIUS = 150;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    height: CRADIUS * 2,
    width: CRADIUS * 2,
    borderRadius: CRADIUS,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2ef",
  },
  circle: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS,
    backgroundColor: "#2a2b",
  },
  btn: {
    width: 100,
    height: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Playground = () => {
  const theta = useSharedValue(0);
  const X = useDerivedValue(() => CRADIUS * Math.cos(theta.value));
  const Y = useDerivedValue(() => CRADIUS * Math.sin(theta.value));

  const backgroundColor = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.x = X.value;
      ctx.y = Y.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      theta.value = Math.atan2(translationY + ctx.y, translationX + ctx.x);
    },
  });
  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: X.value }, { translateY: Y.value }],
    backgroundColor: interpolateColor(
      theta.value,
      [-Math.PI, -Math.PI / 2, 0, Math.PI / 2, Math.PI],
      ["yellow", "black", "red", "green", "blue"]
    ),
  }));

  const handleStart = () => {
    theta.value = withRepeat(
      withTiming(theta.value + Math.PI * 2, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1
    );
  };
  const handleStop = () => {
    theta.value = theta.value;
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.circle, circleStyle]}></Animated.View>
        </PanGestureHandler>
      </View>
      <TouchableOpacity onPress={handleStart} style={styles.btn}>
        <Text>{"Start"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleStop} style={styles.btn}>
        <Text>{"Stop"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Playground;
