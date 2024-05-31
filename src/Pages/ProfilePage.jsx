import Button from "components/Button";
import CustomInput from "components/CustomInput";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { userTypeFormat } from "utils/FieldFormat";
import { userTypeFormatUI } from "utils/UIFormat";
import { useDispatch, useSelector } from "react-redux";
import { VIEW_MODE } from "constant/selectOptions";
import { UserService } from "services/UserService";
import { setSnackbar } from "redux/appSlice";
import BasicSelect from "components/CustomSelect";
import DropDown from "components/DropDown";
import { SchoolService } from "services/SchoolService";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { useRef } from "react";
import { fetchProfile } from "redux/meSlice";

const initData = {
  userId: "",
  fullName: "",
  phone: "",
  email: "",
  userType: "",
};

const ProfilePage = () => {
  const location = useLocation();
  const [ data, setData ] = useState( initData );
  const [ mode, setMode ] = useState( VIEW_MODE.VIEW );
  const [ ddschools, setDdschools ] = useState( [] );
  const [ selectedSchool, setSelectedSchool ] = useState( data.dropdownSchools );

  const dispatch = useDispatch();
  // @ts-ignore
  const { userInfo, token } = useSelector( ( state ) => state.user );

  const updateData = ( field, value ) => {
    const updated = { ...data };
    updated[ field ] = value;
    setData( updated );
  };

  const fetchData = async () => {
    const newInfo = await UserService.getProfile( token );
    // console.log("dropdownSchools", newDropdownSchools);
    setData( newInfo );
    console.log( "Newinfooo: ", newInfo );
  };

  useEffect( () => {
    // console.log("Init Data", initData);
    if ( location.state ) {
      setData( location.state );
    } else {
      fetchData();
    }
    fetchDropdownSchools();
  }, [ location ] );

  const fetchDropdownSchools = async () => {
    const newDropdownSchools = await SchoolService.getDropdownSchools( token );
    console.log( "newdrop", newDropdownSchools );
    setDdschools( newDropdownSchools );
  };

  const handleEdit = async () => {
    console.log( "selectedSchool", selectedSchool );
    const newdropdownSchools = ddschools.filter(
      ( ddschools ) => ddschools.schoolNameIdentity == selectedSchool
    );
    console.log( "newdropdownSchools", newdropdownSchools[ 0 ] );
    setMode( VIEW_MODE.VIEW );
    const reqBody = {
      fullName: data.fullName,
      phone: data.phone,
      schoolId: newdropdownSchools[ 0 ]?.schoolId,
    };
    try {
      const res = await UserService.edit( reqBody, token );
      if ( res ) {
        const newInfo = await UserService.getProfile( token );
        console.log( "NEWNEWINFO", newInfo );
        setData( newInfo );
        dispatch( setSnackbar( { color: "green", message: "Chỉnh sửa thành công" } ) );
        dispatch( fetchProfile( { token } ) );
      }
    } catch ( error ) {
      dispatch( setSnackbar( { color: "red", message: error.message } ) );
    }
  };
  const handleChangeStatus = async () => {
    try {
      const res = await UserService.changeStatus(
        data.userId,
        { isActive: !data.isActive },
        token
      );
      if ( res ) {
        dispatch( setSnackbar( { color: "green", message: res } ) );
      }
    } catch ( error ) {
      dispatch( setSnackbar( { color: "red", message: error.message } ) );
    }
  };

  return (
    <div className="h-full w-full flex flex-row gap-4 relative py-[5%] px-[10%] rounded-lg overflow-auto hide-scrollbar bg-white shadow-card">
      <div className="controllers absolute top-[12px] right-[12px] flex gap-2">
        { mode == VIEW_MODE.VIEW && (
          <Button
            className="bg-red_base text-white font-bold px-4"
            disabled={ location.state }
            onClick={ () => setMode( VIEW_MODE.EDIT ) }
          >
            Chỉnh sửa
          </Button>
        ) }
        { mode == VIEW_MODE.EDIT && (
          <Button
            className="bg-green_base text-white font-bold px-4"
            onClick={ handleEdit }
          >
            Xác nhận
          </Button>
        ) }

        <Button
          disabled={ userInfo.userType !== 0 }
          onClick={ handleChangeStatus }
          className=" ring-2 ring-red_fog text-red_base font-bold px-4 bg-white"
        >
          Vô hiệu hóa tài khoản
        </Button>
      </div>
      <div className=" h-full w-[30%] flex flex-col justify-center items-center gap-6">
        <div className="p-[50px] rounded-xl ring-4 ring-blue_base">
          <img
            className="object-contain"
            src="/images/profileImage.png"
            alt="profile"
          />
        </div>
        <Button className="bg-blue_base text-white font-bold rounded-2xl px-4 shadow-md border-0">
          Đổi ảnh đại diện
        </Button>
      </div>
      <div className=" h-full ml-auto w-[50%] flex flex-col gap-2 justify-center">
        <CustomInput
          className="text-blue_base font-bold"
          name={ "fullName" }
          label={ "Họ và tên" }
          disabled={ mode === VIEW_MODE.VIEW }
          value={ data.fullName || "Chưa cập nhật" }
          labelClass="font-bold text-blue_dark text-[1.2rem]"
          onChange={ ( e ) => updateData( "fullName", e.target.value ) }
        />
        <CustomInput
          className="text-blue_base font-bold"
          name={ "phone" }
          type={ "number" }
          label={ "Số điện thoại" }
          disabled={ mode === VIEW_MODE.VIEW }
          value={ data.phone || "Chưa cập nhật" }
          labelClass="font-bold text-blue_dark text-[1.2rem]"
          onChange={ ( e ) => updateData( "phone", e.target.value ) }
        />
        <CustomInput
          className="text-blue_base font-bold"
          name={ "email" }
          label={ "Email" }
          disabled={ mode === VIEW_MODE.VIEW }
          value={ data.email || "Chưa cập nhật" }
          labelClass="font-bold text-blue_dark text-[1.2rem]"
        />
        <CustomInput
          className="text-blue_base font-bold"
          name={ "userType" }
          label={ "Chức vụ" }
          disabled={ mode === VIEW_MODE.VIEW }
          value={ userTypeFormat( data.userType ) || "Chưa cập nhật" }
          labelClass="font-bold text-blue_dark text-[1.2rem]"
        />
        <CustomInput
          hidden={ !( mode === VIEW_MODE.VIEW ) }
          name={ "schoolNameIdentity" }
          label={ "Trường" }
          disabled={ mode === VIEW_MODE.VIEW }
          value={ data?.dropdownSchools?.schoolNameIdentity || "Chưa cập nhật" }
          labelClass={ `${ !( mode === VIEW_MODE.VIEW ) ? "hidden" : ""
            } font-bold text-blue_dark text-[1.2rem]` }
        />
        <Autocomplete
          disablePortal
          freeSolo
          value={ selectedSchool }
          onChange={ ( event, newValue ) =>
            setSelectedSchool(
              newValue ? newValue : data?.dropdownSchools?.schoolNameIdentity
            )
          }
          options={ ddschools.map( ( option ) => `${ option.schoolNameIdentity }` ) }
          sx={ { width: 532 } }
          renderInput={ ( params ) => (
            <TextField hidden={ true } { ...params } label="Chọn trường" />
          ) }
          className={ `${ mode === VIEW_MODE.VIEW ? "hidden" : "" }` }
          clearOnEscape
        // getOptionLabel={}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
