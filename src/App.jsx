import Content from "./Component/Content";
import HeaderAs from "./Component/HeaderAs";
import SideBar from "./Component/SideBar";
import "../src/App.css";
import RequestBookingContent from "./Page/RequestBooking/RequestBookingContent";
import Receipt from "./Page/Receipt/Receipt";
import AssetsmentList from "./Page/AssetmentList/AssetsmentList";
function App() {
  return (
    <>
      <HeaderAs />
      <SideBar />
      {/* <Content /> */}
      {/* <RequestBookingContent /> */}
      {/* <Receipt /> */}
      <AssetsmentList />
    </>
  );
}

export default App;
