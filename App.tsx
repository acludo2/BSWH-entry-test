/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();



import {
  SafeAreaView, StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import UserList from './Screens/Users/Users';
import PhotoGrid from './Screens/Albums/Albums';
import { store } from './store/store';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <View style={{
        borderBottomColor: "black",
        borderBottomWidth: 1,
      }}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {title}
        </Text>
      </View>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View >
  );
}


const Quick = () => (<View><Text>what up</Text></View>)


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const UserListComponent = (props:any) => {
    return <SafeAreaView style={backgroundStyle}><Section title="Users">
      <UserList {...props} />
    </Section>
    </SafeAreaView>
  }

  const AlbumsComponent = (props:any) =>{
    return <PhotoGrid {...props} />
  }

  return (
    <Provider store={store}>
      <Quick />
      <NavigationContainer>
        <Stack.Navigator  
          screenOptions={{
              headerShown: false
            }}>
          <Stack.Screen
            name="Home"
            component={UserListComponent} />
            <Stack.Screen
            name="Album"
            component={AlbumsComponent}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor:"white",
    marginTop: 32,
    padding: 8
  },
  sectionTitle: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: '700',
    textAlign: "center",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
