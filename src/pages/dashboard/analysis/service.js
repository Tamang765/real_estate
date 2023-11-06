import { post } from '@/services/http-service';
import { request } from 'umi';

export async function fakeChartData() {
  // return request('/api/fake_analysis_chart_data');
  return [];
}
export async function propertycount( options) {
return await post('/api/properties/count',options);
}
export async function propertyFilter( params) {
  return await post('/api/properties/search',params);
  }
export async function blogscount(params, options) {
  return await post('/api/blogs/count', params, options);
}


export async function purchasecount(params, options) {
  return await post('/api/purchase/count', params, options);
}
export async function usercount(params, options) {
  return await post('/api/users/count', params, options);
}

export async function Categorysearch(params) {
  const populateParams= {...params, populate:"subCategories"}
  return await post('/api/categories/search', populateParams);
}