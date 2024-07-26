import React, { useState, useEffect } from 'react';
import { PencilSquare } from 'react-bootstrap-icons';
import backgroundImage from './../../assets/backgroundcus.png'; // Ensure the path to your background image is correct
import { updateProfile } from '../../utils/updateAccount';
import { notification } from 'antd';

const AccountInfo = () => {
    const [account, setAccount] = useState({
        accountId: '', // Add this line to include accountId
        displayName: '',
        email: '',
        phone: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const storedAccount = JSON.parse(localStorage.getItem('account'));
        if (storedAccount) {
            setAccount(storedAccount);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccount((prevAccount) => ({ ...prevAccount, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // Assuming updateProfile will throw an error if email already exists
            await updateProfile(account.accountId, {
                displayName: account.displayName,
                email: account.email,
                phone: account.phone
            });
            localStorage.setItem('account', JSON.stringify(account));
            notification.success({
                message: 'Success',
                description: 'Account information updated!'
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating account information:', error);
            if (error.message.includes('email already exists')) {
                notification.error({
                    message: 'Error',
                    description: 'The email address is already associated with another account.'
                });
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Failed to update account information.'
                });
            }
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="text-center">
                        <h4 className="text-2xl font-bold text-gray-700">Thông tin tài khoản</h4>
                    </div>
                    <div>
                        <label htmlFor="displayName" className="block text-gray-700 text-sm font-bold mb-2">Họ và tên:</label>
                        <input
                            type="text"
                            name="displayName"
                            id="displayName"
                            value={account.displayName}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Số điện thoại:</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={account.phone}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={account.email}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                        />
                    </div>
                    {isEditing && (
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
                            Lưu
                        </button>
                    )}
                </form>
                <div className="flex justify-between mt-6">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    >
                        Cập nhật thông tin tài khoản
                    </button>
                    <button
                        onClick={() => alert('Change Password Clicked')}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                    >
                        Đổi mật khẩu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountInfo;
