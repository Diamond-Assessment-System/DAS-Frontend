import { PATH } from "routes/constants";

<<<<<<< Updated upstream
export const breadCrumbFormat = (pathname) => {
  if (!pathname) return "";
  const path = "/" + pathname.split("/")[1];
  switch (path) {
=======
export const breadCrumbFormat = ( pathname ) => {
  if ( !pathname ) return "";
  const path = "/" + pathname.split( "/" )[ 1 ];
  switch ( path ) {
>>>>>>> Stashed changes
    case PATH.HOME:
      return "Trang chủ";

    case PATH.USERS:
      return "Danh sách người dùng";

    case PATH.SUBJECTS:
      return "Danh sách môn học";

    case PATH.SCHOOLS:
      return "Danh sách trường học";
    case PATH.CLASSES:
      return "Danh sách lớp học";

    case PATH.TEST_SAMPLE:
      return "Danh sách mẫu bài kiểm tra";

    case PATH.ANSWER_SAMPLE:
      return "Danh sách mẫu bài kiểm tra";
    case PATH.PROFILE:
      return "Thông tin tài khoản";
    case PATH.TEST:
      return "Quản lý cuộc thi";

    case PATH.EXAMBANK:
      return "Ngân hàng đề";

    case PATH.REQUIREAPPROVE:
      return "Yêu cầu xét duyệt";
    case PATH.MANAGEEXAM:
      return "Quản lý bộ câu hỏi";
    case PATH.SUPERMARKETEXAMALL:
      return "Siêu thị bộ câu hỏi";

    case PATH.LISTPAY:
      return "Danh sách bán";

    case PATH.LISTBOUGHT:
      return "Danh sách mua";

    case PATH.REQUIREAPPROVE:
      return "Yêu cầu xét duyệt";
    case PATH.MATRIX:
      return "Tạo ma trận đề";
    case PATH.DOWNLOAD:
      return "Tải đề";
    case PATH.PAYMENT:
      return "Nạp xu";

    default:
  }
  return "";
};

<<<<<<< Updated upstream
export const emptyDataFormat = (tableName) => {
  switch (tableName) {
=======
export const emptyDataFormat = ( tableName ) => {
  switch ( tableName ) {
>>>>>>> Stashed changes
    case "class":
      return "Hiện tại lớp chưa có học sinh nào";
    case "school":
      return "Hiện tại chưa có trường nào";
  }
};

<<<<<<< Updated upstream
export const drawerFormat = (pathname) => {
  switch (pathname) {
=======
export const drawerFormat = ( pathname ) => {
  switch ( pathname ) {
>>>>>>> Stashed changes
    case PATH.HOME:
      return "Trang chủ";

    case PATH.USERS:
      return "Quản lý người dùng";

    case PATH.SUBJECTS:
      return "Chương trình học";

    case PATH.SCHOOLS:
      return "Trường học";
    case PATH.CLASSES:
      return "Quản lý lớp học";

    case PATH.TEST_SAMPLE:
      return "Mẫu bài kiểm tra";

    case PATH.ANSWER_SAMPLE:
      return "Mẫu phiếu trả lời";
    case PATH.TEST:
      return "Quản lý cuộc thi";

    case PATH.EXAMBANK:
      return "Ngân hàng đề";

    case PATH.PAYMENT:
      return "Nạp xu";

    case PATH.REQUIREAPPROVE:
      return "Yêu cầu xét duyệt";
    case PATH.MANAGEEXAM:
      return "Quản lý bộ câu hỏi";
    case PATH.SUPERMARKETEXAMALL:
<<<<<<< Updated upstream
      return "Tất cả đề";
=======
      return "Tất cả bộ câu hỏi";
>>>>>>> Stashed changes

    case PATH.LISTPAY:
      return "Danh sách bán";
    case PATH.PROFILE:
      return "Thông tin tài khoản";

    case PATH.LISTBOUGHT:
      return "Danh sách mua";

    case PATH.TRANSACTION:
      return "Lịch sử giao dịch";

    default:
  }
  return "";
};
<<<<<<< Updated upstream
export const dateFormat = (inputDate) => {
  // Parse the input date string
  const parsedDate = new Date(inputDate);

  // Extract date components
  const year = parsedDate.getFullYear();
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
  const day = parsedDate.getDate().toString().padStart(2, "0");

  // Extract time components
  const hours = parsedDate.getHours().toString().padStart(2, "0");
  const minutes = parsedDate.getMinutes().toString().padStart(2, "0");
  const seconds = parsedDate.getSeconds().toString().padStart(2, "0");

  // Format the date and time
  const formattedDate = `${day}-${month}-${year}`;
=======
export const dateFormat = ( inputDate ) => {
  // Parse the input date string
  const parsedDate = new Date( inputDate );

  // Extract date components
  const year = parsedDate.getFullYear();
  const month = ( parsedDate.getMonth() + 1 ).toString().padStart( 2, "0" );
  const day = parsedDate.getDate().toString().padStart( 2, "0" );

  // Extract time components
  const hours = parsedDate.getHours().toString().padStart( 2, "0" );
  const minutes = parsedDate.getMinutes().toString().padStart( 2, "0" );
  const seconds = parsedDate.getSeconds().toString().padStart( 2, "0" );

  // Format the date and time
  const formattedDate = `${ day }-${ month }-${ year }`;
>>>>>>> Stashed changes

  return formattedDate;
};

<<<<<<< Updated upstream
export const genderFormat = (gender) => {
  switch (gender) {
=======
export const genderFormat = ( gender ) => {
  switch ( gender ) {
>>>>>>> Stashed changes
    case 0:
      return "Nữ";
    case 1:
      return "Nam";
    default:
      return "";
  }
};

<<<<<<< Updated upstream
export const statusFormat = (status) => {
  switch (status) {
=======
export const statusFormat = ( status ) => {
  switch ( status ) {
>>>>>>> Stashed changes
    case 0:
      return "Chờ phê duyệt";
    case 1:
      return "Đã phê duyệt";
    case 2:
<<<<<<< Updated upstream
      return "Từ chối";
=======
      return "Đã từ chối";
>>>>>>> Stashed changes
    default:
      return "";
  }
};

<<<<<<< Updated upstream
export const transactionTypeFormat = (type) => {
  switch (type) {
=======
export const questionsSetFormat = ( type ) => {
  switch ( type ) {
    case "0":
      return "Đã mua";
    case "2":
      return "Được chia sẻ bởi";
    default:
      return ""
  }
}

export const transactionTypeFormat = ( type ) => {
  switch ( type ) {
>>>>>>> Stashed changes
    case 0:
      return "Nạp xu";
    case 1:
      return "Tạo đề";
    case 2:
      return "Chấm bài";
    case 3:
      return "Mua bộ câu hỏi";
    case 4:
      return "Bán bộ câu hỏi";
    case 5:
      return "Đăng nhập lần đầu";
    case 6:
      return "Public bộ câu hỏi";
    default:
      return "";
  }
};

<<<<<<< Updated upstream
export const dateHourFormat = (inputDate) => {
  // Parse the input date string
  const parsedDate = new Date(inputDate);

  // Extract date components
  const year = parsedDate.getFullYear();
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
  const day = parsedDate.getDate().toString().padStart(2, "0");

  // Extract time components
  const hours = parsedDate.getHours().toString().padStart(2, "0");
  const minutes = parsedDate.getMinutes().toString().padStart(2, "0");
  const seconds = parsedDate.getSeconds().toString().padStart(2, "0");

  // Format the date and time
  const formattedDate = `   ${day}-${month}-${year} | ${hours}:${minutes}:${seconds}`;
=======
export const dateHourFormat = ( inputDate ) => {
  // Parse the input date string
  const parsedDate = new Date( inputDate );

  // Extract date components
  const year = parsedDate.getFullYear();
  const month = ( parsedDate.getMonth() + 1 ).toString().padStart( 2, "0" );
  const day = parsedDate.getDate().toString().padStart( 2, "0" );

  // Extract time components
  const hours = parsedDate.getHours().toString().padStart( 2, "0" );
  const minutes = parsedDate.getMinutes().toString().padStart( 2, "0" );
  const seconds = parsedDate.getSeconds().toString().padStart( 2, "0" );

  // Format the date and time
  const formattedDate = `   ${ day }-${ month }-${ year } | ${ hours }:${ minutes }:${ seconds }`;
>>>>>>> Stashed changes

  return formattedDate;
};
