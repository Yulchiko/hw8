import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import {carActions} from "../../Slice";

const Form = () => {
    const { carForUpdate } = useSelector(state => state.cars);
    const {handleSubmit, register, reset, setValue} = useForm();
    const dispatch = useDispatch();

    const submit = async (newCar) => {
        if (carForUpdate) {
           await dispatch(carActions.updateCarThunk({id: carForUpdate.id, car: newCar}));
        } else {
           await dispatch(carActions.createCar({car: newCar}));
        }
        reset();
    };

    useEffect(() => {
        if (carForUpdate) {
            const { model, price, year } = carForUpdate;
            setValue('model', model);
            setValue('price', price);
            setValue('year', year);
        }
    }, [carForUpdate]);

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div>
                <label>Model: <input type="text" {...register('model')}/></label>
                <label>Price: <input type="text" {...register('price')}/></label>
                <label>Year: <input type="text" {...register('year')}/></label>
                <button>Save</button>
            </div>
        </form>
    );
};

export {Form};