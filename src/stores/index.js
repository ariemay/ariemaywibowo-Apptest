import { configureStore } from "@reduxjs/toolkit";
import contactsReducers from './contactsReducers';

export const store = configureStore({
    reducer: {
        contacts: contactsReducers
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
