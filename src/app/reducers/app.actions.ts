import { createAction, props } from "@ngrx/store";
import { ICard } from "../interfaces/icard.model";

export const setCities = createAction('[CITIES] set items', props<{ items: ICard[] }>());