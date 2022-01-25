import Products from "../models/ad-Products.js"

export default class SPServices {
    constructor() {};

    layDSSP() {
        return axios({
            method: 'get',
            url: 'https://61d6e9e735f71e0017c2e8c7.mockapi.io/smartphone',
        })
    }

    themProduct(product) {
        return axios({
            method: 'post',
            url: 'https://61d6e9e735f71e0017c2e8c7.mockapi.io/smartphone',
            data: product,
        })
    }

    xoaProduct(id) {
        return axios({
            method: 'delete',
            url: `https://61d6e9e735f71e0017c2e8c7.mockapi.io/smartphone/${id}`,
        })
    }

    xemProduct(id) {
        return axios({
            method: 'get',
            url: `https://61d6e9e735f71e0017c2e8c7.mockapi.io/smartphone/${id}`,
        })
    }

    capnhatProduct(id, product) {
        return axios({
            method: 'put',
            url: `https://61d6e9e735f71e0017c2e8c7.mockapi.io/smartphone/${id}`,
            data: product,
        })
    }

    search() {
        return axios({
            method: 'get',
            url: 'https://61d6e9e735f71e0017c2e8c7.mockapi.io/smartphone',
        })
    }
}