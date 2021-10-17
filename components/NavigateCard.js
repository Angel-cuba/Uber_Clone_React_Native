import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import tw from 'tailwind-react-native-classnames';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	return (
		<SafeAreaView style={tw`bg-white flex-1`}>
			<Text style={tw`text-center py-5 text-xl`}>Navigate card</Text>
			<View style={tw`border-t border-gray-200 flex-shrink`}>
				<View>
					<GooglePlacesAutocomplete
						placeholder="Where to..?"
						styles={toInputBoxStyles}
						nearbyPlacesAPI="GooglePlacesSearch"
						enablePoweredByContainer={false}
						fetchDetails={true}
						minLength={2}
						query={{
							key: GOOGLE_MAPS_APIKEY,
							language: 'en',
						}}
						debounce={400}
						returnKeyType={'search'}
						onPress={(data, details = null) => {
							console.log(details.geometry.location);
							console.log('-----', data.description);
							dispatch(
								setDestination({
									location: details.geometry.location,
									destination: data.description,
								})
							);
							navigation.navigate('RideOptionsCard');
						}}
					/>
				</View>
				<NavFavourites />
				<View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
					<TouchableOpacity
						onPress={() => navigation.navigate('RideOptionsCard')}
						style={tw`flex justify-between flex-row bg-black w-24 px-4 py-3 rounded-full`}
					>
						<Icon name="car" type="font-awesome" color="white" size={18} />
						<Text style={tw`text-white text-center`}>Rides</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={tw`flex justify-between flex-row w-24 bg-gray-100 px-4 py-3 rounded-full`}
					>
						<Icon name="fast-food-outline" type="ionicon" color="black" size={18} />
						<Text style={tw`text-center`}>Eats</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		paddingTop: 20,
		flex: 0,
	},
	textInput: {
		backgroundColor: '#DDDDDF',
		borderRadius: 0,
		fontSize: 20,
	},
	textInputContainer: {
		paddingHorizontal: 20,
		paddingBottom: 0,
	},
});
