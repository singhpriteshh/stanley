import axios from "axios";



export const registerUser = ('/auth/register',
    async (formData) => {
        const response = await axios.post('http://localhost:5000/api/auth/register',
            formData,
            {
                withCredentials: true
            }
        );
        return response.data;
    }
)

export const loginUser = ('/auth/login',

    async (formData) => {
        const response = await axios.post('http://localhost:5000/api/auth/login',
            formData,
            {
                withCredentials: true
            }
        );
        return response;
    }
)

export const forgetPassword = async (email) => {

    const response = await axios.post('http://localhost:5000/api/auth/forget-password',
        email
    );

    return response;
};

export const resetPassword = async (resetData) => {

    const response = await axios.post('http://localhost:5000/api/auth/reset-password',
        resetData
    );

    return response;

};