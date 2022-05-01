import axios from "axios";

import {baseUrl} from "../Config";

export const AxiosService = axios.create({baseUrl})