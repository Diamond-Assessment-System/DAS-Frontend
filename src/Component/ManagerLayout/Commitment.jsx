import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCommitmentPapers } from "../../utils/commitmentPaperUtils";
import Spinner from "../Spinner/Spinner";

const CommitmentPaperListPage = () => {
    const navigate = useNavigate();
    const [commitmentPapers, setCommitmentPapers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const papers = await getAllCommitmentPapers();
                setCommitmentPapers(papers);
            } catch (error) {
                console.error('Error fetching commitment papers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const viewCommitmentPaper = (id) => {
        navigate(`/manager/commitment-paper/${id}`);
    };

    if (loading) {
        return (
            <div className="loading-indicator">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="max-w-full mx-auto p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Danh Sách Biên Nhận</h4>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="py-4 px-4 text-center align-middle">Mã Đơn Hàng</th>
                                <th className="py-4 px-4 text-center align-middle">Tên Khách Hàng</th>
                                <th className="py-4 px-4 text-center align-middle">Ngày Tạo</th>
                                <th className="py-4 px-4 text-center align-middle">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {commitmentPapers.map((paper) => (
                                <tr key={paper.bookingId}>
                                    <td className="py-4 px-4 text-center align-middle">{paper.bookingId}</td>
                                    <td className="py-4 px-4 text-center align-middle">{paper.accountName}</td>
                                    <td className="py-4 px-4 text-center align-middle">{new Date(paper.creationDate).toLocaleDateString()}</td>
                                    <td className="py-4 px-4 text-center align-middle">
                                        <button
                                            onClick={() => viewCommitmentPaper(paper.bookingId)}
                                            className="btn-small bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Xem Biên Nhận
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CommitmentPaperListPage;
