import axios from 'axios';
import type { AuthFormData } from '../../types';

const register = async (data: AuthFormData) => {
    try {
        await axios({
            method: 'POST',
            url: 'http://localhost:5000/register',
            data: data
        });
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export default register;