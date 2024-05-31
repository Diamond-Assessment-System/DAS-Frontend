import Badge from "components/Badge";
import Button from "components/Button";
import React, { useEffect, useState } from "react";
import MatrixDeleteConfirm from "./MatrixDeleteConfirm";
import { useLocation, useNavigate } from "react-router-dom";
import { gradeFormat, subjectFormat } from "utils/FieldFormat";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setSnackbar } from "redux/appSlice";
import { SubjectSectionService } from "services/SubjectSectionService";
import SubjectRow from "./SubjectRow";
import { InputMatrix } from "./InputMatrix";
import { Toggle } from "./Toggle";
import { ExamService } from "services/ExamService";
import { PATH } from "routes/constants";
import { setUser } from "redux/userSlice";
import { fetchProfile } from "redux/meSlice";
import ErrorModal from "./ErrorModal";

const initForm = {
  name: "",
  classId: "",
  grade: 0,
  duration: 0,
  subjectEnum: 0,
  questionSetIdUse: "",
  configArrange: {
    arrangeDifficulty: false,
    shuffleAnswers: false,
    shuffleQuestions: false,
  },
  sections: [],
  numOfDiffPaper: 1,
  numOfPaperCode: 1,
  totalPaperCode: 0,
};

const MatrixPage = () => {
  const location = useLocation();

  // @ts-ignore
  const { token } = useSelector( ( state ) => state.user );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ openDelete, setOpenDelete ] = useState( false );
  const [ openError, setOpenError ] = useState( false );
  const [ subjectSections, setSubjectSections ] = useState( [] );
  const [ rows, setRows ] = useState( [] );
  const [ sum, setSum ] = useState( 0 );
  const [ err, setErr ] = useState( "This is a error message" );

  const [ formSections, setFormSections ] = useState( rows );

  const [ data, setData ] = useState( null );
  const [ formData, setFormData ] = useState( initForm );
  const [ totalPaperCode, setTotalPaperCode ] = useState( 0 );

  const [ valid, setValid ] = useState( false );

  const handleOpenModalDelete = () => {
    setOpenDelete( true );
  };
  const handleCloseModalDelete = () => {
    setOpenDelete( false );
  };
  const handleOpenModalError = () => {
    setOpenError( true );
  };
  const handleCloseModalError = () => {
    setOpenError( false );
  };

  console.log( formSections );
  const updateFormSections = ( index, value ) => {
    // console.log("formSections", formSections);
    let newFormSections = [ ...formSections ];
    // console.log("formSections value", value);
    // if (index != 0 && formSections[0] == undefined) {
    //   newFormSections[0] = [];
    // }
    for ( let i = 0; i < rows.length; i++ ) {
      if ( formSections[ i ] == undefined ) newFormSections[ i ] = [];
    }
    newFormSections[ index ] = value;
    // setFormSections(
    //   newFormSections.map((item) => {
    //     if (item == undefined) return [];
    //     return item;
    //   })
    // );
    setFormSections( newFormSections );
    // console.log(
    //   "newFormSections.filter",
    //   newFormSections.filter((item) => item !== undefined)
    // );
    // console.log("newFormSections", newFormSections);
  };

  const handleAddSubject = ( item ) => {
    const newRows = [ ...rows, item ];
    const setArr = Array.from( new Set( newRows ) );
    setRows( ( prev ) => setArr );
    console.log( "Add a subject", setArr );
  };
  const handleDeleteSubject = ( item ) => {
    const newRowsWithoutItem = rows.filter( ( row ) => row !== item );
    setRows( ( prev ) => newRowsWithoutItem );
  };

  const updateConfig = ( field, value ) => {
    const updateFormData = { ...formData };
<<<<<<< Updated upstream
    updateFormData.configArrange[ field ] = value;
=======
    console.log( field, value )
    updateFormData.configArrange[ field ] = value;
    console.log( "jfkjskdfjlksjdfk", updateFormData )
>>>>>>> Stashed changes
    setFormData( updateFormData );
  };
  const updateForm = ( field, value ) => {
    const updateFormData = { ...formData };
    updateFormData[ field ] = value;
    setFormData( updateFormData );
  };

  const fetchSubjectSections = async ( data ) => {
    try {
      dispatch( setLoading( true ) );
      const params = {
        grade: data.grade,
        subjectEnum: data.subject,
      };
      const res = await SubjectSectionService.getNav( params, token );
      if ( res ) {
        console.log( res );
        setSubjectSections( res );
      }
    } catch ( error ) {
      dispatch( setSnackbar( { color: "red", message: error.message } ) );
    } finally {
      dispatch( setLoading( false ) );
    }
  };

  const fetchSubjectSectionsById = async ( id ) => {
    try {
      dispatch( setLoading( true ) );
      const param = {
        questionSetId: id,
      };
      const res = await SubjectSectionService.getNavBySet( param, token );
      if ( res ) {
        console.log( res );
        setSubjectSections( res );
      }
    } catch ( error ) {
      dispatch( setSnackbar( { color: "red", message: error.message } ) );
    } finally {
      dispatch( setLoading( false ) );
    }
  };

  const handleSave = async () => {
    const reqBody = { ...formData };
    const sections = formSections.reduce( ( acc, item ) => {
      return [ ...acc, ...item ];
    }, [] );
    reqBody.totalPaperCode = formData.numOfDiffPaper * formData.numOfPaperCode;
    reqBody.sections = sections;
    reqBody.subjectEnum = data.subject;
    reqBody.grade = data.grade;
    reqBody.duration = data.time;
    reqBody.name = data.name;
    reqBody.questionSetIdUse = data.questionSetId;
    reqBody.classId = data.classId;
    if ( sum <= 0 ) {
      console.log( "Tổng số câu hỏi phải lớn hơn 0" );
      setErr( "Tổng số câu hỏi phải lớn hơn 0" );
      handleOpenModalError();
      return;
    }
    formSections.map( ( element ) => {
      element.forEach( ( item ) => {
        if ( item.use > item.chcn + item.nhd ) {
          setErr(
            "Số câu hỏi phải bé hơn tổng số lượng câu hỏi có câu ngân hàng đề."
          );
          handleOpenModalError();
          return;
        }
      } );
    } );
    if ( reqBody.totalPaperCode == 0 ) {
      console.log( "Tổng số lượng đề phải lớn hơn 0" );
      setErr( "Tổng số lượng đề phải lớn hơn 0" );
      handleOpenModalError();
      return;
    }
    try {
      dispatch( setLoading( true ) );
      const res = await ExamService.addMatrix( reqBody, token );
      if ( res ) {
        dispatch( setSnackbar( { color: "green", message: res } ) );
        dispatch( fetchProfile( { token: token } ) );
        navigate( PATH.DOWNLOAD, { state: { examId: res } } );
      }
    } catch ( error ) {
      dispatch( setSnackbar( { color: "red", message: error } ) );
    } finally {
      dispatch( setLoading( false ) );
    }
  };

  useEffect( () => {
    if ( location.state ) {
      setData( location.state );
    }
  }, [ location ] );

  useEffect( () => {
    console.log( "DATA", data );
    if ( data && data.questionSetId ) {
      console.log( "nav by id", data.questionSetId );
      fetchSubjectSectionsById( data.questionSetId );
    }
    if ( data && !data.questionSetId ) {
      console.log( "nav", data.questionSetId );
      fetchSubjectSections( data );
    }
  }, [ data ] );
  useEffect( () => {
    const sections = formSections.reduce( ( acc, item ) => {
      return [ ...acc, ...item ];
    }, [] );

    // console.log("SECTI", sections);
    const result = sections.reduce( ( acc, item ) => {
      // return acc + item.chcn + item.nhd;
      return acc + item.use;
    }, 0 );
    setSum( result );
  }, [ formSections ] );
  useEffect( () => {
    if ( sum <= 0 ) {
      setValid( false );
    }
  }, [ sum ] );

  useEffect( () => {
    console.log( "Here are rows: ", formSections );
  }, [ formSections ] );
  return (
    <>
      <div className="w-full h-full overflow-auto hide-scrollbar m-auto flex flex-col gap-2">
        <div className="filter min-h-[10%] flex flex-row text-blue_dark font-bold  rounded-md bg-white shadow-md px-2  gap-6">
          <div className="text-[1rem] inline-flex items-center">
            { gradeFormat( data?.grade || "" ) }
          </div>
          <div className="text-[1rem] inline-flex items-center">
            Môn: { subjectFormat( data?.subject || "" ) }
          </div>
          <div className="text-[1rem] inline-flex items-center">
            Thời gian: { data?.time || "" } phút
          </div>
          <div className="text-[1rem] inline-flex items-center">
            Tên cuộc thi: { data?.name || "" }
          </div>
          <div className="text-[1rem] inline-flex items-center">
            Số lượng đề:{ " " }
            <InputMatrix
              onChange={ ( e ) =>
                updateForm( "numOfDiffPaper", parseInt( e.target.value ) )
              }
              value={ formData.numOfDiffPaper }
            />
          </div>
          <div className="text-[1rem] inline-flex items-center">
            Số lượng mã đề của mỗi đề:{ " " }
            <InputMatrix
              onChange={ ( e ) =>
                updateForm( "numOfPaperCode", parseInt( e.target.value ) )
              }
              value={ formData.numOfPaperCode }
            />
          </div>
          <div className="text-[1rem] inline-flex items-center">
            Tổng số lượng đề:{ " " }
            <InputMatrix
              disabled
              onChange={ undefined }
              value={ formData.numOfPaperCode * formData.numOfDiffPaper }
            />
          </div>
        </div>
        <div className="w-full flex flex-row h-full border-text_form border-[1px]">
          <div className="w-[15%] h-full bg-white border-text_form border-r-2 overflow-auto">
            { subjectSections.map( ( item, index ) => (
              <div
                className="p-2 border-[0.5px] border-text_form cursor-default  hover:text-blue_base text-sm text-blue_dark font-medium"
                key={ index }
                onClick={ () => handleAddSubject( item ) }
              >
                { item.name }
              </div>
            ) ) }
          </div>
          <div className="flex-1 border-text_form p-4 bg-white w-full h-full relative">
            <div className="absolute bottom-0 left-0 p-4 w-full flex flex-row-reverse gap-4">
              <Button
                onClick={ handleOpenModalDelete }
                className="!p-0 !rounded-3xl"
              >
                <Badge color="red">Xóa</Badge>
              </Button>
              <Button
                onClick={ handleSave }
                className="!p-0 !rounded-3xl"
                disabled={ valid }
              >
                <Badge color="green">Lưu ma trận đề</Badge>
              </Button>
            </div>
            <div>
              <table className="w-full  border-black border-collapse border-[1px] ">
                <thead className="text-[#146122] bg-[#c6efce] ">
                  <tr>
                    <th
                      className=" text-[14px] border-black border-collapse border-[1px] font-normal"
                      rowSpan={ 3 }
                    >
                      STT
                    </th>
                    <th
                      className=" text-[14px] border-black border-collapse border-[1px] font-normal max-w-[20%]"
                      rowSpan={ 3 }
                      colSpan={ 2 }
                    >
                      Đơn vị kiến thức
                    </th>
                    <th
                      className=" text-[14px] border-black border-collapse border-[1px] font-normal"
                      colSpan={ 12 }
                    >
                      Mức độ nhận thức
                    </th>
                    <th
                      className=" text-[14px] border-black border-collapse border-[1px] font-normal"
                      colSpan={ 2 }
                    >
                      Tổng
                    </th>
                    <th
                      className=" text-[14px] border-black border-collapse border-[1px] font-normal"
                      rowSpan={ 3 }
                    >
                      Tổng số câu hỏi
                    </th>
                  </tr>
                  <tr>
                    <th
                      className=" text-[14px] border-black border-collapse border-[1px] font-normal"
                      colSpan={ 3 }
                    >
                      Nhận biết
                    </th>
                    <th
                      className=" text-[14px] border-black border-collapse border-[1px] font-normal"
                      colSpan={ 3 }
                    >
                      Thông hiểu
                    </th>
                    <th
                      className=" text-[14px] border-black border-collapse border-[1px] font-normal"
                      colSpan={ 3 }
                    >
                      Vận dụng
                    </th>
                    <th
                      className=" text-[14px] border-black border-collapse border-[1px] font-normal"
                      colSpan={ 3 }
                    >
                      Vận dụng cao
                    </th>
                    <th
                      className=" text-[14px] border-black border-collapse border-[1px] font-normal"
                      colSpan={ 2 }
                    >
                      Số câu hỏi
                    </th>
                  </tr>
                  <tr>
                    <th className=" text-[14px] border-black border-collapse border-[1px] font-normal">
                      Lấy từ CHCN
                    </th>
                    <th className=" text-[14px] border-black border-collapse border-[1px] font-normal">
                      Lấy từ NHĐề
                    </th>
                    <th className=" text-[14px] border-black border-collapse border-[1px] font-normal">
                      Số câu hỏi
                    </th>
                    <th className=" text-[14px] border-black border-collapse border-[1px] font-normal">
                      Lấy từ CHCN
                    </th>
                    <th className=" text-[14px] border-black border-collapse border-[1px] font-normal">
                      Lấy từ NHĐề
                    </th>
                    <th className=" text-[14px] border-black border-collapse border-[1px] font-normal">
                      Số câu hỏi
                    </th>
                    <th className=" text-[14px] border-black border-collapse border-[1px] font-normal">
                      Lấy từ CHCN
                    </th>
                    <th className=" text-[14px] border-black border-collapse border-[1px] font-normal">
                      Lấy từ NHĐề
                    </th>
                    <th className=" text-[14px] border-black border-collapse border-[1px] font-normal">
                      Số câu hỏi
                    </th>
                    <th className=" text-[14px] border-black border-collapse border-[1px] font-normal">
                      Lấy từ CHCN
                    </th>
                    <th className=" text-[14px] border-black border-collapse border-[1px] font-normal">
                      Lấy từ NHĐề
                    </th>
                    <th className=" text-[14px] border-black border-collapse border-[1px] font-normal">
                      Số câu hỏi
                    </th>
                    <th className=" text-[14px] border-black border-collapse border-[1px] font-normal">
                      Lấy từ CHCN
                    </th>
                    <th className=" text-[14px] border-black border-collapse border-[1px] font-normal">
                      Lấy từ NHĐề
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  { rows &&
                    rows.map( ( item, index ) => (
                      <SubjectRow
                        update={ updateFormSections }
                        matrixCase={ data.matrixCase }
                        key={ index }
                        data={ item }
                        index={ index }
                        deleteRow={ handleDeleteSubject }
                      />
                    ) ) }
                  <tr>
                    <td
                      className="bg-[#d9d9d9] text-[14px] border-black border-collapse border-[1px]"
                      colSpan={ 3 }
                    >
                      Tổng
                    </td>
                    <td className="bg-[#d9d9d9] text-[14px] border-black border-collapse border-[1px]"></td>
                    <td className="bg-[#d9d9d9] text-[14px] border-black border-collapse border-[1px]"></td>
                    <td className="bg-[#d9d9d9] text-[14px] border-black border-collapse border-[1px]"></td>
                    <td className="bg-[#d9d9d9] text-[14px] border-black border-collapse border-[1px]"></td>
                    <td className="bg-[#d9d9d9] text-[14px] border-black border-collapse border-[1px]"></td>
                    <td className="bg-[#d9d9d9] text-[14px] border-black border-collapse border-[1px]"></td>
                    <td className="bg-[#d9d9d9] text-[14px] border-black border-collapse border-[1px]"></td>
                    <td className="bg-[#d9d9d9] text-[14px] border-black border-collapse border-[1px]"></td>
                    <td className="bg-[#d9d9d9] text-[14px] border-black border-collapse border-[1px]"></td>
                    <td className="bg-[#d9d9d9] text-[14px] border-black border-collapse border-[1px]"></td>
                    <td className="bg-[#d9d9d9] text-[14px] border-black border-collapse border-[1px]"></td>
                    <td className="bg-[#d9d9d9] text-[14px] border-black border-collapse border-[1px]"></td>
                    <td className="bg-[#d9d9d9] text-[14px] border-black border-collapse border-[1px]"></td>
                    <td className="bg-[#d9d9d9] text-[14px] border-black border-collapse border-[1px]"></td>
                    <td className="bg-[#d9d9d9] text-[14px] border-black border-collapse border-[1px]">
                      { sum }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-text_form flex flex-col mt-4">
              <p className="text-sm">*Lưu ý:</p>
              <p className="text-sm">
                Lấy từ CHCN: câu hỏi cá nhân. Là số câu hỏi mà bạn muốn lấy
                trong bộ câu hỏi cá nhân để đưa vào đề này
              </p>
              <p className="text-sm">
                Lấy từ NHĐề: Là số câu hỏi mà bạn muốn lấy trong ngân hàng đề
                của hệ thống và những câu hỏi đã mua, đã được chia sẻ đưa vào đề
              </p>
              <p className="text-sm">
                Số câu hỏi: Là số câu hỏi sẽ xuất hiện trong 1 đề
              </p>
              <div className="flex flex-col gap-2">
                <Toggle
                  label={ "Trộn vị trí của câu hỏi" }
                  value={ formData.configArrange[ "shuffleQuestions" ] }
                  onChange={ ( e ) =>
<<<<<<< Updated upstream
                    updateConfig( "shuffleQuestions", !!e.target.value )
=======
                    updateConfig( "shuffleQuestions", e.target.checked )
>>>>>>> Stashed changes
                  }
                />
                <Toggle
                  label={ "Trộn vị trí của đáp án " }
                  value={ formData.configArrange[ "shuffleAnswers" ] }
                  onChange={ ( e ) =>
<<<<<<< Updated upstream
                    updateConfig( "shuffleAnswers", !!e.target.value )
=======
                    updateConfig( "shuffleAnswers", e.target.checked )
>>>>>>> Stashed changes
                  }
                />
                <Toggle
                  label={ "Sắp xếp từ dễ đến khó" }
                  value={ formData.configArrange[ "arrangeDifficulty" ] }
                  onChange={ ( e ) =>
<<<<<<< Updated upstream
                    updateConfig( "arrangeDifficulty", !!e.target.value )
=======
                    updateConfig( "arrangeDifficulty", e.target.checked ) // Use 'e.target.checked' to set the new state
>>>>>>> Stashed changes
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MatrixDeleteConfirm open={ openDelete } onClose={ handleCloseModalDelete } />
      <ErrorModal open={ openError } onClose={ handleCloseModalError } err={ err } />
    </>
  );
};

export default MatrixPage;
