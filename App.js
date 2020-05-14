/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow strict-local
*/
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar,} from 'react-native';
import { Header,LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';



import login from './react/Auth/login';
import register from './react/Auth/register';
import profil from './react/profil';
import HomeScreen from './react/cards';
import createOffer from './react/Offer/createOffer';
import updateOffer from './react/Offer/updateOffer';

const theme = {...DefaultTheme, colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};


const RegisterStack = createStackNavigator();


function RegisterScreen() {
  return (
    <RegisterStack.Navigator>
    <RegisterStack.Screen name="register" component={register} />
  </RegisterStack.Navigator>
  );
}

const LoginStack = createStackNavigator();


function LoginScreen() {
  return (
    <LoginStack.Navigator>
    <LoginStack.Screen name="login" component={login} />
    <LoginStack.Screen name="register" component={register} />
    </LoginStack.Navigator>
  );
}

const OffersStack = createStackNavigator();


function OffersScreen() {
  return (
    <OffersStack.Navigator>
    <OffersStack.Screen name="offers" component={HomeScreen} />
    <OffersStack.Screen name="createOffer" component={createOffer} />
    <OffersStack.Screen name="updateOffer" component={updateOffer} />
    </OffersStack.Navigator>
  );
}

const ProfilStack = createStackNavigator();
function SettingsScreen() {
  return (
    <ProfilStack.Navigator>
    <ProfilStack.Screen name="profil" component={profil} />
    {/* <ProfilStack.Screen name="offers" component={HomeScreen} /> */}
  </ProfilStack.Navigator>
  );
} 

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <>
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <PaperProvider theme={theme}>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  
                  if (route.name === 'Découvir') {
                    iconName = focused
                      ? 'home'
                      : 'home';
                  } else if (route.name === 'profil') {
                    iconName = focused ? 'account-circle' : 'account-circle';
                  } else if (route.name === 'Offres') {
                    iconName = focused ? 'search' : 'search';
                  }else if (route.name === 'Update') {
                    iconName = focused ? 'backup' : 'backup';
                  }
                  // You can return any component that you like here!
                  return <Icon name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
              }}
            >

          <Tab.Screen name="Découvir" component={LoginScreen} /> 
            <Tab.Screen name="profil" component={SettingsScreen} /> 
            <Tab.Screen name="Offres" component={OffersScreen} /> 
            </Tab.Navigator>
        </PaperProvider>
      </SafeAreaView>
    </NavigationContainer>
    </>
  );
};

export default App;