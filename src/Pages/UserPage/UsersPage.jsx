import CustomTable from "components/CustomTable";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "routes/constants";
import DropDown from "components/DropDown";
import { ButtonBlue } from "components/ButtonBlue";
import CustomInput from "components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "redux/appSlice";
import { fetchUsers } from "redux/usersSlice";
import { userTypeFormatUI } from "utils/UIFormat";
import UserUpdateForm from "./UserUpdateForm";
import { userTypeChoices } from "constant/selectOptions";
import { userTypeFormat } from "utils/FieldFormat";

const userTypes = userTypeChoices.map((item) => {
  return {
    id: item,
    name: userTypeFormat(item),
  };
});

const status = [
  { id: 1, name: "Hoạt Động" },
  { id: 0, name: "Ngưng hoạt động" },
];

const UsersPage = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState({
    status: {},
    userType: {},
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // @ts-ignore
  const { token } = useSelector((state) => state.user);

  // @ts-ignore
  const { entities, error, loading } = useSelector((state) => state.users);

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        name: "Họ và tên",
        field: "fullName",
        formatValue: (value) => (
          <span className=" font-bold text-blue_dark">{value}</span>
        ),
        width: "40%",
      },
      {
        name: "Chức vụ",
        field: "userType",
        formatValue: (value) => userTypeFormatUI(value),
        width: "40%",
      },
      {
        name: "Cập nhật",
        onclick: (item) => {
          setSelectedItem(item);
          handleOpenModal();
        },
        type: "button",
        className:
          " !font-bold text-blue_base hover:ring-2 hover:ring-blue_base !p-4",
        width: "20%",
      },
    ],
    []
  );

  const handleFilter = () => {
    setData((prev) => {
      const filterData = entities.filter((item) => {
        if (filter.status && filter.userType) {
          return (
            item.status === filter.status.id &&
            item.userType === filter.userType.id
          );
        } else return false;
      });

      return filterData;
    });
  };
  const updateFilter = (field, value) => {
    const updateFilter = { ...filter };
    updateFilter[field] = value;
    setFilter(updateFilter);
  };

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading]);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchUsers({ token }));
    setData(entities);
  }, []);

  const handleRowClick = (item) => {
    navigate(PATH.PROFILE, { state: item });
  };
  return (
    <div className="w-full h-full overflow-hidden m-auto flex flex-col gap-4 ">
      <div className="relative ml-[5%] flex flex-row items-center w-full h-[10%] p-2 gap-7  ">
        <DropDown
          data={userTypes}
          onSelected={(value) => updateFilter("userType", value)}
        />
        <DropDown
          data={status}
          onSelected={(value) => updateFilter("status", value)}
        />
        <ButtonBlue onClick={handleFilter} className="blueButton">
          Lọc
        </ButtonBlue>
        <div className="w-1/3 absolute right-24 ">
          <CustomInput
            label={null}
            name={"email"}
            onChange={(e) => updateFilter("email", e.target.value)}
            placeholder="Nhập email người dùng bạn muốn tìm kiếm"
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto hide-scrollbar">
        <CustomTable
          columns={columns}
          data={data}
          onClickRow={handleRowClick}
        />
      </div>
      <UserUpdateForm
        onClose={handleCloseModal}
        open={open}
        data={selectedItem}
      ></UserUpdateForm>
    </div>
  );
};

export default UsersPage;
