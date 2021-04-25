import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";
import Home from "../screens/Home";
import { CurvedBouncingBottomTab } from "../screens/CurvedBouncingBottomTab.tsx";
import Playground from "../screens/Playground/Playground";
import { Reflectly } from "../screens/Reflectly";

const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        mode={"modal"}
        screenOptions={{
          animationEnabled: false,
          headerStyle: { backgroundColor: "#2d2f2b" },
          headerTitleStyle: { color: "#fff" },
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="CurvedBouncingBottomTab"
          component={CurvedBouncingBottomTab}
        />
        <Stack.Screen name="Playground" component={Playground} />
        <Stack.Screen name="Reflectly" component={Reflectly} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
