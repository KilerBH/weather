import { createFeatureSelector } from "@ngrx/store";
import { ICitiesState, cities } from "./app.reducer";

export const selectCities = createFeatureSelector<ICitiesState>(cities)