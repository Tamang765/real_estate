import { get, post, put, del } from '/src/services/http-service';

export async function search(params) {
  const populatedParams= {...params ,populate:"author" }
  return await post('/api/blogs/search', populatedParams);
}
export async function getLoggedInUser(){
  return await get('/api/auth/getloggedinuser')
}
export async function count(params, options) {
  return await post('/api/blogs/count', params, options);
}

export async function getById(id, options) {
  return await get(`/api/blogs/detail?id=${id}`, {}, options);
}

export async function update(params) {
  return await put('/api/blogs/update', params);
}

export async function save(params) {
  return await post('/api/blogs/create', params);
}

export async function check(params) {
  return await post('/api/blogs/check', params);
}

export async function remove(id, options) {
  return await del(`/api/blogs/delete?id=${id}`, {}, options);
}

export async function getRoles(options) {
  return await post('/api/roles/search', { pageSize: -1 });
}

export async function getCategory(options) {
  return await post('/api/categories/search', { pageSize: -1 });
}
export async function getSubCategory(options) {
  return await post('/api/subCategories/search', { pageSize: -1 });
}


export const validateUser = async (_, value, user) => {
  const { field, fullField } = _;
  const promise = Promise;
  if (!value) {
    // setVisible(!!value);
    return promise.reject(`${fullField} is required`);
  }
  // stop calling http api if length is less than 5
  if (value.length < 5) {
    return promise.reject(`${fullField} must be at least 5 characters`);
  }
  console.log(`${fullField} is valid`);
  let query = {};
  query[field] = value;
  if (user._id) {
    query._id = { $ne: user._id };
  }

  const res = await check(query);
  console.log('res', res);
  if (res.status === "success") {
    return promise.reject(res.message);
  } else {
    return promise.resolve();
  }
}