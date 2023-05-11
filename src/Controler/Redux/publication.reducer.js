import { createSlice } from "@reduxjs/toolkit";

export const publicationSlice = createSlice({
    name:'publication',initialState:[],
    reducers: {
        addPublication:(state,action)=>{
            return [...state,action.payload.filter(post=>post.type==='article')];
        },
            likePublication:(state,action)=>{
                return state;
            }
        
    }
})

export default publicationSlice.reducer;
export const addPublication = publicationSlice.actions.addPublication;