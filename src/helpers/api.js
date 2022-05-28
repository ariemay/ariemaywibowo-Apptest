import React from "react";
import axios from 'axios';

type Request = {
    url: string,
    method: string,
    params: {},
    data: {},
    timeout: number,
};

export const api = async (request: Request) => {
    await axios({
        method: request.method,
        url: request.url,
        param: request.params,
        data: request.data,
        timeout: 30000
    }).then(response => {
        let json = JSON.parse(response);
        return json.data;
    });
};
