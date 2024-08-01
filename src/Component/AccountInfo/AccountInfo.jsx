import React, { useState, useEffect } from 'react';
import backgroundImage from './../../assets/backgroundcus.png';
import { updateProfile } from '../../utils/updateAccount';
import { notification } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AccountInfo = () => {
    const [account, setAccount] = useState({
        accountId: '',
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

    const formik = useFormik({
        initialValues: {
            displayName: account.displayName,
            email: account.email,
            phone: account.phone,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            displayName: Yup.string()
                .required('Vui lòng nhập họ và tên.'),
            email: Yup.string()
                .email('Email không hợp lệ.')
                .required('Vui lòng nhập email.'),
            phone: Yup.string()
                .matches(/^[0-9]{10}$/, 'Số điện thoại phải là 10 chữ số.')
                .required('Vui lòng nhập số điện thoại.')
        }),
        onSubmit: async (values) => {
            try {
                await updateProfile(account.accountId, values);
                localStorage.setItem('account', JSON.stringify({ ...account, ...values }));
                notification.success({
                    message: 'Thành công',
                    description: 'Thông tin tài khoản đã được cập nhật!'
                });
                setIsEditing(false);
            } catch (error) {
                console.error('Error updating account information:', error);
                if (error.message.includes('email already exists')) {
                    notification.error({
                        message: 'Lỗi',
                        description: 'Địa chỉ email này đã được sử dụng bởi tài khoản khác.'
                    });
                } else {
                    notification.error({
                        message: 'Lỗi',
                        description: 'Cập nhật thông tin tài khoản thất bại.'
                    });
                }
            }
        },
    });

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${backgroundImage})`, marginTop: "6rem" }}>
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div className="text-center">
                        <h4 className="text-2xl font-bold text-gray-700">Thông tin tài khoản</h4>
                    </div>
                    <div>
                        <label htmlFor="displayName" className="block text-gray-700 text-sm font-bold mb-2">Họ và tên:</label>
                        <input
                            type="text"
                            name="displayName"
                            id="displayName"
                            value={formik.values.displayName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            readOnly={!isEditing}
                            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${isEditing ? 'bg-white' : 'bg-gray-100'} ${formik.touched.displayName && formik.errors.displayName ? 'border-red-500' : ''}`}
                        />
                        {formik.touched.displayName && formik.errors.displayName ? (
                            <p className="text-red-500 text-xs italic">{formik.errors.displayName}</p>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Số điện thoại:</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            readOnly={!isEditing}
                            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${isEditing ? 'bg-white' : 'bg-gray-100'} ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''}`}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <p className="text-red-500 text-xs italic">{formik.errors.phone}</p>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            readOnly={!isEditing}
                            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${isEditing ? 'bg-white' : 'bg-gray-100'} ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
                        ) : null}
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
                        onClick={() => alert('Đổi mật khẩu')}
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
