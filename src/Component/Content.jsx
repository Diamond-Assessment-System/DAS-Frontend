import "./Content.css";

function Content() {
  return (
    <>
      <div className="container-content">
        <div className="stepper">
          <h4> Danh Sách Đặt Hẹn </h4>
        </div>
        <div className="table">
          <table>
            <tr>
              <th>Danh Sách Đặt Hẹn</th>
              <th>Dịch Vụ</th>
              <th>Số Lượng </th>
              <th>Khách Đặt Lịch </th>
              <th>Trạng Thái </th>
            </tr>
            <tr>
              <td>Yêu Cầu Giám Định </td>
              <td>Giám Định 3h</td>
              <td>1</td>
              <td>Name</td>
              <td className="status">Duyệt</td>
            </tr>
            <tr>
              <td>Yêu Cầu Giám Định </td>
              <td>Giám Định 3h</td>
              <td>1</td>
              <td>Name</td>
              <td className="status">Duyệt</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}

export default Content;
