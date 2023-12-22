import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    accesstoken: localStorage.getItem("access") ? JSON.parse(localStorage.getItem("access")) : null
}



const loginslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    settoken:(state,action)=>{
        // console.log(action.payload,"token in");
        localStorage.setItem("access",JSON.stringify(action.payload));
        state.accesstoken = localStorage.getItem("access");
        // console.log(state.accesstoken,"yes");
    },
    cleartoken:(state)=>{
        state.accesstoken=null;
    }
  },
});

export const { settoken, cleartoken  } = loginslice.actions;
export default loginslice.reducer;