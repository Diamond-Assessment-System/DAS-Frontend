import { Outlet } from "react-router-dom";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";

function CustomerLayout() {
  return (
    <div >
      <Header />
      <main className="mt-15">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default CustomerLayout;
