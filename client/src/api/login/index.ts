import axios from 'axios';
import type { AuthFormData } from '../../types';

const login = async (data: AuthFormData) => {
    try {
        await axios({
            method: 'POST',
            url: 'http://localhost:5000/login',
            data,
            withCredentials : true
        });
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export default login;