import { createSlice } from "@reduxjs/toolkit";
 
const userSlice=createSlice({
    name:'user',
    initialState:null,
    reducers:{
        logInUser:(state,action)=>{
            return action.payload
        },
        logOutUser:()=>{
            return null
        }
    }
})  

export const {logInUser,logOutUser}=userSlice.actions
export default userSlice.reducer