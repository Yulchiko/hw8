import {AxiosService} from "./AxiosService";
import {urls} from "../Config";

export  const carService={
    getAll:()=>AxiosService.get(urls.cars),
    create:(car)=>AxiosService.post(urls.cars, car),
    deleteById:(id)=>AxiosService.delete(`${urls.cars}/${id}`),
    updateById: (id, car) => AxiosService.put(`${urls.cars}/${id}`, car),
}