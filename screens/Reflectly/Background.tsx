import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { COLORWIDTH, RADIUS } from "./Color";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  color: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS,
  },
});
interface BackgroundProps {
  color: {
    previous: string;
    current: string;
    position: { x: number; y: number };
  };
}
const MAX_RADIUS = Math.max(width, height);
const Background = ({ color }: BackgroundProps) => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(MAX_RADIUS - RADIUS, { duration: 4000 });
  }, [color]);
  const style = useAnimatedStyle(() => ({
    backgroundColor: color.current,
    transform: [
      { translateX: color.position.x - RADIUS * 2 },
      { translateY: color.position.y - RADIUS * 2 },
      { scale: progress.value },
    ],
  }));
  return (
    <View
      style={[
        {
          backgroundColor: color.previous,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        },
      ]}
    >
      <Animated.View style={[styles.color, style]} />
    </View>
  );
};

export default Background;
