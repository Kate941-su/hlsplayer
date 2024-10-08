import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux'
import { store } from './app/store'
import { MainScreen, SplashScreen } from './view/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackparamlist } from './Router';
import RegisterScreen from './view/RegisterScreen';
import PlayerScreen from './view/PlayerScreen';

const Stack = createNativeStackNavigator<RootStackparamlist>()

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="default" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="MainScreen"
              component={MainScreen}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="PlayerScreen"
              component={PlayerScreen}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{
                headerShown: false
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}