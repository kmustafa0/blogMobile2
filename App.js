import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen";
import PostScreen from "./Screens/PostScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Kayıt Ol" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Ana Ekran" }}
        />
        <Stack.Screen
          name="Post"
          component={PostScreen}
          options={{ title: "Post Ekranı" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
