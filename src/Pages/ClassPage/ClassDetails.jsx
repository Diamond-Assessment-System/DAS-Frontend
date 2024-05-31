import React, { useEffect, useRef, useState } from "react";
import { PATH } from "routes/constants";
import { useNavigate } from "react-router-dom";
import StudentList from "./StudentList";
import TestList from "./TestList";
import CustomInput from "components/CustomInput";
import IconAdd from "asset/icon add.svg";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, updateBreadCrumb } from "redux/appSlice";
import { fetchClassDetail } from "redux/classDetailSlice";
import StudentForm from "./StudentForm";
import TestForm from "Pages/TestPage/TestForm";
import { data } from "autoprefixer";

const ClassDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // @ts-ignore
  const { token } = useSelector((state) => state.user);

  // @ts-ignore
  const { entities, error, loading } = useSelector(
    (state) => state.classDetail
  );

  const [openStudent, setOpenStudent] = useState(false);

  const [openTest, setOpenTest] = useState(false);

  const handleOpenStudent = () => {
    setOpenStudent(true);
  };
  const handleCloseStudent = () => {
    setOpenStudent(false);
  };

  const handleOpenTest = () => {
    setOpenTest(true);
  };
  const handleCloseTest = () => {
    setOpenTest(false);
  };

  const handleRowClick = (item) => {
    navigate(PATH.PROFILE, { state: item });
  };

  const fetchData = (id, token) => {
    // @ts-ignore
    dispatch(fetchClassDetail({ id, token }));
  };
  useEffect(() => {
    console.log("Location state", location.state);
    if (location.state) {
      let root = "/" + location.pathname.split("/")[1];
      fetchData(location.state.classId, token);
      dispatch(updateBreadCrumb([root, location.state.name]));
    }
  }, [location]);

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading]);
  console.log(entities.examViews);

  const [viewList, setViewList] = useState(true);
  const studentListRef = useRef();
  const examListRef = useRef();
  useEffect(() => {
    console.log("Student Ref", studentListRef.current);
    console.log("Exam Ref", examListRef.current);
    if (viewList == true) {
      // @ts-ignore
      studentListRef.current.classList.remove("hidden");
      // @ts-ignore
      examListRef.current.classList.add("hidden");
    } else {
      // @ts-ignore
      studentListRef.current.classList.add("hidden");
      // @ts-ignore
      examListRef.current.classList.remove("hidden");
    }
  }, [viewList]);
  const handleViewStudentList = () => {
    setViewList(true);
  };
  const handleViewExamList = () => {
    setViewList(false);
  };
  return (
    <div className="w-full h-full overflow-hidden m-auto flex flex-col gap-4 ">
      <div className="relative  flex flex-row justify-between items-center w-full h-[10%] px-4 gap-7  ">
        <div className="w-1/3">
          <CustomInput
            label={null}
            name={"email"}
            placeholder={
              viewList
                ? "Nhập tên học sinh mà bạn muốn tìm kiếm..."
                : "Nhập tên cuộc thi mà bạn muốn tìm kiếm..."
            }
          />
        </div>

        <div className="flex gap-4">
          <button
            className="relative px-8 py-1 bg-white text-blue_dark rounded-[25px] shadow-2xl font-semibold font-baloo2"
            onClick={handleOpenStudent}
          >
            <div className="absolute top-1/2 -translate-y-1/2 pr-2 left-2 ">
              <img className="h-4 w-4 " src={IconAdd} />
            </div>
            Thêm học sinh mới
          </button>

          <button
            className="right-[20%] absolute h-fit w-fit px-4 py-1 pl-7 bg-white text-blue_dark rounded-[25px] shadow-2xl font-semibold font-baloo2"
            onClick={handleOpenTest}
          >
            <div className="absolute top-1/2 -translate-y-1/2 pr-2 left-2 ">
              <img className="h-4 w-4 " src={IconAdd} />
            </div>
            Thêm cuộc thi mới
          </button>
        </div>
      </div>
      <div className="flex gap-5">
        <button
          className=" h-fit w-fit px-4 py-1 pl-4 bg-white text-blue_dark rounded-[25px] shadow-2xl font-semibold font-baloo2"
          // @ts-ignore
          onClick={handleViewStudentList}
        >
          Xem danh sách học sinh
        </button>
        <button
          className=" h-fit w-fit px-4 py-1 pl-4 bg-white text-blue_dark rounded-[25px] shadow-2xl font-semibold font-baloo2"
          onClick={handleViewExamList}
        >
          Xem danh sách cuộc thi
        </button>
      </div>
      <div className="w-full h-full overflow-hidden m-auto flex flex-row gap-4 ">
        <div
          className={`w-full h-full overflow-hidden m-auto flex flex-row gap-4 `}
          ref={examListRef}
        >
          <TestList
            data={entities.examViews || []}
            classId={location.state.classId}
          />
        </div>
        <div
          className={`w-full h-full overflow-hidden m-auto flex flex-row gap-4 `}
          ref={studentListRef}
        >
          <StudentList
            data={entities.students || []}
            classId={location.state.classId}
          />
        </div>
      </div>
      <StudentForm
        open={openStudent}
        onClose={handleCloseStudent}
        classId={location.state.classId}
      />
      <TestForm
        onClose={handleCloseTest}
        open={openTest}
        data={location.state}
      ></TestForm>
    </div>
  );
};

export default ClassDetails;
