import { request } from 'umi';

export async function queryCurrent() {
  return request('/api/currentUserDetail');
}
export async function queryFakeList(params) {
  return request('/api/fake_list_Detail', {
    params,
  });
}
export async function getLoggedInUser(){
  return await get('/api/auth/getloggedinuser')
}