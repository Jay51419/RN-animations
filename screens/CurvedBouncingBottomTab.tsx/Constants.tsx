import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("window");
export const tabHeight = 70;
export const tabStartY = height - tabHeight * 2;
export const tabEndY = height;
// export const tabEndX = width;
