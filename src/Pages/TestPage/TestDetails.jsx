import Badge from "components/Badge";
import Button from "components/Button";
import CustomTable from "components/CustomTable";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setLoading, setSnackbar, updateBreadCrumb } from "redux/appSlice";
import { fetchExamDetail } from "redux/examDetailSlice";
import { dateFormat } from "utils/dataFormat";
import { statusColorFormat, examStatusFormat } from "utils/FieldFormat";
import { examMarkStatusFormat } from "utils/FieldFormat";
import { PATH } from "routes/constants";
import { ExamService } from "services/ExamService";
import { fetchProfile } from "redux/meSlice";

const handleMarkColor = ( mark ) => {
  if ( mark < 5 ) return "red";
  else if ( mark >= 5 && mark < 8 ) return "yellow";
  else return "green";
};

const columns = [
  {
    name: "Tên học sinh",
    field: "name",
    formatValue: ( value ) => (
      <span className=" font-bold text-blue_dark">{ value }</span>
    ),
    width: "30%",
  },
  {
    name: "Trạng thái",
    field: "status",
    formatValue: ( value ) => (
      <Badge color={ statusColorFormat( value ) }>
        { examMarkStatusFormat( value ) }
      </Badge>
    ),
    width: "30%",
  },
  {
    name: "Mã đề",
    field: "paperCode",
    formatValue: ( value ) => <Badge color={ value ? "green" : "" }>{ value }</Badge>,
    width: "13%",
  },
  {
    name: "Điểm",
    field: "mark",
    formatValue: ( value ) => (
      <Badge color={ handleMarkColor( value ) }>
        { value || value == 0 ? value : "Chưa chấm" }
      </Badge>
    ),
    width: "30%",
  },
];

const TestDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // @ts-ignore
  const { token } = useSelector( ( state ) => state.user );

  // @ts-ignore
  const { entities, error, loading } = useSelector( ( state ) => state.examDetail );

  const fetchData = ( id, token ) => {
    // @ts-ignore
    dispatch( fetchExamDetail( { id, token } ) );
  };

  useEffect( () => {
    let root = "/" + location.pathname.split( "/" )[ 1 ];
    const examId = location.pathname.split( "/" )[ 2 ];
    fetchData( examId, token );
  }, [ location ] );

  useEffect( () => {
    dispatch( setLoading( loading ) );
  }, [ loading ] );

  const handleExportResult = async () => {
    const examId = entities.examId;
    try {
      dispatch( setLoading( true ) );
      const res = await ExamService.exportResult( examId, token );
      if ( res ) {
        fetchData( examId, token );
      }
      dispatch( fetchProfile( { token: token } ) );
    } catch ( error ) {
      dispatch(
        setSnackbar( {
          color: "red",
<<<<<<< Updated upstream
          message: "Export Result failed for" + examId,
=======
          message: error.message
>>>>>>> Stashed changes
        } )
      );
    } finally {
      dispatch( setLoading( false ) );
    }
  };
  const handleDownloadResult = async () => {
    const examId = entities.examId;
    try {
      dispatch( setLoading( true ) );
      const res = await ExamService.downloadResult( examId, token );
      if ( res ) {
        // Extract the filename from the content-disposition header

        dispatch(
          setSnackbar( {
            color: "green",
            message: "Download Result Success for " + examId,
          } )
        );
        fetchData( examId, token );
      }
    } catch ( error ) {
      dispatch(
        setSnackbar( {
          color: "red",
          message: "Export Result failed for" + examId,
        } )
      );
    } finally {
      dispatch( setLoading( false ) );
    }
  };

  const handleDownload = () => {
    console.log( "dssdsd", entities.examId );
    navigate( PATH.DOWNLOAD, { state: { examId: entities.examId } } );
  };

  return (
    <div className="w-full h-full overflow-hidden m-auto flex flex-row gap-4 ">
      {/* Info Exam */ }
      <div className=" min-w-[50%] flex flex-col gap-8 overflow-auto hide-scrollbar px-16 py-8 ">
        <div className="px-8 py-4 bg-white rounded-lg shadow-lg w-full h-full">
          <div className=" rounded-lg w-full h-[30%] p-4 ">
            <div className="flex flex-row gap-4 items-center h-full w-full">
              <img
                className="rounded-lg shadow-sm h-full object-contain"
                src="/images/exam.jpg"
                alt="exam"
              />
              <div className="h-full flex justify-center items-center font-bold text-[1.6rem] text-green_base">
                { entities.name || "" }
              </div>
            </div>
          </div>
          <div className="text-text_form flex flex-col flex-1 ">
            <div className="px-4 py-2 border-y-2 border-text_form border-dashed">
              Lớp: { entities.className || "" }
            </div>
            <div className="px-4 py-2 border-y-2 border-text_form border-dashed">
              Môn: { entities.subjectName || "" }
            </div>
            <div className="px-4 py-2 border-y-2 border-text_form border-dashed">
              Mã cuộc thi: { entities.testCode || "" }
            </div>
            <div className="px-4 py-2 border-y-2 border-text_form border-dashed">
              Đã nộp bài: { entities.submitted || "" }
            </div>
            <div className="px-4 py-2 border-y-2 border-text_form border-dashed">
              Trạng thái: { examStatusFormat( entities.status ) || "" }
            </div>
            <div className="px-4 py-2 border-y-2 border-text_form border-dashed">
              Cập nhật lần cuối: { dateFormat( entities.modifiedOn ) || "" }
            </div>

            <div className="px-4 py-2 w-full justify-between flex flex-row-reverse">
              <Button
                className={ `bg-red_base text-white font-bold !rounded-3xl px-4 ${ entities?.status == 1 ? "hidden" : ""
                  }` }
                onClick={ handleExportResult }
              >
                Xuất kết quả cuộc thi
              </Button>
              <Button
                className={ `bg-red_base text-white font-bold !rounded-3xl px-4 ${ entities?.status == 0 ? "hidden" : ""
                  }` }
                onClick={ handleDownloadResult }
              >
                Tải kết quả cuộc thi
              </Button>
              <Button
                className={ `bg-green_base text-white font-bold !rounded-3xl px-4 justify-center` }
                onClick={ handleDownload }
              >
                Tải các file đề
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Score List */ }
      <div className="flex-1 overflow-auto hide-scrollbar">
        <CustomTable columns={ columns } data={ entities.students } />
      </div>
    </div>
  );
};

export default TestDetails;
