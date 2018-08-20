
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

const axios = require('axios');

let token = document.head.querySelector('meta[name="csrf-token"]');
if (!token) { console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token'); }

const axiosInstance = axios.create({
    baseURL: '/server',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': token.content
    },
    validateStatus: function(status){ return status < 500; }
});
axiosInstance.interceptors.request.use(function (config) {window.VueApp.$store.dispatch('serverRequestInterceptor', config).then((modifiedConfig)=>{ config = modifiedConfig; });return config;}, function (error) {window.VueApp.$store.commit('pageLoading',false); return Promise.reject(error);});
axiosInstance.interceptors.response.use(function (response) {window.VueApp.$store.dispatch('serverResponseInterceptor', response).then((modifiedResponse)=>{ response = modifiedResponse; });return response;}, function (error) {window.VueApp.$store.commit('pageLoading',false); return Promise.reject(error);});
global.server = (params = null) => axiosInstance.post('',params);

global.token = axios.create({
    baseURL: '/token',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': token.content
    }
});
global.token.interceptors.response.use(function(response){ window.VueApp.$store.commit('AUTH/setToken',response.headers['x-appframe-token']); return response; });
