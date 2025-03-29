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