import CustomModal from "components/CustomModal";
import { requiredError } from "constant";
import React from "react";
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

const ClassForm = ({ onClose, open, studyYear }) => {
  console.log(studyYear);
  // @ts-ignore
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    grade: yup.number().required(requiredError),
    name: yup.string().required(requiredError),
  });
  const method = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { handleSubmit, setValue, reset } = method;
  const onSubmit = async (data) => {
    try {
      const res = await ClassService.create(data, token);
      if (res) {
        // @ts-ignore
        dispatch(
          // @ts-ignore
          fetchClasses({ token, params: { studyYear: studyYear.name } })
        );
      }
      dispatch(setSnackbar({ color: "green", message: "Tạo thành công" }));
    } catch (error) {
      dispatch(setSnackbar({ color: "red", message: error.message }));
    } finally {
      onClose();
      reset(undefined);
    }
  };
  return (
    <CustomModal header="Thêm lớp học mới" open={open} onClose={onClose}>
      <FormProvider {...method}>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <FormInput label={"Tên lớp"} name={"name"} />
          <BasicSelect
            label={"Chọn khối"}
            name={"grade"}
            choices={gradeChoices}
            format={(value) => gradeFormat(value)}
          />

          <div className="w-full flex flex-row-reverse mt-2">
            <Button
              className="hover:ring-blue_base	 !font-baloo2 !font-bold"
              type="submit"
            >
              THÊM LỚP
            </Button>
          </div>
        </form>
      </FormProvider>
    </CustomModal>
  );
};

export default ClassForm;
