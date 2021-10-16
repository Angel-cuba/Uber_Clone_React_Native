import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

const data = [
	{
		id: '123',
		icon: 'home',
		location: 'Home',
		destination: 'Code Street, London, UK',
	},
	{
		id: '234',
		icon: 'briefcase',
		location: 'Work',
		destination: 'London Eye, London, Uk',
	},
];

const NavFavourites = () => {
	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id}
			ItemSeparatorComponent={() => <View style={[tw`bg-gray-300`, { height: 0.5 }]} />}
			renderItem={({ item: { icon, location, destination } }) => (
				<TouchableOpacity style={tw`flex-row items-center p-5`}>
					<Icon
						style={tw`mr-4 rounded-full bg-gray-500 p-3`}
						name={icon}
						type="ionicon"
						color="white"
						size={20}
					/>
					<View>
						<Text style={tw`font-semibold text-lg`}>{location}</Text>
						<Text style={tw`text-gray-600`}>{destination}</Text>
					</View>
				</TouchableOpacity>
			)}
		/>
	);
};

export default NavFavourites;

const styles = StyleSheet.create({});
