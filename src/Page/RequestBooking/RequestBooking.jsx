import HeaderAs from "../../Component/HeaderAs";
import SideBar from "../../Component/SideBar";
import RequestBookingContent from "./RequestBookingContent";

function RequestBooking() {
  <>
    <HeaderAs />
    <div className="RequestBooking">
      <SideBar />
      <RequestBookingContent />
    </div>
  </>;
}
export default RequestBooking;
