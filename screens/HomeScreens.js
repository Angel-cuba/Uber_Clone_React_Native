import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';

const HomeScreens = () => {
	const dispatch = useDispatch();

	return (
		<SafeAreaView style={tw`bg-white h-full`}>
			<View style={styles.root}>
				<Image
					style={{
						width: 100,
						height: 100,
						resizeMode: 'contain',
					}}
					source={{
						uri: 'https://links.papareact.com/gzs',
					}}
				/>

				<GooglePlacesAutocomplete
					placeholder="Where From?"
					styles={{
						container: {
							flex: 0,
						},
						textInput: {
							fontSize: 20,
						},
					}}
					query={{
						key: GOOGLE_MAPS_APIKEY,
						language: 'en',
					}}
					onPress={(data, details = null) => {
						// console.log(data, details);
						dispatch(
							setOrigin({
								location: details.geometry.location,
								description: data.description,
							})
						);
						dispatch(setDestination(null));
					}}
					fetchDetails={true}
					enablePoweredByContainer={false}
					minLength={2}
					nearbyPlacesAPI="GooglePlacesSearch"
					debounce={400}
				/>
				<NavOptions />
				<NavFavourites />
			</View>
		</SafeAreaView>
	);
};

export default HomeScreens;

const styles = StyleSheet.create({
	root: {
		// flex: 1,
		padding: 15,
	},
	nav: {
		marginTop: 55,
	},
});
