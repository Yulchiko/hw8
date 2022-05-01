import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {carReducer} from "../Slice";


export const rootReducer = combineReducers({
    cars: carReducer,
})

export const Store = configureStore({
    reducer: rootReducer
})