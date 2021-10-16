import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	origin: null,
	destination: null,
	travelTimeInformations: null,
};

export const navSlice = createSlice({
	name: 'nav',
	initialState,
	reducers: {
		setOrigin: (state, action) => {
			state.origin = action.payload;
		},
		setDestination: (state, action) => {
			state.destination = action.payload;
		},
		setTravelTimeInformations: (state, action) => {
			state.travelTimeInformations = action.payload;
		},
	},
});

export const { setOrigin, setDestination, setTravelTimeInformations } = navSlice.actions;

// Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformations = (state) => state.nav.travelTimeInformations;

export default navSlice.reducer;
