export  const  jwtCheck = ()=>localStorage.getItem('token') !=null && localStorage.getItem('token') !='null'  
export  const  getToken = ()=>localStorage.getItem('token') 
export const  logOut = e=> {
    localStorage.setItem('token',null)
    localStorage.setItem('rule',null)
    window.location.reload();
} 
export const getUserRule = ()=>localStorage.getItem('rule') 
export const getUser = ()=>localStorage.getItem('user') 