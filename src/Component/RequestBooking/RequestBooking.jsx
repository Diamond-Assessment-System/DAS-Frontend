import HeaderAs from "../../Component/HeaderAs";
import SideBar from "../../Component/SideBar";
import RequestBookingContent from "./RequestBookingContent";
import Spinner from "../Spinner/Spinner";

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
