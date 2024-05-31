import CustomModal from "components/CustomModal";
import { requiredError } from "constant";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "components/FormInput";
import Button from "components/Button";
import BasicSelect from "components/CustomSelect";
import { gradeChoices } from "constant/selectOptions";
import { gradeFormat } from "utils/FieldFormat";
import { useDispatch, useSelector } from "react-redux";
import { ClassService } from "services/ClassService";
import { fetchClasses } from "redux/classSlice";
import { setSnackbar } from "redux/appSlice";
import { fetchClassDetail } from "redux/classDetailSlice";
import { StudentService } from "services/StudentService";

const StudentFormEdit = ({ student, onClose, open, classId }) => {
  // @ts-ignore
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    fullName: yup.string().required(requiredError),
  });
  const method = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { handleSubmit, setValue, reset } = method;
  const onSubmit = async (data) => {
    try {
      const { studentId, gender, doB, parentPhoneNumber } = student;
      const reqBody = {
        ...data,
        studentId: studentId,
        gender: gender,
        doB: doB,
        parentPhoneNumber: parentPhoneNumber,
      };
      const res = await StudentService.edit(reqBody, token);
      if (res) {
        // @ts-ignore
        dispatch(fetchClassDetail({ id: classId, token }));
      }
      dispatch(
        setSnackbar({ color: "green", message: "Chỉnh sửa thành công" })
      );
    } catch (error) {
      dispatch(setSnackbar({ color: "red", message: error.message }));
    } finally {
      onClose();
      reset(undefined);
    }
  };
  useEffect(() => {
    if (student) {
      setValue("fullName", student.fullName);
    }
  }, [student]);

  return (
    <CustomModal
      header="Chỉnh sửa thông tin học sinh"
      open={open}
      onClose={onClose}
    >
      <FormProvider {...method}>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <FormInput label={"Tên học sinh"} name={"fullName"} />

          <div className="w-full flex flex-row-reverse mt-2">
            <Button
              className="hover:ring-blue_base	 !font-baloo2 !font-bold"
              type="submit"
            >
              CHỈNH SỬA
            </Button>
          </div>
        </form>
      </FormProvider>
    </CustomModal>
  );
};

export default StudentFormEdit;
