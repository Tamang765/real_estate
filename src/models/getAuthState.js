import { getLoggedInUser } from '@/pages/blogs/service';
import { useState, useCallback, useEffect } from 'react'

export default function useAuthModel() {
  const [auth, setAuth] = useState({ userInfo: null, isAuthenticated: false, token: '' });


  const getUser= async()=>{
    const response= await getLoggedInUser();
  }
  
  console.log('useAuthModel>auth', auth);

  useEffect(()=>{
    getUser();
  },[])

  
  useEffect(() => {
    const dbAuthData = localStorage.getItem('auth');
    console.log('Pulling from localStorage', dbAuthData);
    if (dbAuthData) {
      const authData = JSON.parse(dbAuthData);
      console.log('useAuthModel>useEffect>authData', authData);
      if (authData && authData.token && authData.userInfo) {
        setAuth({ isAuthenticated: true, token: authData.token, userInfo: authData.userInfo });
      }
      else localStorage.removeItem('auth');
    }
  }, []);
console.log(auth);
  const setAuthentication = (data) => {
    console.log('2.setAuthentication called with', data);
    const auth = { userInfo: data.userInfo, permissions: data.permissions, isAuthenticated: data.isAuthenticated, token: data.token };
// const auth={user:data?.user, token: data.token}
    localStorage.setItem('auth', JSON.stringify(auth));
    setAuth(auth);
  }

  return {
    auth,
    setAuthentication,
  }
}
