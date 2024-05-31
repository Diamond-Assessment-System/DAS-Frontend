import React from "react";
import { useLocation } from "react-router-dom";
import Button from "./Button";
import { Sidebar } from "flowbite-react";
import { PATH } from "routes/constants";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { drawerFormat } from "utils/dataFormat";
import { useSelector } from "react-redux";

const menus = [
  {
    path: PATH.HOME,
    icon: "/images/home-icon.png",
    userTypes: [ 0, 1, 2 ],
  },
  {
    path: PATH.USERS,
    icon: "/images/team.png",
    userTypes: [ 0 ],
  },
  {
    path: PATH.SUBJECTS,
    icon: "/images/book.png",
    userTypes: [ 0 ],
  },
  {
    path: PATH.SCHOOLS,
    icon: "/images/school.png",
    userTypes: [ 0 ],
  },
  {
    path: PATH.CLASSES,
    icon: "/images/team.png",
    userTypes: [ 1 ],
  },
  {
    path: PATH.TEST_SAMPLE,
    icon: "/images/Exam.png",
    userTypes: [ 0 ],
  },
  {
    path: PATH.ANSWER_SAMPLE,
    icon: "/images/Exam.png",
    userTypes: [ 0 ],
  },
  {
    path: PATH.EXAMBANK,
    icon: "/images/bank.png",
    userTypes: [ 2 ],
  },
  {
    path: PATH.REQUIREAPPROVE,
    icon: "/images/note.png",
    userTypes: [ 2 ],
  },
  {
    path: PATH.MANAGEEXAM,
    icon: "/images/folder.png",
    userTypes: [ 1 ],
  },

  {
    path: PATH.TEST,
    icon: "/images/Exam.png",
    userTypes: [ 1 ],
  },

  {
    path: PATH.PAYMENT,
    icon: "/images/xu-icon.svg",
    userTypes: [ 1 ],
  },

  {
    path: PATH.TRANSACTION,
    icon: "/images/transaction-history.png",
    userTypes: [ 1 ],
  },
  ///Luôn để Profile ở cuối
  {
    path: PATH.PROFILE,
    icon: "/images/personal icon.png",
    userTypes: [ 0, 1, 2 ],
  },
];
const menus2 = [
  {
    path: PATH.SUPERMARKETEXAMALL,
    icon: "/images/All.png",
    userTypes: [ 0, 1, 2, 3 ],
  },
  {
    path: PATH.LISTBOUGHT,
    icon: "/images/ListBought.png",
    userTypes: [ 1, 3 ],
  },
  {
    path: PATH.LISTPAY,
    icon: "/images/ListSell.png",
    userTypes: [ 1, 3 ],
  },
];

const CustomDrawer = () => {
  const location = useLocation();

  // @ts-ignore
  const { userType } = useSelector( ( state ) => state.user?.userInfo );
  const [ selectedItem, setSelectedItem ] = useState( PATH.HOME );
  useEffect( () => {
    const path = "/" + location.pathname.split( "/" )[ 1 ];
    setSelectedItem( path );
  }, [ location ] );
  return (
    <>
      <Sidebar className=" px-0 py-0 shadow-sm rounded-sm relative h-full flex flex-col w-[12vw] bg-white">
<<<<<<< Updated upstream
        <Sidebar.Items className="h-[95%] overflow-auto hide-scrollbar bg-white py-4 px-2">
=======
        <Sidebar.Items className="h-full overflow-auto hide-scrollbar bg-white py-4 px-2">
>>>>>>> Stashed changes
          <div className="flex flex-col gap-1 !font-medium  ">
            { menus
              .filter( ( item ) => item.userTypes.includes( userType ) )
              .map( ( item, index ) => {
                if ( item !== menus[ menus.length - 1 ] )
                  return (
                    <NavLink key={ index } to={ item.path } replace>
                      <div
                        className={ `flex flex-row items-center gap-2 !font-baloo2  rounded-md p-2 text-base text-blue_dark  ${ selectedItem === item.path
<<<<<<< Updated upstream
                            ? `!bg-blue_base !text-white`
                            : ""
=======
                          ? `!bg-blue_base !text-white`
                          : ""
>>>>>>> Stashed changes
                          } hover:bg-slate-100 transition-all` }
                      >
                        <img src={ item.icon } width={ 25 } />
                        { drawerFormat( item.path ) }
                      </div>
                    </NavLink>
                  );
              } ) }

            <Sidebar.Collapse
              className={ `ml-[-2px] gap-1 items-center !font-baloo2 rounded-md p-2 text-base text-blue_dark ` }
              label="Siêu thị bài thi"
              icon={ () => (
                <img className="w-6 h-6" src="/images/shopping-cart.png"></img>
              ) }
            >
              { menus2
                .filter( ( item ) => item.userTypes.includes( userType ) )
                .map( ( item, index ) => (
                  <NavLink key={ index } to={ item.path } replace>
                    <div
                      className={ `flex flex-row gap-2  items-center ml-2 !font-baloo2  rounded-md p-2 text-sm text-blue_dark  ${ selectedItem === item.path
<<<<<<< Updated upstream
                          ? `!bg-blue_base !text-white`
                          : ""
=======
                        ? `!bg-blue_base !text-white`
                        : ""
>>>>>>> Stashed changes
                        } hover:bg-slate-100 transition-all` }
                    >
                      <img src={ item.icon } />
                      { drawerFormat( item.path ) }
                    </div>
                  </NavLink>
                ) ) }
            </Sidebar.Collapse>
            <NavLink to={ menus[ menus.length - 1 ].path } replace>
              <div
                className={ `flex flex-row items-center gap-2 !font-baloo2  rounded-md p-2 text-base text-blue_dark  ${ selectedItem === menus[ menus.length - 1 ].path
<<<<<<< Updated upstream
                    ? `!bg-blue_base !text-white`
                    : ""
=======
                  ? `!bg-blue_base !text-white`
                  : ""
>>>>>>> Stashed changes
                  } hover:bg-slate-100 transition-all` }
              >
                <img src={ menus[ menus.length - 1 ].icon } />
                { drawerFormat( menus[ menus.length - 1 ].path ) }
              </div>
            </NavLink>
          </div>
        </Sidebar.Items>
<<<<<<< Updated upstream
        <Button className="mt-2 w-full justify-center !p-0 !ring-0 text-blue_dark font-bold flex-1 ">
          Hướng dẫn sử dụng
        </Button>
=======
        {/* <Button className="mt-2 w-full justify-center !p-0 !ring-0 text-blue_dark font-bold flex-1 ">
          Hướng dẫn sử dụng
        </Button> */}
>>>>>>> Stashed changes
      </Sidebar>
    </>
  );
};

export default CustomDrawer;
