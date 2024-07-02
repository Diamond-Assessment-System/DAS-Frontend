import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './AccountInfo.css'; // Assuming you have a CSS file for styling

const AccountInfo = () => {
    // Dummy account data
    const account = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: '123 Main St, Springfield, IL',
    };

    return (
        <Container className="account-info-container">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card className="account-card">
                        <Card.Header className="account-card-header">Account Information</Card.Header>
                        <Card.Body>
                            <Card.Title className="account-card-title">{account.name}</Card.Title>
                            <Card.Text>
                                <strong>Email:</strong> {account.email}
                                <br />
                                <strong>Phone:</strong> {account.phone}
                                <br />
                                <strong>Address:</strong> {account.address}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AccountInfo;
