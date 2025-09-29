import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IStationRef {
  id: string;
  libelle12: string;
  libelle23: string;
}

export interface RefState {
  stations: IStationRef[];
}

const initialState: RefState = {
  stations: [],
};

export const refSlice = createSlice({
  name: "ref",
  initialState,
  reducers: {
    setStations: (state, action: PayloadAction<IStationRef[]>) => {
      state.stations = action.payload;
    },
  },
});

export const { setStations } = refSlice.actions;

export default refSlice.reducer;
