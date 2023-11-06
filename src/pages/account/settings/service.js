import { get, put } from '@/services/http-service';
import { request } from 'umi';

export async function queryCurrent() {
  return request('/api/accountSettingCurrentUser');
}

export async function queryProvince() {
  return request('/api/geographic/province');
}
export async function queryCity(province) {
  return request(`/api/geographic/city/${province}`);
}
export async function query() {
  return request('/api/users');
}
export async function getLoggedInUser(){
  return await get('/api/auth/getloggedinuser')
}
export async function updateUser(params){
  return await put('/api/auth/update?folder=user', params)
}
export async function changePassword(params){
  return await put('/api/auth/change-password', params)
}
