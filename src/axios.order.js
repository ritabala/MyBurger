import axios from 'axios';

const instance = axios.create(
{
    baseURL: 'https://react-my-burger-7070b.firebaseio.com'
}
);

export default instance;
