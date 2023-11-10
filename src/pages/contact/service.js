import { get, post, put, del } from '/src/services/http-service';

export async function search(params) {
  const populateParams= {...params, populate:""};
  return await post('/api/contacts/search', populateParams);
}

export async function count(params, options) {
  return await post('/api/contacts/count', params, options);
}

export async function remove(id, options) {
  return await del(`/api/contacts/delete?id=${id}`, {}, options);
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