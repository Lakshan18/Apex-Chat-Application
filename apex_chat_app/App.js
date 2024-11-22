import { Loading } from "./Loading";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./Home";
import { Login } from "./pages/Login";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SignUp } from "./pages/SignUp";
import { ProfileImgSet } from "./pages/ProfileImgSet";
import { MainChat } from "./pages/MainChat";
import { FooterSection } from "./components/FooterSection";
import { MyAccount } from "./pages/MyAccount";
import { FriendProfile } from "./pages/FriendProfile";
import { StartChat } from "./pages/StartChat";
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {

  const [loaded, error] = useFonts({
    'Lobster': require('./assets/fonts/LobsterTwo-Regular.ttf'),
    'Inter': require('./assets/fonts/Inter_18pt-Regular.ttf'),
    'Quicksand': require('./assets/fonts/Quicksand-Regular.ttf'),
    'Roboto': require('./assets/fonts/Roboto.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileImgSet" component={ProfileImgSet} options={{ headerShown: false }} />
        <Stack.Screen name="MainChat" component={MainChat} options={{ headerShown: false }} />
        <Stack.Screen name="FooterSection" component={FooterSection} options={{ headerShown: false }} />
        <Stack.Screen name="StartChat" component={StartChat} options={{ headerShown: false }} />
        <Stack.Screen name="MyAccount" component={MyAccount} options={{ headerShown: false }} />
        <Stack.Screen name="FriendProfile" component={FriendProfile} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

