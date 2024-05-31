import CustomModal from "components/CustomModal";
import { requiredError } from "constant";
import React, { useEffect, useState } from "react";
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
import { genderFormat } from "utils/dataFormat";
import UpLoad from "../../asset/UpLoad.svg";

const StudentForm = ( { onClose, open, classId } ) => {
  // @ts-ignore
  const [ fileLabel, setFileLabel ] = useState( "Chọn tập tin để tải lên" );
  const { token } = useSelector( ( state ) => state.user );
  const dispatch = useDispatch();

  const schema = yup.object().shape( {
    fullName: yup.string(),
    gender: yup.number(),
    doB: yup.string(),
    parentPhoneNumber: yup.string(),
    file: yup.mixed(),
  } );
  const method = useForm( {
    mode: "onSubmit",
    resolver: yupResolver( schema ),
  } );

  const formatDate = ( dateString ) => {
    return;
  };

  function formatToISOString( dateString ) {
    const [ day, month, year ] = dateString.split( "/" );
    // @ts-ignore
    const date = new Date(
      `${ year }-${ month.padStart( 2, "0" ) }-${ day.padStart( 2, "0" ) }`
    );
    return date.toISOString();
  }

  const handleFileChange = ( e ) => {
    const file = e.target.files[ 0 ];
    // Update the file label with the selected file name
    setFileLabel( file ? file.name : "Chọn tập tin để tải lên" );
  };

  useEffect( () => {
    if ( method.watch( "file" )?.length > 0 ) {
      const file = method.watch( "file" )[ 0 ];
      setFileLabel( file.name );
    }
  }, [ method.watch( "file" ) ] );

  const { handleSubmit, setValue, reset, register } = method;
  const onSubmit = async ( data ) => {
    const { file, fullName, gender, doB, parentPhoneNumber } = data;
    try {
      let res;
      if ( file && file.length > 0 ) {
        res = await ClassService.importStudent(
          classId,
          { file: file[ 0 ] },
          token
        );
        console.log( res );
      } else {
        const formattedDOB = formatToISOString( doB );
        console.log( "formattedDOB", formattedDOB );
        console.log( "DOB", doB.split( "/" ) );
        res = await ClassService.addStudent(
          classId,
          { fullName, gender, dob: formattedDOB, parentPhoneNumber },
          token
        );
      }

      if ( res ) {
        // @ts-ignore
        dispatch( fetchClassDetail( { id: classId, token } ) );
<<<<<<< Updated upstream
      }
      if ( res.length > 0 ) {
        dispatch( setSnackbar( { color: "green", message: "Tạo thành công" } ) );
      } else {
        dispatch(
          setSnackbar( { color: "red", message: "Thêm học sinh thất bại" } )
        );
=======
        dispatch( setSnackbar( { color: "green", message: "Tạo thành công" } ) );

>>>>>>> Stashed changes
      }
    } catch ( error ) {
      console.log( "Error", error );
      dispatch(
        setSnackbar( { color: "red", message: "Thêm học sinh thất bại" } )
      );
    } finally {
      onClose();
      reset( { fullName: "", doB: "", parentPhoneNumber: "", file: null } );
    }
  };
  return (
    <CustomModal header="Thêm học sinh mới" open={ open } onClose={ onClose }>
      <FormProvider { ...method }>
        <form className="flex flex-col gap-2" onSubmit={ handleSubmit( onSubmit ) }>
          <FormInput
            label={ "Tên học sinh" }
            name={ "fullName" }
            placeholder="Nhập tên học sinh..."
          />
          {/* <FormInput label={"Giới tính"} name={"fullName"} />
           */}
          <BasicSelect
            label="Giới tính"
            name="gender"
            choices={ [ 0, 1 ] }
            format={ ( value ) => genderFormat( value ) }
          />
          <FormInput
            label={ "Ngày sinh" }
            name={ "doB" }
            placeholder="Nhập theo DD/MM/YYYY"
          />
          <FormInput
            label={ "SĐT phụ huynh" }
            name={ "parentPhoneNumber" }
            placeholder="Nhập SĐT phụ huynh..."
          />
          {/* <input type="file" multiple={ false } { ...register( "file" ) } /> */ }
          <div className="flex flex-row w-full gap-8">
            <label className=" font-baloo2 text-base font-bold">
              Tải lên danh sách học sinh
            </label>
            <div className="ml-4 w-fit flex flex-col items-center">
              <input
                type="file"
                className="hidden"
                id="file-input"
                multiple={ false }
                { ...register( "file" ) }
              />
              <label
                htmlFor="file-input"
                className="flex flex-row text-text_form items-center font-inter font-thin gap-4 cursor-pointer w-full"
              >
                <img src={ UpLoad } className="w-7 h-7" alt="Upload Icon" />
                { fileLabel }
              </label>
              <div className="border-[0.5px] border-text_form w-full"></div>
            </div>
          </div>
          <div className="w-full flex flex-row-reverse mt-2">
            <Button
              className="hover:ring-blue_base	 !font-baloo2 !font-bold"
              type="submit"
            >
              THÊM HỌC SINH
            </Button>
            <div className="text-sm text-black">
              Lưu ý thầy cô upfile theo mẫu tại{ " " }
              <a
                className="text-sm text-blue_base underline"
                target="_blank"
                rel="noopener noreferrer"
                href="https://1drv.ms/x/s!AuuJFuZ8cBf7hoUeWGkdg3F4YcjEoQ?e=qwtfhn"
              >
                đây
              </a>
            </div>
          </div>
        </form>
      </FormProvider>
    </CustomModal>
  );
};

export default StudentForm;
