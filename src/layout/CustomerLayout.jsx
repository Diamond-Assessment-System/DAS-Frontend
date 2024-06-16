import { Outlet } from "react-router-dom";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";

function CustomerLayout() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow mt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default CustomerLayout;
