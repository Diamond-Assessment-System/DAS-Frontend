import React from "react";
import defaultImg1 from "../asset/defaultImg1.png";

import ProfileImg from "../asset/ProfileImg.svg";

import { MenuButtonMore } from "./MenuButtonMore";
<<<<<<< Updated upstream
import { statusFormat } from "utils/dataFormat";
import { useLocation } from "react-router-dom";
=======
import { questionsSetFormat, statusFormat } from "utils/dataFormat";
import { useLocation } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
>>>>>>> Stashed changes

const price = ( props ) => {
  return (
    <div className="flex flex-row justify-between">
      <div>{ props?.seller }</div>
      <div className="">{ props?.price } Xu</div>
    </div>
  );
};

export const Card = ( props ) => {
  const location = useLocation();
  console.log( location );
<<<<<<< Updated upstream
  console.log( props.status );
  //remove some button when props.type === 0
  let dataButton = props?.dataButton;
  if ( props.type === 0 ) {
=======
  console.log( props.type )
  //remove some button when props.type === 0
  let dataButton = props?.dataButton;
  if ( props.type !== 1 ) {
>>>>>>> Stashed changes
    const buttonsToRemove = [
      "Xoá Bộ câu hỏi",
      "Đăng ký bán",
      "Chia sẻ cho người khác",
      "Đóng góp bộ câu hỏi",
    ];
    dataButton = dataButton.filter(
      ( button ) => !buttonsToRemove.includes( button.name )
    );
  }
<<<<<<< Updated upstream
=======
  const handleQuestionsFormat = ( type ) => {
    return questionsSetFormat( type );
  }
>>>>>>> Stashed changes
  return (
    <div className="shadow-xl h-fit w-fit px-2 py-3 bg-white rounded-[10px] flex flex-col">
      <div className="w-full flex flex-row items-center justify-between">
        <span className="block truncate font-baloo2 font-medium w-[70%]">
          { `${ props?.name }`.length > 30
            ? `${ props?.name }`.slice( 30 ) + "..."
            : props?.name }
        </span>
        {/* <EllipsisVerticalIcon className="w-5 h-5"></EllipsisVerticalIcon> */ }
        <MenuButtonMore dataButton={ dataButton } />
      </div>

      <img
        className="rounded-[10px] object-contain "
        src={ props?.Image }
        alt=""
      />
      <div className="mt-2">
        { props?.seller ? price( props ) : <> </> }

        { props?.status ? (
          <>
          </>
        ) : (
          <div className="flex flex-row justify-between">
            <div className="text-red-500">
              { statusFormat( props?.status ) }
            </div>
          </div>
        ) }

        { props.sellPrice && props.status !== 0 && <div className="">Giá bán: { props.sellPrice } Xu</div> }


<<<<<<< Updated upstream
        { props?.type && location.pathname !== "/supermarketexamAll" ? (
          <></>
        ) : (
          <div className="text-gray-500 text-sm flex justify-end">
            { props?.type === 0 ? "Đã mua" : "" }
          </div>
        ) }

      </div>
    </div>
=======
        { location.pathname !== "/supermarketexamAll" && props.type !== undefined ? (
          <>
            <div className="text-gray-500 text-sm flex justify-end">
              { handleQuestionsFormat( props.type.toString() ) } { " " }
              { props.shareBy ? ( `${ props.shareBy }` ) : ( <></> ) }
            </div>
          </>
        ) : (
          <>
          </>
        ) }

      </div>
    </div >
>>>>>>> Stashed changes
  );
};

Card.defaultProps = {
  title: "Bộ 10 câu hỏi hoá học hay nhất",
  Image: defaultImg1,
  ImageProfile: ProfileImg,
  Name: "Nguyễn Văn An",
  HandleTrueDelete: function () { },
};
