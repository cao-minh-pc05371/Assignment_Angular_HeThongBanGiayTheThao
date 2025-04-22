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
    resetPassword: '/reset-password',
  },
  brand: {
    base: API_BASE_URL + '/brand',
    list: '/list',
    add: '/add',
  },
  category: {
    base: API_BASE_URL + '/category',
    list: '/list',
    add: '/add',
  },
  product: {
    base: API_BASE_URL + '/product',
    list: '/list',
    add: '/add',
  },
  size: {
    base: API_BASE_URL + '/size',
    list: '/list',
    add: '/add',
  },
  color: {
    base: API_BASE_URL + '/color',
    list: '/list',
    add: '/add',
  },
  cart: {
    base: API_BASE_URL + '/cart',
    getByUser: '/user',
    add: '/add',
    update: '',
    delete: '',
  },
  productVariant: {
    base: API_BASE_URL + '/variant', 
    list: '/list',                   
    getById: '/:id',                 
    getByProduct: '/product/:id',    
    add: '/add',                     
    update: '/:id',                  
    delete: '/:id',                  
  }
};
