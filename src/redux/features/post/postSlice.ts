import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 1,
    location: '',
    data: []
}

const postSlice = createSlice({
    name: 'postSlice',
    initialState,
    reducers: {
        initialDataFetch: (state, action) =>{
            
        }
    }
})
