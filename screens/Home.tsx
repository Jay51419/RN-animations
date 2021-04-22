import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Home = ({ navigation }: { navigation: any }) => {
  const tabs = ["CurvedBouncingBottomTab"];
  return (
    <View style={{ flex: 1, backgroundColor: "#2d2f2b" }}>
      {tabs.map((e, i) => (
        <TouchableOpacity key={i} onPress={() => navigation.push(e)}>
          <View
            style={{
              width: "100%",
              height: 70,
              paddingLeft: 20,
              justifyContent: "center",
              backgroundColor: "#2d2f2b",
              borderWidth: 0.6,
              borderLeftWidth: 10,
              borderColor: "#fff",
            }}
          >
            <Text style={{ color: "#fff" }}>{e}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Home;
