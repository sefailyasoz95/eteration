import React from "react";
import ListScreen from "../Screens/ListScreen";
import CreateScreen from "../Screens/CreateScreen";
import DetailScreen from "../Screens/DetailScreen";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

const App = createSharedElementStackNavigator();

const AppStack = () => {
  return (
    <App.Navigator screenOptions={{ headerShown: false }}>
      <App.Screen
        name="List"
        component={ListScreen}
        // options={{
        //   gestureEnabled: false,
        //   cardStyleInterpolator: ({ current: { progress } }) => {
        //     return {
        //       cardStyle: {
        //         opacity: progress,
        //       },
        //     };
        //   },
        //   transitionSpec: {
        //     open: { animation: "timing", config: { duration: 500 } },
        //     close: { animation: "spring", config: { bounciness: 5 } },
        //   },
        // }}
      />
      <App.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
          transitionSpec: {
            open: { animation: "spring", config: { bounciness: 10, speed: 2 } },
            close: { animation: "spring", config: { bounciness: 5, speed: 1 } },
          },
        }}
        sharedElements={(route, otherRoute, showing) => {
          const { simpson } = route.params;
          return [
            {
              id: `${simpson.id}`,
            },
          ];
        }}
      />
      <App.Screen
        name="Create"
        component={CreateScreen}
        options={{
          headerTitle: "Add A Simpson",
        }}
      />
    </App.Navigator>
  );
};

export default AppStack;
