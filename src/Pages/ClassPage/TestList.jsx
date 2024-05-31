import React from "react";
import { examStatusFormat } from "utils/FieldFormat";
import { useNavigate } from "react-router-dom";
import { PATH } from "routes/constants";
import { dateFormat } from "utils/dataFormat";

const TestList = ({ data, classId }) => {
  const navigate = useNavigate();

  const handleRowClick = (item) => {
    navigate(PATH.TEST + `/${item.examId}`);
  };
  console.log("test lít", data);

  return (
    <div className="filter min-w-[50%] flex flex-col gap-4 h-full overflow-auto hide-scrollbar p-2 m-auto">
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <div
            onClick={() => handleRowClick(item)}
            key={index}
            className="m-auto w-[80%] p-4 bg-white hover:shadow-xl rounded-lg flex flex-row gap-4"
          >
            <div className="w-[40%] p-4 border-r-2 border-slate-300 ">
              <img
                className="w-full object-contain"
                src="/images/exam.jpg"
                alt="exam"
              />
            </div>
            <div className="flex-1 text-[#707070]">
              <p>
                <span className="font-baloo2 font-bold text-[#00C886]">
                  {item.name}
                </span>
              </p>
              <div className="flex flex-col gap-y-4">
                <p>
                  <span>Mã cuộc thi: {item.testCode}</span>
                </p>
                <p>
                  <span>Lớp: {item.className}</span>
                </p>
                <p>
                  <span>Môn: {item.subjectName}</span>
                </p>
                <p>
                  <span>Đã nộp bài: {item.submitted}</span>
                </p>
                <p>
                  <span>Trạng thái: {examStatusFormat(item.status)}</span>
                </p>
                <p>
                  <span>Ngày tạo: {dateFormat(item.createdOn)}</span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center font-bold text-blue_dark">
          Chưa có cuộc thi nào
        </div>
      )}
    </div>
  );
};

export default TestList;
