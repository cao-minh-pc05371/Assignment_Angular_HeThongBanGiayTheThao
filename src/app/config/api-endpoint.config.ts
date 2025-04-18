import { environment } from '../../environments/environment';

export const API_BASE_URL = environment.apiUrl;

export const API_ENDPOINT = {
  user: {
    base: API_BASE_URL + '/user',
    list: '/list',
    getById: '',
    add: '/add',
    edit: '',
    delete: '',
  },
  auth: {
    base: API_BASE_URL + '/user',
    login: '/login',
    register: '/register',
    profile: '/profile',
    updatePassword: '/update-password',
<<<<<<< HEAD
    resetPassword: '/reset-password',
  },
  brand: {
    base: API_BASE_URL + '/brand',
    list: '/list',
    add: '/add',
=======
    resetPassword: '/reset-password'   
  },
  brand:{
    base: API_BASE_URL + '/brand',
    list: '/list',
    add: '/add'
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
  },
  category: {
    base: API_BASE_URL + '/category',
    list: '/list',
<<<<<<< HEAD
    add: '/add',
=======
    add: '/add'
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
  },
  product: {
    base: API_BASE_URL + '/product',
    list: '/list',
<<<<<<< HEAD
    add: '/add',
=======
    add: '/add'
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
  },
  size: {
    base: API_BASE_URL + '/size',
    list: '/list',
<<<<<<< HEAD
    add: '/add',
=======
    add: '/add'
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
  },
  color: {
    base: API_BASE_URL + '/color',
    list: '/list',
<<<<<<< HEAD
    add: '/add',
  },
  variant: {
    base: API_BASE_URL + '/variant',
    list: '/list',
    listVariantByIdProduct:'/product',
    add: '/add',
  },
  cart: {
    base: API_BASE_URL + '/cart',
    getByUser: '/user',
    add: '/add',
    update: '',
    delete: '',
  },
=======
    add: '/add'
  }
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
};
