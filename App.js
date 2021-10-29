import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from 'react-redux';
import HomeScreens from './screens/HomeScreens';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreens from './screens/MapScreens';

if (Platform.OS === 'android') {
	require('intl');
	require('intl/locale-data/jsonp/fr-BE');
	require('intl/locale-data/jsonp/nl-BE');
	require('intl/locale-data/jsonp/it-IT');
}

//Set up Redux

export default function App() {
	const Stack = createNativeStackNavigator();

	return (
		<Provider store={store}>
			<NavigationContainer>
				<SafeAreaProvider>
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
						style={{ flex: 1 }}
						keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
					>
						<Stack.Navigator>
							<Stack.Screen
								name="HomeScreens"
								component={HomeScreens}
								options={{
									headerShown: false,
								}}
							/>
							<Stack.Screen
								name="MapScreens"
								component={MapScreens}
								options={{
									headerShown: false,
								}}
							/>
						</Stack.Navigator>
					</KeyboardAvoidingView>
				</SafeAreaProvider>
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
