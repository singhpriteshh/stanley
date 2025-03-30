import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '@/apis/api';
import {toast} from "react-toastify"

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast('Passwords do not match');
            return;
        }

        setLoading(true);

        const token = new URLSearchParams(window.location.search).get('token');

        const resetData = {
            token,
            newPassword,
        };

        try {
            const response = await resetPassword(resetData);

            if (response.data.success) {
                toast.success(response.data.message);
                setNewPassword('');
                setConfirmPassword('');
                setTimeout(() => navigate('/auth/login'), 1500);
            } else {
                toast.info(response.data.message);
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            toast.error('Invalid token');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <div className="w-full max-w-md p-8 bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Reset Your Password
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
                    <div className="rounded-md shadow-sm -space-y-px flex gap-3">
                        <div>
                            <label htmlFor="newPassword" className="sr-only">
                                New Password
                            </label>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                                border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none 
                                focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                                border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none 
                                focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm 
                               font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-600 focus:outline-none 
                               focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? 'Loading...' : 'Reset Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
