import { createSlice } from "@reduxjs/toolkit";
import type { DropdownSlice } from "../../models/dropdown";
import type { DropdownOption, SubCategory } from "../../models/ticket";

const initialState: DropdownSlice = {
  ticketPriorities: [],
  ticketStatusList: [], 
  ticketCategories: [], 
  ticketSubCategories: [],
};

const dropdownSlice = createSlice({
  name: "dropdown-options",
  initialState,
  reducers: {
    setPriorities(state, action: { payload: DropdownOption[] }) {
      state.ticketPriorities = action.payload;
    },
    setStatusList(state, action: { payload: DropdownOption[] }) {
      state.ticketStatusList = action.payload;
    },
    setCategories(state, action: { payload: DropdownOption[] }) {
      state.ticketCategories = action.payload;
    },
    setSubCategories(state, action: { payload: SubCategory[] }) {
      state.ticketSubCategories = action.payload;
    },
  },
});

export const { setPriorities, setStatusList, setCategories, setSubCategories } = dropdownSlice.actions;
export default dropdownSlice.reducer;
