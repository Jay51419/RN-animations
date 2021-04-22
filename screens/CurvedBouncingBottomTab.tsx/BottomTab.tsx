import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { width, tabEndY, tabHeight, tabStartY, height } from "./Constants";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const BottomTab = () => {
  const tabs = ["Home", "Explore", "Purpose", "Account"];
  const [tab, setTab] = useState(0);
  const activeTab = useSharedValue(0);
  const curveHeight = useSharedValue(tabHeight);
  const edgeCurveHeight = useSharedValue(8);
  const circleY = useSharedValue(0);
  const tabWidth = width / tabs.length;
  const circleX = useSharedValue(17);
  const iconY = useSharedValue(-17);
  const iconOpacity = useSharedValue(1);
  const animatedProps = useAnimatedProps(() => {
    const d = [
      `M${0} ${tabStartY}`,
      `L${0} ${tabStartY}`,
      `L${activeTab.value * tabWidth - 30} ${tabStartY}`,
      `q 25 -1 30 ${edgeCurveHeight.value}`,
      `L${activeTab.value * tabWidth} ${tabStartY + edgeCurveHeight.value}`,
      `q ${tabWidth / 2} ${curveHeight.value} ${tabWidth} 0`,
      `L${(activeTab.value + 1) * tabWidth} ${
        tabStartY + edgeCurveHeight.value
      }`,
      `q 5 ${-edgeCurveHeight.value - 1} 30 ${-edgeCurveHeight.value}`,
      `L${(activeTab.value + 1) * tabWidth + 30} ${tabStartY}`,
      `L${width} ${tabStartY}`,
      `L${width} ${tabEndY}`,
      `L${0} ${tabEndY}`,
      `Z`,
    ].join(" ");
    return {
      d,
    };
  });
  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: circleX.value }, { translateY: circleY.value }],
  }));
  const iconStyle = useAnimatedStyle(() => ({
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    opacity: iconOpacity.value,
    transform: [{ translateY: iconY.value }],
  }));

  const handleTab = (i: number) => {
    if (i !== tab && tabs[i] !== "") {
      iconY.value = withSequence(withTiming(0), withTiming(-17));
      iconOpacity.value = withSequence(
        withTiming(0),
        withTiming(1, { duration: 500 })
      );
      circleY.value = withSequence(
        withSpring(-65),
        withDelay(50, withSpring(-105))
      );
      edgeCurveHeight.value = withTiming(0);
      curveHeight.value = withSpring(0);
      circleX.value = withTiming(i * tabWidth + 17, {});
      activeTab.value = withTiming(i, {}, (isFinished) => {
        if (isFinished) {
          edgeCurveHeight.value = withTiming(8);
          curveHeight.value = withSpring(tabHeight);
          circleY.value = withSpring(0);
        }
      });
      setTab(i);
    }
  };
  return (
    <View>
      <Svg style={{}}>
        <AnimatedPath fill="#000" animatedProps={animatedProps} />
      </Svg>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: width,
          height: "100%",
          flexDirection: "row",
          zIndex: 10,
        }}
      >
        {tabs.map((e, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handleTab(i)}
            style={{
              width: tabWidth,
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 3,
              position: "relative",
            }}
          >
            <Animated.Text
              key={i}
              style={[
                {
                  color: "#fff",
                  position: "absolute",
                  bottom: tabWidth / 4,
                  opacity: tab == i ? 0 : 1,
                },
              ]}
            >
              {e}
            </Animated.Text>
          </TouchableOpacity>
        ))}
      </View>
      <Animated.View
        style={[
          {
            width: tabWidth / 1.5,
            height: tabWidth / 1.5,
            borderRadius: tabWidth / 1.5,
            backgroundColor: "#808080",
            position: "absolute",
            bottom: tabWidth / 2,
            zIndex: 2,
          },
          circleStyle,
        ]}
      >
        <Animated.View style={[iconStyle]}>
          <Text style={{ textAlign: "center", fontSize: 12 }}>{tabs[tab]}</Text>
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "#345", zIndex: -1 },
        ]}
      >
        <Animated.Text>{tabs[tab]}</Animated.Text>
      </Animated.View>
    </View>
  );
};

export default BottomTab;
