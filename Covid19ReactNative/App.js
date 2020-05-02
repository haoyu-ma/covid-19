import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NewZealand from './components/NewZealand';
import NearMe from './components/NearMe';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NewZealand">
        <Stack.Screen name="NewZealand" component={NewZealand} />
        <Stack.Screen name="NearMe" component={NearMe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
