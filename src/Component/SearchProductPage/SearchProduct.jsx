import React, { useState } from 'react';
import axios from 'axios';
import { getAssessmentPaperUrl } from "../../utils/apiEndPoints";

const ProductSearch = () => {
    const [diamondCode, setDiamondCode] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!diamondCode) {
            setError('Bạn cần nhập mã giám định');
            return;
        }

        try {
            const response = await axios.get(getAssessmentPaperUrl(diamondCode));
            const data = response.data;

            if (data) {
                setImageData(data.paperImage);
                setSearchResult(`Kết quả tìm kiếm cho mã giám định: ${diamondCode}`);
            } else {
                setSearchResult(`Không tìm thấy sản phẩm với mã giám định: ${diamondCode}`);
                setImageData(null);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setSearchResult('Đã xảy ra lỗi khi tìm kiếm sản phẩm.');
            setImageData(null);
        }
    };

    return (
        <div className="container mb-24" style={{ marginTop: '10rem' }}>
            <h1 className="text-center text-4xl font-bold text-blue-900 mb-12">Tra cứu thông tin sản phẩm</h1>
            <p className="text-center text-gray-600 mb-12">
                Đây là dịch vụ tra cứu của DASL nhằm mục đích mang đến cho quý khách hàng sự tiện lợi, nhanh chóng và chính xác về những thông tin của sản phẩm trên bảng giám định đúng với những thông tin lưu trong cơ sở dữ liệu của DASL.
            </p>
            <div className="bg-yellow-100 p-8 rounded-lg shadow-md mb-12">
                <form onSubmit={handleSubmit}>
                    <h5 className="text-lg font-bold text-yellow-700 mb-4">Kim Cương</h5>
                    <div className="flex items-center mb-4">
                        <input
                            type="text"
                            value={diamondCode}
                            onChange={(e) => setDiamondCode(e.target.value)}
                            placeholder="Nhập mã giám định"
                            className="flex-grow p-2 border rounded-md"
                        />
                        <button type="submit" className="ml-4 px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700">
                            Truy Xuất
                        </button>
                    </div>
                    {error && <div className="text-red-500 mt-2">{error}</div>}
                </form>
                <p className="mt-4 text-sm text-gray-500">
                    LƯU Ý QUAN TRỌNG: Bảng tham khảo này chỉ nhằm mục đích giúp xác nhận số kiểm định (Number) do người sử dụng dịch vụ này cung cấp tương ứng với số kiểm định được lưu trữ tại nguồn dữ liệu của DASL. Bảng tham khảo này không phải là giấy bảo hành, đánh giá hay định giá viên kim cương đính kèm và cũng không được xem như là một bảng giám định gốc của DASL.
                </p>
            </div>
            {searchResult && (
                <div className="text-center mt-4">
                    <p className="text-lg font-semibold text-blue-900">{searchResult}</p>
                </div>
            )}
            {imageData && (
                <div className="mt-4">
                    <img src={imageData} alt="Product" className="max-w-full mx-auto" />
                </div>
            )}
        </div>
    );
};

export default ProductSearch;
