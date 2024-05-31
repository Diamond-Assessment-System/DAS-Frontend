import Button from "components/Button";
import CustomModal from "components/CustomModal";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbar } from "redux/appSlice";
import { fetchClassDetail } from "redux/classDetailSlice";
import { ClassService } from "services/ClassService";

const DeleteStudentConfirm = ({ classId, student, onClose, open }) => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { token } = useSelector((state) => state.user);
  const handleDelete = async () => {
    const { studentId } = student;
    try {
      await ClassService.deleteStudent(studentId, token);
      dispatch(setSnackbar({ color: "green", message: "Xóa thành công" }));
      // @ts-ignore
      dispatch(fetchClassDetail({ id: classId, token }));
    } catch (error) {
      dispatch(setSnackbar({ color: "red", message: error.message }));
    } finally {
      onClose();
    }
  };
  return (
    <CustomModal
      header="Bạn có chắc muốn xóa học sinh này ?"
      open={open}
      onClose={onClose}
    >
      <p>
        Bạn có chắc chắn rằng mình muốn xóa học sinh{" "}
        {student?.fullName || "này"} khỏi lớp của mình ?
      </p>
      <div className="w-full flex flex-row-reverse">
        <Button
          className="!ring-0 font-medium uppercase text-blue_base"
          onClick={handleDelete}
        >
          Xóa
        </Button>
      </div>
    </CustomModal>
  );
};

export default DeleteStudentConfirm;
