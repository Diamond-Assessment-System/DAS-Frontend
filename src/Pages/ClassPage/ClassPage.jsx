// @ts-ignore
import Button from "components/Button";
import CustomTable from "components/CustomTable";
import React, { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "routes/constants";
import { useState } from "react";
import Badge from "components/Badge";
import IconAdd from "asset/icon add.svg";
// @ts-ignore
import DropDown from "components/DropDown";
// @ts-ignore
import { ButtonBlue } from "components/ButtonBlue";
import CustomInput from "components/CustomInput";
import ClassForm from "./ClassForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoading, setSnackbar } from "redux/appSlice";
import { fetchClasses } from "redux/classSlice";
import { ClassService } from "services/ClassService";
import { fetchExams } from "redux/examSlice";
import DeleteClassConfirm from "./DeleteClassConfirm";

const ClassPage = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { token } = useSelector((state) => state.user);

  // @ts-ignore
  const { entities, error, loading } = useSelector((state) => state.class);
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();
  const defaultYearRef = React.useRef(currentYear);
  const studyYears = [
    {
      id: 1,
      name: `${
        currentMonth < 7
          ? `${defaultYearRef.current - 1}-${defaultYearRef.current}`
          : `${defaultYearRef.current}-${defaultYearRef.current + 1}`
      }`,
    },
    {
      id: 2,
      name: `${
        currentMonth < 7
          ? `${defaultYearRef.current - 2}-${defaultYearRef.current - 1}`
          : `${defaultYearRef.current - 1}-${defaultYearRef.current}`
      }`,
    },
    {
      id: 3,
      name: `${
        currentMonth < 7
          ? `${defaultYearRef.current - 3}-${defaultYearRef.current - 2}`
          : `${defaultYearRef.current - 2}-${defaultYearRef.current - 1}`
      }`,
    },
  ];
  const [studyYear, setStudyYear] = useState(studyYears[0]);
  const [className, setClassName] = useState("");
  const classValueRef = useRef(null);
  const [selectedClass, setSelectedClass] = useState();

  const handleDeleteClass = async (item) => {
    setSelectedClass(item);
    handleOpenDeleteConfirmModal();
  };

  const columns = useMemo(
    () => [
      {
        name: "Tên lớp học",
        field: "name",
        formatValue: (value) => (
          <span className=" font-bold text-blue_dark">{value}</span>
        ),
        width: "40%",
      },
      {
        name: "Số học sinh",
        field: "totalStudent",
        formatValue: (value) => <Badge color="green">{value}</Badge>,
        width: "25%",
      },
      {
        name: "Khối",
        field: "grade",
        formatValue: (value) => <Badge color="yellow">{value}</Badge>,
        width: "25%",
      },

      {
        name: "Xóa",
        onclick: handleDeleteClass,
        type: "button",
        formatValue: (value) => (
          <img className="h-[30px] w-[30px]" src="/images/delete.png" />
        ),
        className: " !font-bold text-blue_base !ring-0",
      },
    ],
    []
  );

  const [open, setOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const navigate = useNavigate();
  // @ts-ignore
  const handleRowClick = (item) => {
    navigate(PATH.CLASSES + `/${item.classId}`, { state: item });
  };

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleOpenDeleteConfirmModal = () => {
    setDeleteConfirm(true);
  };
  const handleCloseDeleteConfirmModal = () => {
    setDeleteConfirm(false);
  };
  const handleFilter = () => {
    // @ts-ignore
    if (document.getElementById("classNameValue").value) {
      // @ts-ignore
      setClassName(document.getElementById("classNameValue").value);
    }
    dispatch(
      // @ts-ignore
      fetchClasses({
        token,
        params: { className: className, studyYear: studyYear.name },
      })
    );
    // @ts-ignore
    console.log(document.getElementById("classNameValue").value);
  };

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading]);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchClasses({ token, params: { studyYear: studyYear.name } }));
  }, []);

  return (
    <>
      <div className="w-full h-full overflow-hidden m-auto flex flex-col gap-4 justify-center">
        <div className="relative ml-[5%] flex flex-row items-center w-full h-[10%] p-2 gap-7">
          <div className="w-1/3">
            <CustomInput
              label={null}
              name={"class"}
              placeholder="Nhập tên lớp mà bạn muốn tìm kiếm"
              id="classNameValue"
              ref={classValueRef}
            />
          </div>
          <DropDown
            data={studyYears}
            onSelected={(value) => {
              setStudyYear(value);
            }}
          />
          <ButtonBlue onClick={handleFilter} className="blueButton">
            Tìm kiếm
          </ButtonBlue>
          <button
            className="right-[9%] absolute h-fit w-fit px-4 py-1 pl-7 bg-white text-blue_dark rounded-[25px] shadow-2xl font-semibold font-baloo2"
            onClick={handleOpenModal}
          >
            <div className="absolute top-1/2 -translate-y-1/2 pr-2 left-2 ">
              <img className="h-4 w-4 " src={IconAdd} />
            </div>
            Thêm Lớp
          </button>
        </div>

        <div className="flex-1 overflow-auto hide-scrollbar">
          <CustomTable
            tableName={"class"}
            columns={columns}
            data={entities}
            onClickRow={handleRowClick}
          />
        </div>
      </div>
      <ClassForm onClose={handleCloseModal} open={open} studyYear={studyYear} />
      <DeleteClassConfirm
        onClose={handleCloseDeleteConfirmModal}
        open={deleteConfirm}
        studyYear={studyYear}
        selectedClass={selectedClass}
      />
    </>
  );
};

export default ClassPage;
