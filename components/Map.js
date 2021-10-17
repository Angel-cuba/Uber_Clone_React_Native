import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectOrigin, selectDestination, setTravelTimeInformations } from '../slices/navSlice';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';

const Map = () => {
	const origin = useSelector(selectOrigin);
	const destination = useSelector(selectDestination);
	const mapRef = useRef(null);

	const dispatch = useDispatch();

	// console.log('Origen----', origin.description);
	//console.log(destination);
	// console.log(origin.location.lat);
	// console.log(origin.location.lng);

	// useEffect(() => {
	// 	if (!origin || !destination) return;

	// 	//Zoom & fit to markers
	// 	mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
	// 		edgePadding: {
	// 			top: 50,
	// 			right: 50,
	// 			bottom: 50,
	// 			left: 50,
	// 		},
	// 	});
	// }, [origin, destination]);
	useEffect(() => {
		if (!origin || !destination) return;

		const getTravelTime = async () => {
			fetch(
				`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.destination}&key=${GOOGLE_MAPS_APIKEY}`
			)
				.then((response) => response.json())
				.then((data) => {
					dispatch(setTravelTimeInformations(data.rows[0].elements[0]));
					// console.log('Map.js', data.rows[0].elements[0].status);
				});
		};

		getTravelTime();
	}, [origin, destination, GOOGLE_MAPS_APIKEY]);

	return (
		<MapView
			// ref={mapRef}
			style={tw`flex-1`}
			mapType="mutedStandard"
			initialRegion={{
				latitude: origin?.location.lat,
				longitude: origin?.location.lng,
				latitudeDelta: 0.5,
				longitudeDelta: 0.5,
			}}
		>
			{origin && destination && (
				<>
					{/* <MapView.Marker coordinate={origin.description} />
					<MapView.Marker coordinate={destination.description} /> */}
					<MapViewDirections
						origin={origin.description}
						destination={destination.destination}
						apikey={GOOGLE_MAPS_APIKEY}
						strokeWidth={3}
						strokeColor="#000"
						lineDashPattern={[1]}
					/>
				</>
			)}
			{origin?.location && (
				<Marker
					coordinate={{
						latitude: origin.location.lat,
						longitude: origin.location.lng,
					}}
					title="Origin"
					description={origin.description}
					identifier="origin"
				/>
			)}
			{destination?.location && (
				<Marker
					coordinate={{
						latitude: destination.location.lat,
						longitude: destination.location.lng,
					}}
					title="Destination"
					description={destination.destination}
					identifier="destination"
				/>
			)}
		</MapView>
	);
};

export default Map;

const styles = StyleSheet.create({});
