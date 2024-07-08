
// Function to get booking status meaning
function getBookingStatusMeaning(status) {
  switch (status) {
    case 1:
      return "Đã tạo";
    case 2:
      return "Đã nhận";
    case 3:
      return "Đã Hoàn Thành";
    case 4:
      return "Đã Seal";
    case 5:
      return "Đã Hủy";
    default:
      return "Unknown status";
  }
}

function getSampleStatusMeaning(status) {
  switch (status) {
    case 1:
      return "Đã Mở";
    case 2:
      return "Đã Phân Việc";
    case 3:
      return "Đã Hoàn Thành";
    case 4:
      return "Đã Seal";
    case 5:
      return "Đã Hủy";
    default:
      return "Unknown status";
  }
}

function getPaymentTypeMeaning(type) {
    switch (type) {
      case 1:
        return "Tiền mặt";
      case 2:
        return "Chuyển khoản";
      default:
        return "Unknown payment type";
    }
  }
  
  function getPaymentStatusMeaning(status) {
    switch (status) {
      case 1:
        return "Chưa thanh toán";
      case 2:
        return "Đã thanh toán";
      default:
        return "Unknown payment status";
    }
  }
  function getRoleMeaning(role) {
    switch (role) {
      case 1:
        return "Customer";
      case 2:
        return "Consulting Staff";
      case 3:
        return "Assessment Staff";
      case 4:
        return "Manager";
      case 5:
        return "Admin";
      default:
        return "Unknown role";
    }
  }

  function getAccountStatusMeaning(status){
    switch(status){
      case 1:
        return "Hoạt động";
      case 2:
        return "Đã chặn";
      default:
        return "Unknown";
    }
  }

export {
  getBookingStatusMeaning,
  getSampleStatusMeaning,
  getPaymentTypeMeaning,
  getPaymentStatusMeaning,
  getRoleMeaning,
  getAccountStatusMeaning
};

