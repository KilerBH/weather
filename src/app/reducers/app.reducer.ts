import { createReducer, on } from "@ngrx/store";
import { setCities } from "./app.actions";
import { ICard } from "../interfaces/icard.model";


export interface ICitiesState {
    cities: ICard[]
}

export const cities = 'cities';

export const initialState: ICitiesState = {
    cities: []
};

export const citiesReducer = createReducer(
  initialState,
  on(setCities, (state, payload) => ({
    ...state,
    cities: [...payload.items]
  }))
);