import React, { useState, useEffect } from 'react';
import { PencilSquare } from 'react-bootstrap-icons';
import backgroundImage from './../../assets/backgroundcus.png'; // Ensure the path to your background image is correct

const AccountInfo = () => {
    const [account, setAccount] = useState({
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

    const handleUpdate = (e) => {
        e.preventDefault();
        localStorage.setItem('account', JSON.stringify(account));
        alert('Account information updated!');
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${backgroundImage})` , marginTop:'5rem'}}>
            <div className="w-full max-w-3xl bg-white bg-opacity-90 p-10 rounded-lg shadow-lg">
                <form onSubmit={handleUpdate}>
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-2xl font-bold">Account Information</h4>
                        {!isEditing && (
                            <PencilSquare
                                className="text-blue-500 cursor-pointer"
                                size={24}
                                onClick={() => setIsEditing(true)}
                            />
                        )}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">Họ và tên:</label>
                        <input
                            type="text"
                            name="displayName"
                            id="displayName"
                            value={account.displayName}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className={`mt-1 block w-full h-14 text-lg ${isEditing ? 'bg-white' : 'bg-gray-200'} border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại:</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={account.phone}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className={`mt-1 block w-full h-14 text-lg ${isEditing ? 'bg-white' : 'bg-gray-200'} border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={account.email}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className={`mt-1 block w-full h-14 text-lg ${isEditing ? 'bg-white' : 'bg-gray-200'} border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                        />
                    </div>
                    {isEditing && (
                        <button type="submit" className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Save
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AccountInfo;
