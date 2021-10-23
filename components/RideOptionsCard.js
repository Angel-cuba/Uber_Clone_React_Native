//Fixing Intl issues
// import 'intl';
import { Platform } from 'react-native';
// import 'intl/locale-data/jsonp/en';
import { IntlProvider, createIntl, createIntlCache, useIntl } from 'react-intl';

import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformations } from '../slices/navSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const data = [
	{
		id: 'Uber-X-123',
		title: 'UberX',
		multiplier: 1,
		image: 'http://links.papareact.com/3pn',
	},
	{
		id: 'Uber-XL-456',
		title: 'Uber XL',
		multiplier: 1.2,
		image: 'http://links.papareact.com/5w8',
	},
	{
		id: 'Uber-LUX-789',
		title: 'Uber LUX',
		multiplier: 1.75,
		image: 'http://links.papareact.com/7pf',
	},
];

// If i have SURGE pricing, this goes up
const SURGE_PRICE = 1.5;

const RideOptionsCard = () => {
	const [selected, setSelected] = useState(null);
	const travelTimeInformations = useSelector(selectTravelTimeInformations);
	console.log(travelTimeInformations);

	const navigation = useNavigation();

	const InKm = parseInt(travelTimeInformations?.distance?.text.slice(0, -3), 10);
	const def = Math.round(InKm * 1.60934);

	//Intl issue
	// if (Platform.OS === 'android') {
	// 	// See https://github.com/expo/expo/issues/6536 for this issue.
	// 	if (typeof Intl.__disableRegExpRestore === 'function') {
	// 		Intl.__disableRegExpRestore();
	// 	}
	//}
	// This is optional but highly recommended
	// since it prevents memory leak
	// const cache = createIntlCache();

	// const Intl = useIntl();
	// const Intl = createIntl(
	// 	{
	// 		locale: 'en-gb',
	// 		messages: {},
	// 	},
	// 	cache
	// );
	return (
		// <IntlProvider>
		<SafeAreaView style={tw`flex-grow`}>
			<View>
				<TouchableOpacity
					onPress={() => navigation.navigate('NavigateCard')}
					// onPress={() => goBack()}
					style={tw`absolute top-3 left-5 p-3 rounded-full`}
				>
					<Icon name="chevron-left" type="fontawesome" size={25} />
				</TouchableOpacity>
				<Text style={tw`text-center py-5 text-xl`}>
					{!travelTimeInformations?.distance?.text
						? 'Something went wrong, please try again later 😪'
						: 'Distance'}{' '}
					{def} km
				</Text>
			</View>
			<FlatList
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({ item: { id, multiplier, image, title }, item }) => (
					//
					<TouchableOpacity
						onPress={() => setSelected(item)}
						style={tw`flex-row justify-between items-center px-5 ${
							id === selected?.id && 'bg-gray-300'
						}`}
					>
						<Image
							style={{
								width: 100,
								height: 100,
								resizeMode: 'contain',
							}}
							source={{
								uri: image,
							}}
						/>
						<View style={tw`-ml-6`}>
							<Text style={tw`text-xl font-semibold`}>{title}</Text>
							<Text>
								{!travelTimeInformations?.duration?.text ? (
									<MaterialCommunityIcons name="map-marker-distance" size={24} color="crimson" />
								) : (
									travelTimeInformations?.duration?.text
								)}{' '}
								{!travelTimeInformations?.distance?.text ? '' : 'Travel time'}
							</Text>
							{/*  */}
						</View>
						<Text style={tw`text-xl`}>
							{travelTimeInformations?.status !== 'ZERO_RESULTS' ? (
								new Intl.NumberFormat('en-gb', {
									style: 'currency',
									currency: 'GBP',
								}).format(
									(travelTimeInformations?.duration?.value * SURGE_PRICE * multiplier) / 100
								)
							) : (
								<MaterialCommunityIcons name="table-cancel" size={24} color="red" />
							)}

							{/* £100 */}
						</Text>
					</TouchableOpacity>
				)}
			/>
			<View style={tw`mt-auto border-t border-gray-200`}>
				<TouchableOpacity style={tw`bg-black ${!selected && 'bg-gray-300'}`}>
					<Text style={tw`text-center text-white text-xl`}>
						{!selected?.title ? 'Choose ' : 'Has selected '}{' '}
						{selected?.title ? selected?.title : 'a car'}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
		// </IntlProvider>
	);
};

export default RideOptionsCard;
