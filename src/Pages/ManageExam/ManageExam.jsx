import React, { useState, useEffect } from "react";
import DropDown from "components/DropDown";
import { ButtonBlue } from "components/ButtonBlue";
import IconAdd from "asset/icon add.svg";
import { Card } from "components/Card";
import AddTopic from "components/BackDropAddTopic";
import { AlertComponent } from "components/AlertComponent";
import eye from "asset/eye.svg";
import trash from "asset/trash.svg";
import iconAdd from "asset/icon add.svg";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../routes/constants";
import { useSelector } from "react-redux";
import { subjectChoices } from "constant/selectOptions";
import { gradeChoices } from "constant/selectOptions";
import { useDispatch } from "react-redux";
import { gradeFormat } from "utils/FieldFormat";
import { subjectFormat } from "utils/FieldFormat";
import { setLoading, setSnackbar } from "redux/appSlice";
import { fetchManage } from "redux/manageSlice";
import { ManageService } from "services/ManageService";
import TestForm from "Pages/TestPage/TestForm";
import OptionsForm from "./OptionsForm";
import { type } from "@testing-library/user-event/dist/type";
import { SuperMarketService } from "services/SuperMarketService";
import { Modal } from "components/Modal";
import CustomModal from "components/CustomModal";

const data3 = [ { name: "Có phí" }, { name: "Không phí" } ];
const subjects = subjectChoices.map( ( item ) => {
  return {
    name: subjectFormat( item ),
    value: item,
  };
} );
const grades = gradeChoices.map( ( item ) => {
  return {
    name: gradeFormat( item ),
    value: item,
  };
} );

function truncateMessage( message ) {
  const index = message.lastIndexOf( ":" );
  if ( index !== -1 ) {
    let truncatedMessage = message
      .substring( index + 1, message.length - 2 )
      .trim();
    console.log( "Truncated Message", truncatedMessage );
    return truncatedMessage;
  }
  return message;
}

export const ManageExam = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ value, setValue ] = useState();

  const [ openTest, setOpenTest ] = useState( false );
  const [ openOptions, setOpenOptions ] = useState( false );

  const handleOpenTest = () => {
    setOpenTest( true );
  };
  const handleCloseTest = () => {
    setOpenTest( false );
  };
  const handleOpenOptions = () => {
    setOpenOptions( true );
  };
  const handleCloseOptions = () => {
    setOpenOptions( false );
  };
  // @ts-ignore
  const { token } = useSelector( ( state ) => state.user );
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();
  const defaultYearRef = React.useRef( currentYear );
  const data2 = [
    {
      name: `${ currentMonth < 7
        ? `${ defaultYearRef.current - 1 }-${ defaultYearRef.current }`
        : `${ defaultYearRef.current }-${ defaultYearRef.current + 1 }`
        }`,
    },
    {
      name: `${ currentMonth < 7
        ? `${ defaultYearRef.current - 2 }-${ defaultYearRef.current - 1 }`
        : `${ defaultYearRef.current - 1 }-${ defaultYearRef.current }`
        }`,
    },
    {
      name: `${ currentMonth < 7
        ? `${ defaultYearRef.current - 3 }-${ defaultYearRef.current - 2 }`
        : `${ defaultYearRef.current - 2 }-${ defaultYearRef.current - 1 }`
        }`,
    },
  ];
  const [ params, setParams ] = useState( {
    studyYear: `${ currentMonth < 7
      ? `${ defaultYearRef.current - 1 }-${ defaultYearRef.current }`
      : `${ defaultYearRef.current }-${ defaultYearRef.current + 1 }`
      }`,
    subject: "",
    grade: "",
  } );

  // @ts-ignore
  const { entities, error, loading } = useSelector( ( state ) => state.manage );
  const [ state, setState ] = useState( false );
  const [ testFormData, setTestFormData ] = useState( {} );
  const [ sellData, setSellData ] = useState( {} );
  const [ stateSell, setStateSell ] = useState( false );
  const [ stateShare, setStateShare ] = useState( false );
  const [ stateContribute, setStateContribute ] = useState( false );
  const [ email, setEmail ] = useState( "" );
  const HandleFalse = () => {
    setState( false );
  };

<<<<<<< Updated upstream
=======
  console.log( entities )

>>>>>>> Stashed changes
  const [ stateDelete, setStateDelete ] = useState( false );
  const HandleTrueDelete = () => {
    setStateDelete( true );
  };
  const HandleFalseDelete = () => {
    setStateDelete( false );
  };
  const dataButton = ( value ) => [
    {
      name: "Xem Bộ câu hỏi",
      url: eye,
      event: () => {
        navigate( PATH.MANAGEEXAM + `${ "/" + value.questionSetId }`, {
          state: { name: value.name, questionSetId: value.questionSetId },
        } );
      },
    },
    {
      name: "Tạo đề mới",
      url: iconAdd,
      event: () => {
        handleOpenOptions();
        setValue( value );
      },
    },
    {
      name: "Đăng ký bán",
      url: iconAdd,
      event: () => {
        console.log( "value", value );
        setStateSell( true );
        setSellData( {
          questionSetId: value.questionSetId,
          type: 0,
        } );
      },
    },
    {
      name: "Chia sẻ cho người khác",
      url: iconAdd,
      event: () => {
        console.log( "value", value );
        setStateShare( true );
        setValue( value );
      },
    },
    {
      name: "Đóng góp bộ câu hỏi",
      url: iconAdd,
      event: () => {
        console.log( "value", value );
        setStateContribute( true );
        setValue( value );
      },
    },
    {
      name: "Xoá Bộ câu hỏi",
      url: trash,
      event: () => {
        HandleTrueDelete();
        setValue( value );
      },
    },
  ];

  const formatDataButton = dataButton( value ).filter(
    ( item ) => item.name !== "Xoá Bộ câu hỏi"
  );

  const handleAddExam = async ( data ) => {
    console.log( "ManaE: ", data );
    try {
      const dataResponse = await ManageService.create( data, token );

      // @ts-ignore
      dispatch( fetchManage( { token } ) );
      dispatch( setSnackbar( { color: "green", message: "Thêm thành công" } ) );

      navigate( PATH.MANAGEEXAM + `${ "/" + "temp" }`, {
        state: { dataResponse: { ...dataResponse, Subject: data.Subject } },
      } );
    } catch ( error ) {
      dispatch( setSnackbar( { color: "red", message: "Thêm bộ câu hỏi thất bại" } ) );
    }
  };

  const handleDeleteExam = async ( questionSetId ) => {
    try {
      await ManageService.delete( questionSetId, token );

      // @ts-ignore
      dispatch( fetchManage( { token } ) );
      dispatch( setSnackbar( { color: "green", message: "Xóa thành công" } ) );
    } catch ( error ) {
      dispatch( setSnackbar( { color: "red", message: error.message } ) );
    }
    HandleFalseDelete();
  };
  const handleSellQuestionSet = async ( questionSetId, token ) => {
    try {
      const create = await SuperMarketService.createRequest(
        {
          questionSetId: questionSetId,
          type: 0,
        },
        token
      );
      console.log( "create", create );
      dispatch(
        setSnackbar( { color: "green", message: "Đăng ký bán thành công" } )
      );
    } catch ( error ) {
<<<<<<< Updated upstream
      console.log( truncateMessage( error ) );
      dispatch( setSnackbar( { color: "red", message: truncateMessage( error ) } ) );
=======
      dispatch( setSnackbar( { color: "red", message: error.message } ) );
>>>>>>> Stashed changes
    }
  };
  const handleContribute = async ( questionSetId, token ) => {
    try {
      const share = await SuperMarketService.createRequest(
        {
          questionSetId: questionSetId,
          type: 2,
        },
        token
      );
      console.log( "create", share );
      dispatch( setSnackbar( { color: "green", message: "Đóng góp thành công" } ) );
    } catch ( error ) {
      dispatch( setSnackbar( { color: "red", message: error.message } ) );
    }
  };
  const handleShare = async ( questionSetId, token ) => {
    try {
      const share = await SuperMarketService.share(
        {
          questionSetId: questionSetId,
          email: email,
        },
        token
      );
      console.log( "create", share );
      dispatch(
        setSnackbar( {
          color: "green",
          message: `Chia sẻ thành công cho ${ share }`,
        } )
      );
    } catch ( error ) {
      dispatch( setSnackbar( { color: "red", message: error.message } ) );
    }
  };

  useEffect( () => {
    dispatch( setLoading( loading ) );
  }, [ loading ] );
  const handleFind = ( field, value ) => {
    setParams( {
      ...params,
      [ field ]: value,
    } );
  };

  useEffect( () => {
    // @ts-ignore
    // @ts-ignore
    dispatch( fetchManage( { token, params } ) );
    console.log( "params", params );
  }, [] );

  return (
    <>
      { state == true && (
        <AddTopic HandleFalse={ HandleFalse } HandleAdd={ handleAddExam } />
      ) }
      { stateShare && (
        <CustomModal
          header="Chia sẻ cho người khác"
          open={ stateShare }
          onClose={ () => {
            setStateShare( false );
          } }
        >
          <div className="flex flex-col gap-5 items-center w-full h-full">
            <input
              className=" p-0 px-3 font-inter appearance-none block w-full h-10  text-text_form border-green_form_reason font-light border-green_state border_[1px] rounded-[30px] bg-white"
              id="grid-name"
              type="text"
              onChange={ ( e ) => {
                setEmail( e.target.value );
              } }
              placeholder="Nhập email người nhận"
              required
            />
            <ButtonBlue
              className="mt-1 rounded-[20px] h-fit w-fit py-1 px-5 border-[2px] bg-blue_base text-white font-bold font-inter"
              onClick={ () => {
                handleShare( value.questionSetId, token );
                setStateShare( false );
              } }
            >
              Chia sẻ
            </ButtonBlue>
          </div>
        </CustomModal>
      ) }
      { stateContribute && (
        <AlertComponent
          HandleFalse={ () => {
            setStateContribute( false );
          } }
          HandleEvent={ () => {
            handleContribute( value.questionSetId, token );
            setStateContribute( false );
          } }
          title="Bạn có muốn đóng góp?"
          messages="Bạn có chắc rằng mình muốn đóng góp bộ câu hỏi này"
        ></AlertComponent>
      ) }
      { stateDelete && (
        <AlertComponent
          HandleFalse={ HandleFalseDelete }
          HandleEvent={ () => {
            handleDeleteExam( value.questionSetId );
          } }
          title="Bạn có chắc muốn xoá?"
          messages="Bạn có chắc rằng mình muốn xoá toàn bộ câu hỏi này"
        ></AlertComponent>
      ) }
      { stateSell && (
        <AlertComponent
          HandleFalse={ () => {
            setStateSell( false );
          } }
          HandleEvent={ () => {
            handleSellQuestionSet( sellData.questionSetId, token );
            setStateSell( false );
          } }
          title="Bạn có muốn đăng ký bán?"
          messages={
            <div>
              <p>Bạn có chắc rằng mình muốn đăng ký bán bộ câu hỏi này</p>
              <div>
                <p className="text-red-500 ">
                  Lưu ý giá của bộ câu hỏi được tính theo công thức sau:
                </p>
                <ul>
                  <li>Câu hỏi mức độ nhận biết: 0.4 Xu / câu</li>
                  <li>Câu hỏi mức độ thông hiểu: 1 Xu / câu</li>
                  <li>Câu hỏi mức độ vận dụng: 2 Xu / câu</li>
                  <li>Câu hỏi mức độ vận dụng cao: 6 Xu / câu</li>
                </ul>
              </div>
            </div>
          }
        ></AlertComponent>
      ) }
      <div className="flex flex-col h-full w-full items-center overflow-hidden">
        <div className="relative flex flex-row items-center w-full h-[10%] p-2 pl-0 gap-7">
          <DropDown
            data={ grades }
            name="Khối"
            onSelected={ ( value ) => handleFind( "grade", value.value ) }
          ></DropDown>
          <DropDown
            data={ subjects }
            name="Môn học"
            onSelected={ ( value ) => handleFind( "subject", value.value ) }
          ></DropDown>
          <DropDown
            data={ data2 }
            ref={ defaultYearRef }
            name={
              currentMonth < 7
                ? `${ defaultYearRef.current - 1 }-${ defaultYearRef.current }`
                : `${ defaultYearRef.current }-${ defaultYearRef.current + 1 }`
            }
            onSelected={ ( value ) => handleFind( "studyYear", value.name ) }
          ></DropDown>

          <ButtonBlue
            className="mt-1 rounded-[20px] h-fit w-fit py-1 px-5 border-[2px] bg-blue_base text-white font-bold font-inter"
            onClick={ () => {
              dispatch( fetchManage( { token, params } ) );
            } }
          >
            Tìm kiếm
          </ButtonBlue>
          <button
            className="right-[25%] absolute h-fit w-fit px-4 py-1 pl-7 bg-white text-blue_dark rounded-[25px] shadow-2xl font-semibold font-baloo2"
            onClick={ handleOpenTest }
          >
            <div className="absolute top-1/2 -translate-y-1/2 pr-2 left-2 ">
              <img className="h-4 w-4 " src={ IconAdd } />
            </div>
            Tạo cuộc thi từ ngân hàng đề
          </button>
          <button
            className="right-[9%] absolute h-fit w-fit px-4 py-1 pl-7 bg-white text-blue_dark rounded-[25px] shadow-2xl font-semibold font-baloo2"
            onClick={ () => {
              setState( true );
            } }
          >
            <div className="absolute top-1/2 -translate-y-1/2 pr-2 left-2 ">
              <img className="h-4 w-4 " src={ IconAdd } />
            </div>
            Tạo bộ câu hỏi mới
          </button>
        </div>
        <div className="h-[100%] w-full grid grid-cols-3 gap-x-12 gap-y-[43px] overflow-y-auto no-scrollbar px-4">
          { entities.map( ( value, index ) => (
<<<<<<< Updated upstream
            <React.Fragment key={ index }>
=======
            <React.Fragment key={ index } >
>>>>>>> Stashed changes
              <Card
                name={ value.name }
                dataButton={ dataButton( value ) }
                questionSetId={ value.questionSetId }
                type={ value.type }
<<<<<<< Updated upstream
=======
                shareBy={ value.nameOfOwner }
>>>>>>> Stashed changes
              />
            </React.Fragment>
          ) ) }
        </div>
        <TestForm
          onClose={ handleCloseTest }
          open={ openTest }
          data={ testFormData }
        />
        <OptionsForm
          onClose={ handleCloseOptions }
          open={ openOptions }
          data={ value }
          setTestFormData={ setTestFormData }
          openTestForm={ handleOpenTest }
        />
<<<<<<< Updated upstream
      </div>
=======
      </div >
>>>>>>> Stashed changes
    </>
  );
};
