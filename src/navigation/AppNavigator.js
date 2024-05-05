import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { themeColor, useTheme } from 'react-native-rapi-ui';
import TabBarIcon from '../components/utils/TabBarIcon';
import TabBarText from '../components/utils/TabBarText';

import Home from '../screens/Home';
import Search from '../screens/Search';
import Chat from '../screens/Chat';
import Map from '../screens/Map';
import Upload from '../screens/Upload';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';

const MainStack = createNativeStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Login" component={Login} />
      <MainStack.Screen name="Welcome" component={Home} />
      <MainStack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      {/* <MainStack.Screen name="Search" component={Search} /> */}
      <MainStack.Screen name="Register" component={Register} />
    </MainStack.Navigator>
  );
};

const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  const { isDarkmode } = useTheme();

  // Function to determine if the tab bar should be hidden
  const shouldHideTabBar = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    if (routeName === 'Login' || routeName === 'Register') {
      return true;
    }
    return false;
  };

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : '#c0c0c0',
          backgroundColor: isDarkmode ? themeColor.dark200 : '#ffffff',
          display: shouldHideTabBar(route) ? 'none' : 'flex', // Use the corrected logic here
        },
      })}
    >
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => <TabBarText focused={focused} title="Home" />,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={'home'} />,
        }}
      />
      <Tabs.Screen
        name="Map"
        component={Map}
        options={{
          tabBarLabel: ({ focused }) => <TabBarText focused={focused} title="Map" />,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={'map'} />,
        }}
      />
      <Tabs.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: ({ focused }) => <TabBarText focused={focused} title="Chat" />,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={'chatbubbles-outline'} />
          ),
        }}
      />
      <Tabs.Screen
        name="Upload"
        component={Upload} // Make sure you have created this component
        options={{
          tabBarLabel: ({ focused }) => <TabBarText focused={focused} title="Upload" />,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={'camera'} />,
        }}
      />
      <Tabs.Screen
        name="Search"
        component={Search}
        options={{
          tabBarButton: () => null, // This hides the tab bar button for the Search screen
          tabBarVisible: false, // This ensures the tab bar itself is not visible when on the Search screen
        }}
      />
    </Tabs.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};
