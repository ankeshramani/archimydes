import {getUserAPI} from "../api/usersApi";

export const getToken = () => localStorage.getItem('accessToken') ? 'Bearer ' + localStorage.getItem('accessToken') : '' ;
export const getTokenExpiration = () => localStorage.getItem('expireToken') ? localStorage.getItem('expireToken') : '' ;
export const getUserData = () => localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {} ;

export const removeToken = () => localStorage.removeItem('accessToken');
export const removeAllUserinfo = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('expireToken');
  localStorage.removeItem('userData');
}
export const checkUserDeleted = async () =>{
  const userData = getUserData();
  try{
    const response = await getUserAPI(userData._id);
    if(response && response.data){
    }
  }catch (er) {
    if(er.response){
      removeAllUserinfo()
    }
  }
}
export const isLoggedIn = () => {
  checkUserDeleted()
  const accessToken = getToken();
  const expirationDate = getTokenExpiration();
  if(localStorage.getItem('userData') && accessToken && !isTokenExpired(expirationDate)){
    return true;
  }
  return false;
};

export const isTokenExpired = (token, expirationDate) => {
  if (expirationDate < new Date()) {
    removeAllUserinfo();
    return true;
  }
  return false;
};

export const getUserId = () => {
 const userData = getUserData();
 if(userData && userData._id){
   return userData._id;
 }
 return '';
};