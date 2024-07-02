import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./AssessmentList.css";
import Spinner from "../Spinner/Spinner";

const dummyData = [
    { id: 1, name: "Diamond A", price: 5000 },
    { id: 2, name: "Diamond B", price: 7500 },
    { id: 3, name: "Diamond C", price: 3000 },
];

function AssessmentList() {
    const [assessments, setAssessments] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data
        setAssessments(dummyData);
    }, []);

    const viewDetails = (assessment) => {
        navigate("/details", { state: { assessment } });
    };

    if (loading) {
        return (
          <div className="loading-indicator">
            <Spinner />
          </div>
        );
      }
      
    return (
        <div className="container-assessmentlist">
            <h2>Assessment List</h2>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {assessments.map((assessment) => (
                        <tr key={assessment.id}>
                            <td>{assessment.id}</td>
                            <td>{assessment.name}</td>
                            <td>${assessment.price}</td>
                            <td>
                                <Button type="primary" onClick={() => viewDetails(assessment)}>
                                    View Details
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AssessmentList;
