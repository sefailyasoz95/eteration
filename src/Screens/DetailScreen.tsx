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
  withTiming,
} from "react-native-reanimated";
import { SPRING_CONFIG } from "../Utils/Constants/SPRING_CONFIG";

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, "Detail">;
  route: RouteProp<AppStackParamList, "Detail">;
};
type AnimatedGHContext = {
  startTop: number;
  scale: number;
  x: number;
  y: number;
};
const DetailScreen = ({ navigation, route }: Props) => {
  const { simpson } = route.params;
  //   const options: NativeStackNavigationOptions = {
  //     headerTitle: `About ${simpson.name.split(" ")[0]}`,
  //   };
  const [isValidURL, setIsValidURL] = useState(false);
  const top = useSharedValue(0);
  const scale = useSharedValue(1);
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const dimension = useWindowDimensions();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      //   top: withSpring(top.value, SPRING_CONFIG),
      transform: [
        { scale: withTiming(scale.value) },
        { translateX: withSpring(x.value, SPRING_CONFIG) },
        { translateY: withSpring(y.value, SPRING_CONFIG) },
      ],
    };
  });
  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedGHContext>({
    onStart(_, context) {
      context.startTop = top.value;
      (context.x = x.value), (context.y = y.value);
    },
    onActive({ translationX, translationY }, context) {
      //   top.value = context.startTop + translationY;
      scale.value = 0.95;
      x.value = context.x + translationX;
      y.value = context.y + translationY;
    },
    onEnd() {
      if (y.value < 150) {
        // top.value = 0;
        scale.value = 1;
        x.value = 0;
        y.value = 0;
      } else {
        // top.value = 0;
        runOnJS(navigation.goBack)();
      }
    },
  });
  useEffect(() => {
    setIsValidURL(imageUrlHelper(simpson?.avatar));
    // navigation.setOptions(options);
  }, []);
  return (
    // <View style={styles.container}>
    // </View>
    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0)" }}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[animatedStyle, styles.container, { backgroundColor: "black" }]}>
          <SharedElement id={`${simpson?.id}`} style={{ marginTop: 35 }}>
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
    flex: 1,
    width: "100%",
    borderRadius: 30,
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
    color: "white",
  },
  job: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
    textTransform: "capitalize",
  },
  about: {
    fontSize: 16,
    marginHorizontal: 15,
    color: "#999",
    marginVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
