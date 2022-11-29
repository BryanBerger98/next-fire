import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { User } from '../services/users/types/user.type';
import useUsersClientService from '../services/users/users.client.service';
import { AppState } from './index';

type UsersState = {
	users: User[];
	count: number;
	total: number;
	loading: boolean;
	error: any;
}

const initialState: UsersState = {
    users: [],
    count: 0,
    total: 0,
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => await useUsersClientService().getUsers());

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsersState: (state, action) => {
            state = action.payload;
        },
    },
    // extraReducers: {
    //     [ HYDRATE ]: (state, action) => {
    //         return {
    //             ...state,
    //             ...action.payload,
    //         };
    //     },
    // 	['users/fetchUsers']: (state, action) => {

    // 	}
    // },
    extraReducers(builder) {
        builder.addCase(HYDRATE, (state, action) => {
            return {
                ...state,
                ...action,
            };
        });
        builder.addCase(fetchUsers.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state = {
                ...state,
                loading: false,
                ...action.payload,
                error: null,
            };
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state = {
                ...state,
                loading: false,
                error: action.error,
            };
        });
    },
});

export const { setUsersState } = usersSlice.actions;

export const selectUsersState = (state: AppState) => state.users;

export default usersSlice.reducer;
