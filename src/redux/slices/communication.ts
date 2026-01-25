import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Action, Stage } from "@/types/entity/communication";

export interface CommunicationState {
  selectedStage: Stage | undefined;
  selectedAction: Action | undefined;
}

const initialState: CommunicationState = {
  selectedStage: undefined,
  selectedAction: undefined,
};

export const communicationSlice = createSlice({
  name: "communication",
  initialState,
  reducers: {
    setSelectedStage: (state, action: PayloadAction<Stage | undefined>) => {
      state.selectedStage = action.payload;
    },
    setSelectedAction: (state, action: PayloadAction<Action | undefined>) => {
      state.selectedAction = action.payload;
    },
  },
});

export const { setSelectedStage, setSelectedAction } =
  communicationSlice.actions;

export default communicationSlice.reducer;
