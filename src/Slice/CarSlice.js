import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {carService as CarService} from "../Service";

const getAllCars = createAsyncThunk(
    'carSlice/getAllCars',
    async () => {
        const {data} = await CarService.getAll();
        return data
    }
);

 const createCar = createAsyncThunk(
    'carSlice/createCar',
    async ({car}, {dispatch, rejectWithValue}) => {
        try {
            const {data} = await CarService.create(car);
            dispatch(addCar({car: data}));
        } catch (e) {
            return rejectWithValue({status: e.message, formErrors: e.response.data})
        }
    }
);

 const updateCarThunk = createAsyncThunk(
    'carSlice/updateCar',
    async ({id, car}, {dispatch, rejectWithValue}) => {
        try {
            await CarService.updateById(id, car);
            dispatch(updateCar({ id, car }));
        } catch (e) {
            return rejectWithValue({status: e.message})
        }

    }
);

const deleteCarThunk = createAsyncThunk(
    'carSlice/deleteCar',
    async (id, {dispatch}) => {
        try {
            await CarService.deleteById(id);
            dispatch(deleteCar({id}));
        } catch (e) {

        }
    }
);

const carSlice = createSlice({
    name: 'carSlice',
    initialState:{
        cars: [],
        status: null,
        formErrors: {},
        carForUpdate: null,
    },

    reducers: {
        addCar: (state, action) => {
            state.cars.push(action.payload.car);
        },
        deleteCar: (state, action) => {
            const index = state.cars.findIndex(car => car.id === action.payload.id);
            state.cars.splice(index, 1);
        },
        updateCar: (state, action) => {
            const index = state.cars.findIndex(car => car.id === action.payload.id);
            state.cars[index] = { ...state.cars[index], ...action.payload.car };
            state.carForUpdate = false;
        },
        setCarForUpdate: (state, action) => {
            state.carForUpdate = action.payload.car;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCars.fulfilled, (state, action) => {
                state.status = 'completed'
                state.cars = action.payload
                console.log(action.type);
            })
            .addCase(createCar.fulfilled, (state, action) => {
                console.log('completed');
                console.log(action.type);
            })
            .addCase(createCar.rejected, (state, action) => {
                const {status, formErrors} = action.payload;
                state.status = status
                state.formErrors = formErrors
                console.log(action.type);
            })
    }

});


const {reducer: carReducer, actions: {addCar, deleteCar, updateCar, setCarForUpdate}} = carSlice;


const carActions = {
    getAllCars,
    createCar,
    deleteCarThunk,
    updateCarThunk,
    setCarForUpdate

}
    export {
        carReducer,
        carActions
    }




