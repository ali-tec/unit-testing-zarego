import axios from 'axios';

const getUser = () => {
   return axios({
       method: "GET",
       url: "https://jsonplaceholder.typicode.com/users" 
    })
    .then(res => {
        return Promise.resolve(res.data);
    })
    .catch(err => {
        return Promise.reject(err)
    })
}


export default getUser;