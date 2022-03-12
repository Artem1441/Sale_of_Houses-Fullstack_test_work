import { useState } from "react"
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import store from './store/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MainScreen from "./screens/MainScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from './screens/SignInScreen';
import { Button } from "react-native";
import { authAPI, startAppAPI } from './core/API';
import { StatusBar } from "react-native";
import THEMES from './core/THEMES';
import AdminScreen from './screens/AdminScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Start />
      </Provider>
    </SafeAreaProvider>
  );
}

const Tab = createBottomTabNavigator();

const Start = () => {
  const [isReady, setIsReady] = useState(false);
  const options = {
    headerShown: false,
    tabBarStyle: { display: "none" }
  }

  const loadApplication = async () => {
    try {
      await Font.loadAsync({
        "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
        "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
      });

      const jwtTokken = await AsyncStorage.getItem('@JWT');

      if (jwtTokken) {
        const startApp = new startAppAPI()
        await startApp.SaveJWT(jwtTokken)
      }
    } catch (e) { console.log(e) }
  }

  if (!isReady) return (
    <AppLoading
      startAsync={loadApplication}
      onError={(err) => console.log(err)}
      onFinish={() => setIsReady(true)}
    />
  );

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={THEMES.BACKGROUND}
      />
      <Tab.Navigator initialRouteName={"MainScreen"} backBehavior="history"
      >
        <Tab.Screen
          name="MainScreen"
          component={MainScreen}
          options={options}
        />
        <Tab.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={options}
        />
        <Tab.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={options}
        />
        <Tab.Screen
          name="AdminScreen"
          component={AdminScreen}
          options={options}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
