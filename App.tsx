import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

type TabNavigatorScreens = {
  About: {};
  Stock: {};
};

const names: Record<keyof TabNavigatorScreens, string> = {
  About: 'information-circle-outline',
  Stock: 'analytics-outline',
};

const TabNavigator = createBottomTabNavigator<TabNavigatorScreens>();

function App() {
  return (
    <NavigationContainer>
      <TabNavigator.Navigator
        screenOptions={({route}) => {
          return {
            tabBarIcon: ({color, size}) => {
              const name = names[route.name];
              return <Ionicons size={size} name={name} color={color} />;
            },
          };
        }}>
        <TabNavigator.Screen
          name="About"
          getComponent={() => require('./src/views/About.tsx').default}
          options={{
            title: 'О приложении',
          }}
        />
        <TabNavigator.Screen
          name="Stock"
          getComponent={() => require('./src/views/Stock.tsx').default}
          options={{
            title: 'Котировки',
          }}
        />
      </TabNavigator.Navigator>
    </NavigationContainer>
  );
}

export default App;
