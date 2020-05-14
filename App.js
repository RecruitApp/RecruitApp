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


import login from './react/Auth/login';
import register from './react/Auth/register';
import profil from './react/profil';
import HomeScreen from './react/cards';
import {ListOfCandidate,Apply} from './react/components/candidature';
import {CreateOffer,ShowlistOffer, ShowOffer,UpdateOffer}  from './react/components/Offre';

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

const ProfilStack = createStackNavigator();
function SettingsScreen() {
  return (
    <ProfilStack.Navigator>
      <ProfilStack.Screen name="register" component={register} />
      <ProfilStack.Screen name="login" component={login} />
  </ProfilStack.Navigator>
  );
}

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
                  } else if (route.name === 'Profil') {
                    iconName = focused ? 'account-circle' : 'account-circle';
                  }else {
                    iconName = focused ? 'account-circle' : 'account-circle';
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
              <Tab.Screen name="Découvir" component={HomeScreen} />
              <Tab.Screen name="listCandidature" component={ListOfCandidate} />
              <Tab.Screen name="CreateOffer" component={CreateOffer} />
              <Tab.Screen name="ShowlistOffer" component={ShowlistOffer} />
              <Tab.Screen name="ShowOffer" component={ShowOffer} />
              <Tab.Screen name="UpdateOffer" component={UpdateOffer} />
              <Tab.Screen name="Apply" component={Apply} />
              <Tab.Screen name="Profil" component={SettingsScreen} />
            </Tab.Navigator>
        </PaperProvider>
      </SafeAreaView>
    </NavigationContainer>
    </>
  );
};

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
export default App;