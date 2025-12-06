import { get, post, put, del } from './api.js';

const endpoints = {
    getAll: '/data/cars?sortBy=_createdOn%20desc',
    create: '/data/cars',
    details: (id) => `/data/cars/${id}`,
    delete: (id) => `/data/cars/${id}`,
    edit: (id) => `/data/cars/${id}`,
    search: (query) => `/data/cars?where=model%20LIKE%20%22${query}%22`
};

export async function getAllCars() {
    return get(endpoints.getAll);
}

export async function getCarById(id) {
    return get(endpoints.details(id));
}

export async function createCar(data) {
    return post(endpoints.create, data);
}

export async function editCar(id, data) {
    return put(endpoints.edit(id), data);
}

export async function deleteCar(id) {
    return del(endpoints.delete(id));
}

export async function searchCars(query) {
    return get(endpoints.search(query));
}