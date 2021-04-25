import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import Background from "./Background";
import Color, { COLORWIDTH, RADIUS } from "./Color";

const { width, height } = Dimensions.get("screen");

const colors = ["maroon", "skyblue", "lightgreen", "lightpink", "orange"];

const styles = StyleSheet.create({
  colors: {
    flex: 1,
    width: width * colors.length,
    flexDirection: "row",
    alignItems: "center",
  },
  placeholder: {
    width: COLORWIDTH,
  },
});

const snaps = colors.map((_, i) => -COLORWIDTH * i);

const ColorSelection = () => {
  const active = useSharedValue(COLORWIDTH * 2);

  const [colorSelection, setColorSelection] = useState({
    position: {
      x: active.value,
      y: height / 2,
    },
    current: colors[0],
    previous: colors[0],
  });
  const translateX = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }, { x }) => {
      translateX.value = Math.min(
        0,
        Math.max(translationX + x, -COLORWIDTH * (colors.length - 1))
      );
    },
    onEnd: ({ velocityX }) => {
      const point = translateX.value + 0.2 * velocityX;
      const deltas = snaps.map((snap) => Math.abs(point - snap));
      const minDeltas = Math.min.apply(null, deltas);
      translateX.value = withSpring(
        snaps.filter((snap) => Math.abs(point - snap) === minDeltas)[0]
      );
    },
  });
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  return (
    <>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.colors, style]}>
          <Background color={colorSelection} />
          <View style={styles.placeholder} />
          {colors.map((color, index) => (
            <Color
              key={index}
              color={color}
              index={index}
              translateX={translateX}
              onPress={(y) => {
                "worklet";
                translateX.value = withSpring(index * -COLORWIDTH);
                if (active.value === 0) {
                  active.value = COLORWIDTH * 2;
                } else {
                  active.value = (index + 2) * COLORWIDTH;
                }
                console.log(translateX.value, active.value);
                runOnJS(setColorSelection)({
                  position: {
                    x: active.value,
                    y: y,
                  },
                  previous: colorSelection.current,
                  current: colors[index],
                });
              }}
            />
          ))}
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default ColorSelection;
