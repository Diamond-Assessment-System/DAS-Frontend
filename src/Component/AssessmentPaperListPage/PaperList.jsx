import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import './AssessmentList.css';
import Spinner from "../Spinner/Spinner";

const AssessmentList = () => {
    const [assessments, setAssessments] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                const response = await axios.get('https://das-backend.fly.dev/api/assessment-papers');
                setAssessments(response.data);
            } catch (error) {
                console.error('Error fetching assessment papers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssessments();
    }, []);

    const viewDetail = (id) => {
        navigate(`/assessment-detail/${id}`);
    };
    
    if (loading) {
        return (
          <div className="loading-indicator">
            <Spinner />
          </div>
        );
      }
    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Assessment Papers</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Service</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {assessments.map(assessment => (
                        <tr key={assessment.id}>
                            <td>{assessment.id}</td>
                            <td>{assessment.name}</td>
                            <td>{assessment.service}</td>
                            <td>
                                <Button variant="primary" onClick={() => viewDetail(assessment.id)}>
                                    View Detail
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AssessmentList;
