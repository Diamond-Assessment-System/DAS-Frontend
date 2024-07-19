import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import './AccountInfo.css'; // Ensure you have the CSS file for styling

const AccountInfo = () => {
    const [account, setAccount] = useState({
        displayName: '',
        email: '',
        phone: '',
        avatar: 'https://via.placeholder.com/150'
    });
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const storedAccount = JSON.parse(localStorage.getItem('account'));
        if (storedAccount) {
            setAccount(storedAccount);
            setPhone(storedAccount.phone);
        }
    }, []);

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAccount({ ...account, avatar: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedAccount = { ...account, phone };
        setAccount(updatedAccount);
        localStorage.setItem('account', JSON.stringify(updatedAccount));
        alert('Account information updated!');
    };

    return (
        <div className="account-info" style={{ marginTop: '18rem' }}>
            <Card className="account-card shadow-sm">
                <Card.Body className="d-flex flex-column align-items-center">
                    <div className="account-avatar mb-4">
                        <input
                            type="file"
                            id="avatarUpload"
                            style={{ display: 'none' }}
                            onChange={handleAvatarChange}
                        />
                        <img
                            src={account.avatar}
                            alt="Avatar"
                            className="rounded-circle"
                            onClick={() => document.getElementById('avatarUpload').click()}
                            style={{ width: '150px', height: '150px', cursor: 'pointer' }}
                        />
                    </div>
                    <div className="account-details w-100">
                        <Form onSubmit={handleUpdate}>
                            <Form.Group className="form-group" controlId="formDisplayName">
                                <Form.Label>Họ và tên:</Form.Label>
                                <Form.Control type="text" readOnly value={account.displayName} />
                            </Form.Group>
                            <Form.Group className="form-group" controlId="formPhone">
                                <Form.Label>Số điện thoại:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                />
                            </Form.Group>
                            <Form.Group className="form-group" controlId="formEmail">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="text" readOnly value={account.email} />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3 w-100">
                                Update
                            </Button>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
            </div>
    );
};

export default AccountInfo;
