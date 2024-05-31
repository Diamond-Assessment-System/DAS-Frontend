import CustomModal from "components/CustomModal";
import { requiredError } from "constant";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "components/FormInput";
import Button from "components/Button";
import BasicSelect from "components/CustomSelect";
import { userTypeFormat } from "utils/FieldFormat";
import { userTypeChoices } from "constant/selectOptions";
import { UserService } from "services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbar } from "redux/appSlice";
import { fetchUsers } from "redux/usersSlice";

const UserUpdateForm = ({ onClose, open, data }) => {
  // @ts-ignore
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const item = { ...data };
  const schema = yup.object().shape({
    userType: yup.number().required(requiredError),
  });

  const method = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { handleSubmit, setValue, reset } = method;

  const onSubmit = async (data) => {
    const res = await UserService.editRole(item.userId, data, token);
    if (res) {
      // @ts-ignore
      dispatch(fetchUsers({ token }));
    }
    try {
      dispatch(setSnackbar({ color: "green", message: "Chỉnh sửa thành công" }));
    } catch (error) {
      dispatch(setSnackbar({ color: "red", message: error.message }));
    } finally {
      onClose();
      reset(undefined);
    }
  };

  useEffect(() => {
    if (data) {
      setValue("userType", data.userType);
    }
  }, [data]);

  return (
    <CustomModal header="Cập nhật User" open={open} onClose={onClose}>
      <FormProvider {...method}>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <FormInput label={"Tên"} name={"fullName"} value={data?.fullName} />
          <BasicSelect
            choices={userTypeChoices}
            format={(value) => userTypeFormat(value)}
            label={"Chức vụ"}
            name={"userType"}
          />

          <div className="w-full flex flex-row-reverse mt-2">
            <Button
              className="hover:ring-blue_base	 !font-baloo2 !font-bold"
              type="submit"
            >
              Cập nhật
            </Button>
          </div>
        </form>
      </FormProvider>
    </CustomModal>
  );
};

export default UserUpdateForm;
