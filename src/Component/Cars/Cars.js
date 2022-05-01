// noinspection JSUnusedAssignment

import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {carActions} from "../../Slice";
import {Car} from "../Car/Car";

export const Cars = () => {
    const {cars,status} = useSelector(state => state.cars);
    const dispatch = useDispatch();

    useEffect(()=>{
                dispatch(carActions.getAllCars())
    },[])

    return (
        <div>
            <div style={{margin: '50px'}}>
                {status&&<h1>{status}</h1>}
                {cars && cars.map((car) => <Car key={car.id} car={car}/>)}
            </div>
        </div>
    );
};