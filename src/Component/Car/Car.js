import React from 'react';
import {useDispatch} from "react-redux";
import {carActions} from "../../Slice";

const Car = ({car, car: {id, model, price, year}})=> {
    const dispatch = useDispatch();
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px', gap: '20px'}}>
            <div>Id: {id}</div>
            <div>Model: {model}</div>
            <div>Price: {price}</div>
            <div>Year: {year}</div>

            <button onClick={() => dispatch(carActions.setCarForUpdate({car}))}>Update</button>
            <button onClick={() => dispatch(carActions.deleteCarThunk(car.id))}>Delete</button>
        </div>
    );
};

export {Car};