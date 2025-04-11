import { environment } from "../../environments/environment";

export const API_BASE_URL = environment.apiUrl;

export const API_ENDPOINT = {
  user: {
    base: API_BASE_URL + '/user',
    list: '/list',
    getById: '',
    add: '/add',
    edit: '',
    delete: ''
  },
  auth: {
    base: API_BASE_URL + '/user',
    login: '/login',
    register: '/register',
    profile: '/profile',
    updatePassword: '/update-password',
    resetPassword: '/reset-password'   
  }
};
