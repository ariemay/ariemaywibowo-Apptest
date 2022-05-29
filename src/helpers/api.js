import React from "react";
import axios from 'axios';
import { Request } from "../utils/Interfaces";

export const api = async (request: Request, res) => {
    let baseUrl = "https://simple-contact-crud.herokuapp.com"
    try {
        await axios({
            method: request.method,
            url: baseUrl + request.endpoint,
            param: request.params,
            data: request.data,
            timeout: 30000
        }).then(response => {
            res(response.data)
        });
    }
    catch (e) {
        console.log(e)
    }
};
