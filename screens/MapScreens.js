import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Map from '../components/Map';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';

const MapScreens = () => {
	const Stack = createNativeStackNavigator();
	return (
		<View style={styles.container}>
			<View style={tw`h-1/2`}>
				<Map />
			</View>
			<View style={tw`h-1/2`}>
				<Stack.Navigator>
					<Stack.Screen
						name="NavigateCard"
						component={NavigateCard}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="RideOptionsCard"
						component={RideOptionsCard}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</View>
		</View>
	);
};

export default MapScreens;

const styles = StyleSheet.create({
	container: {
		height: '100%',
	},
});
