import Button from "components/Button";
import CustomModal from "components/CustomModal";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbar } from "redux/appSlice";
import { fetchClasses } from "redux/classSlice";
import { ClassService } from "services/ClassService";

const DeleteClassConfirm = ({ selectedClass, studyYear, onClose, open }) => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { token } = useSelector((state) => state.user);
  const handleDelete = async () => {
    try {
      await ClassService.delete(selectedClass.classId, token);
      // @ts-ignore
      dispatch(fetchClasses({ token, params: { studyYear: studyYear.name } }));
      dispatch(setSnackbar({ color: "green", message: "Xóa thành công" }));
      onClose();
    } catch (error) {
      dispatch(setSnackbar({ color: "red", message: error.message }));
    }
  };
  return (
    <CustomModal
      header="Bạn có chắc muốn xóa Lớp này ?"
      open={open}
      onClose={onClose}
    >
      <p>Bạn có chắc chắn rằng mình muốn xóa lớp này ?</p>
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

export default DeleteClassConfirm;
