const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    user:null,
    role:null,
    token:null
}

const userSlice= createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action) => {
            const {user,role,token}=action.payload;
            state.user=null;
            state.role=null;
            state.token=null;

        },
        logout:(state)=>{
            state.user=null;
            state.role=null;
            state.token=null
        }
    }
});

export const {setUser,logout}=userSlice.actions
export default userSlice.reducer;