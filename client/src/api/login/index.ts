import axios from 'axios';
import type { AuthFormData } from '../../types';

const login = async (data: AuthFormData) => {
        await axios({
            method: 'POST',
            url: 'http://localhost:5000/login',
            data,
            withCredentials : true
        });
};

export default login;