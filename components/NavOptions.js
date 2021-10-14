import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

const data = [
	{
		id: '123',
		title: 'Get a ride',
		image: 'http://links.papareact.com/3pn',
		screen: 'MapScreens',
	},
	{
		id: '234',
		title: 'Order food',
		image: 'http://links.papareact.com/28w',
		// screen: 'OrderScreen',
		screen: 'MapScreens',
	},
];
const NavOptions = () => {
	const navigation = useNavigation();
	return (
		<FlatList
			data={data}
			horizontal
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<TouchableOpacity
					onPress={() => navigation.navigate(item.screen)}
					style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-300 m-2 w-40`}
				>
					<View>
						<Image
							style={{
								width: 120,
								height: 120,
								resizeMode: 'contain',
							}}
							source={{
								uri: item.image,
							}}
						/>
						<Text style={tw`mt-2 text-lg font-bold`}>{item.title}</Text>
						<Icon
							style={tw`p-2 bg-black rounded-full w-10 mt-4`}
							type="antdesign"
							color="silver"
							name="arrowright"
						/>
					</View>
				</TouchableOpacity>
			)}
		/>
	);
};

export default NavOptions;

const styles = StyleSheet.create({});
