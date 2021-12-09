import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useLayoutEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from "react-native";
import Button from "../Components/Button/Button";
import SimpsonsList from "../Components/Simpsons/SimpsonsList";
import { AppStackParamList } from "../StackParamLists/AppStackParamList";
import { getSimpsons } from "../Utils/Services/service";

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, "List">;
};
const ListScreen = ({ navigation }: Props) => {
  const initial = {
    dataSource: [],
    loading: true,
  };
  const [screenState, setScreenState] = useState(initial);
  const handleData = async () => {
    setScreenState(initial);
    let result = await getSimpsons();
    setScreenState({ dataSource: result.data, loading: false });
  };

  useLayoutEffect(() => {
    handleData();
  }, []);

  return (
    <SafeAreaView style={styles.container} testID="container">
      {screenState.loading ? (
        <ActivityIndicator size={50} color="red" testID="indicator" />
      ) : (
        <SimpsonsList
          dataSource={screenState.dataSource}
          navigation={navigation}
          refreshData={handleData}
          testID="simpson-flatlist"
        />
      )}
      <Button
        text={`+`}
        testID={"+"}
        textStyle={styles.buttonText}
        buttonStyle={styles.buttonStyle}
        color="black"
        onPress={() => navigation.navigate("Create")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonText: {
    fontSize: 50,
  },
  buttonStyle: {
    position: "absolute",
    bottom: "3%",
    right: "5%",
    borderWidth: 0,
  },
});

export default ListScreen;
