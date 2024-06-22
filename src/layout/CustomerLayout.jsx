import { Outlet } from "react-router-dom";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";

function CustomerLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 mt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default CustomerLayout;
