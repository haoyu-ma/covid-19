import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NewZealand from './components/NewZealand';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NewZealand">
        <Stack.Screen name="NewZealand COVID-19" component={NewZealand} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
