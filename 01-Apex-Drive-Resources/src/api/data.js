import * as api from './api.js';

export const login = api.post.bind(null, '/users/login');
export const register = api.post.bind(null, '/users/register');
export const logout = api.get.bind(null, '/users/logout');

export async function getAllCars() {
    return api.get('/data/cars?sortBy=_createdOn%20desc');
}

export async function getCarById(id) {
    return api.get('/data/cars/' + id);
}

export async function createCar(car) {
    return api.post('/data/cars', car);
}

export async function editCar(id, car) {
    return api.put('/data/cars/' + id, car);
}

export async function deleteCar(id) {
    return api.del('/data/cars/' + id);
}

export async function searchCars(query) {
    return api.get(`/data/cars?where=model%20LIKE%20%22${query}%22`);
}