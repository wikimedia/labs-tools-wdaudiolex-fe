
import axiosInstance from './axiosInstance';

export const getUserData = () => {
return axiosInstance.get('/user');
};