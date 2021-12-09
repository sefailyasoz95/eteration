import { useNavigation, useRoute } from "@react-navigation/core";
import { NativeStackNavigationOptions, NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, SafeAreaView, useWindowDimensions } from "react-native";
import { AppStackParamList } from "../StackParamLists/AppStackParamList";
import { RouteProp } from "@react-navigation/native";
import { imageUrlHelper } from "../Utils/Helpers/imageUrlHelper";
import { SharedElement } from "react-navigation-shared-element";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SPRING_CONFIG } from "../Utils/Constants/SPRING_CONFIG";

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, "Detail">;
  route: RouteProp<AppStackParamList, "Detail">;
};
type AnimatedGHContext = {
  startTop: number;
  opacity: number;
};
const DetailScreen = ({ navigation, route }: Props) => {
  const { simpson } = route.params;
  //   const options: NativeStackNavigationOptions = {
  //     headerTitle: `About ${simpson.name.split(" ")[0]}`,
  //   };
  const [isValidURL, setIsValidURL] = useState(false);
  const top = useSharedValue(0);
  const opacity = useSharedValue(1);
  const dimension = useWindowDimensions();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, SPRING_CONFIG),
    };
  });
  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedGHContext>({
    onStart(_, context) {
      context.startTop = top.value;
    },
    onActive(event, context) {
      top.value = context.startTop + event.translationY;
    },
    onEnd() {
      if (top.value < dimension.height / 5) {
        top.value = 0;
      } else {
        top.value = 0;
        console.log("top.value");
        runOnJS(navigation.goBack)();
      }
    },
  });
  useEffect(() => {
    setIsValidURL(imageUrlHelper(simpson?.avatar));
    // navigation.setOptions(options);
  }, []);
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[animatedStyle, { alignItems: "center" }]}>
          <SharedElement id={`${simpson?.id}`}>
            {isValidURL ? (
              <Image source={{ uri: simpson.avatar }} width={50} height={50} style={styles.image} />
            ) : (
              <Text style={styles.noImage}>⛔</Text>
            )}
          </SharedElement>
          <Text style={styles.name}>{simpson.name}</Text>
          <Text style={styles.job}>{simpson.job}</Text>
          <Text style={styles.about}>{simpson.about}</Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 30,
  },
  image: {
    height: 300,
    width: 170,
    resizeMode: "contain",
    marginTop: "2%",
  },
  noImage: {
    padding: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 1,
    textTransform: "capitalize",
  },
  job: {
    fontSize: 16,
    marginTop: 5,
    textTransform: "capitalize",
    color: "rgba(0,0,0,0.8)",
  },
  about: {
    fontSize: 16,
    color: "#555",
    marginVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
