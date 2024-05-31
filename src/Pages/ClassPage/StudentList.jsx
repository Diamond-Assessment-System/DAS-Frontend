import Badge from "components/Badge";
import CustomTable from "components/CustomTable";
import React, { useMemo } from "react";
import { useState } from "react";
import DeleteStudentConfirm from "./DeleteStudentConfirm";
import StudentFormEdit from "./StudentFormEdit";
import { dateFormat, genderFormat } from "utils/dataFormat";

const StudentList = ({ data, classId }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleOpenStudent = () => {
    setOpenDelete(true);
  };
  const handleCloseStudent = () => {
    setOpenDelete(false);
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const columns = useMemo(
    () => [
      {
        name: "Tên học sinh",
        field: "fullName",
        formatValue: (value) => (
          <span className=" font-bold text-blue_dark">{value}</span>
        ),
        width: "40%",
      },
      {
        name: "Giới tính",
        field: "gender",
        formatValue: (value) => (
          <span className=" font-bold text-blue_dark">
            {genderFormat(value)}
          </span>
        ),
        width: "40%",
      },
      {
        name: "Ngày sinh",
        field: "doB",
        formatValue: (value) => (
          <span className=" font-bold text-blue_dark">
            {value ? dateFormat(value) : ""}
          </span>
        ),
        width: "40%",
      },
      {
        name: "SDT phụ huynh",
        field: "parentPhoneNumber",
        formatValue: (value) => (
          <span className=" font-bold text-blue_dark">{value}</span>
        ),
        width: "40%",
      },
      {
        name: "Mã học sinh",
        field: "studentNo",
        formatValue: (value) => <Badge color="green">{value}</Badge>,
        width: "40%",
      },
      {
        name: "Sửa",
        onclick: (item) => {
          setOpenEdit(true);
          setSelectedStudent(item);
          // console.log("Student", item);
        },
        type: "button",
        formatValue: (value) => (
          <img className="h-[30px] w-[30px]" src="/images/edit.png" />
        ),
        className: " !font-bold text-blue_base !ring-0",
        width: "10%",
      },
      {
        name: "Xóa",
        onclick: (item) => {
          setOpenDelete(true);
          setSelectedStudent(item);
        },
        type: "button",
        formatValue: (value) => (
          <img className="h-[30px] w-[30px]" src="/images/delete.png" />
        ),
        className: " !font-bold text-blue_base !ring-0",
        width: "10%",
      },
    ],
    []
  );
  return (
    <>
      <div className="flex-1 overflow-auto hide-scrollbar">
        <CustomTable columns={columns} data={data} />
      </div>
      <DeleteStudentConfirm
        classId={classId}
        open={openDelete}
        onClose={handleCloseStudent}
        student={selectedStudent}
      />
      <StudentFormEdit
        classId={classId}
        open={openEdit}
        onClose={handleCloseEdit}
        student={selectedStudent}
      />
    </>
  );
};

export default StudentList;
