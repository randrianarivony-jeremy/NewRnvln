import { createSlice } from "@reduxjs/toolkit";

export const interviewSlice = createSlice({
    name:'interview',initialState:[],
    reducers: {
        addInterview:(state,action)=>{
            return [...state,action.payload.filter(post=>post.type==='interview')];
        },
            likeInterview:(state,action)=>{
                return state;
            }
        
    }
})

export default interviewSlice.reducer;
export const addInterview = interviewSlice.actions.addInterview;