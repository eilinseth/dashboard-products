import axios from 'axios';
import type { AuthFormData } from '../../types';

const register = async (data: AuthFormData) => {
        await axios({
            method: 'POST',
            url: 'http://localhost:5000/register',
            data: data
        });
};

export default register;