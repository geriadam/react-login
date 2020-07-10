export const PROD_URL    = 'https://laravelapiauth.geriblogger.com';
export const API_URL     = '/api';
export const URL_VERSION = '/v1'
export const MERGE       = PROD_URL + API_URL + URL_VERSION;

// Auth
export const LOGIN_URL = MERGE  + '/auth/login';
export const USER_URL = MERGE + '/auth/user';
export const REGISTER_URL = MERGE + '/auth/signup';
export const LOGOUT_URL = MERGE + '/auth/logout';
