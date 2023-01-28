import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
export const userLogin = createAsyncThunk('login/userLogin', async (data) => {
    const options = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    }
    try {
        const userData = await fetch('http://localhost:2929/login',options);
        return userData.json();
    } catch (error) {
        return error
    }
});

export const getUser = createAsyncThunk('getUser/getUser', async (data) =>{
    try {
        const options = {
            method : 'GET',
            headers : {
                'Content-Type':'application/json',
                'Authorization' : data
            }
        }    
        const response = await fetch('http://localhost:2929/',options);
        return response.json();   
    } catch (error) {
        return error
    }
})

const user = createSlice({
    name : {
        name : 'login',
        name : 'getUser'
    },
    initialState: {
        value : null,
        status : 'idle',
        error : null,
        message : null
    },
    reducers : {
        logout : (state, action) =>{
            state.value = null;
            state.status = 'idle';
            state.error = null;
            state.message = null;
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(userLogin.pending, (state,action)=>{
                state.status = 'pending'
            })
            .addCase(userLogin.fulfilled, (state, action) =>{
                state.status = 'succeeded';
                // console.log(action.payload);
                if(action.payload.validationError){
                    alert(`${action.payload.validationError[0].msg}`);
                }else if(action.payload.error){
                    alert(`${action.payload.error}`)
                }else if(action.payload.token){
                    localStorage.setItem('token',action.payload.token);
                    state.value = action.payload.userData;
                    state.message = 'active';
                }
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            })

            //get user data if have token 
            .addCase(getUser.pending, (state,action)=>{
                state.status = 'pending'
            })
            .addCase(getUser.fulfilled, (state, action) =>{
                state.status = 'succeeded';
                // console.log(action.payload);
                state.value = action.payload.userData;
                state.message = 'active';
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            });
    }    
});
export const { logout } = user.actions;
export default  user.reducer