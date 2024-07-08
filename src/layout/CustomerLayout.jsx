import { Outlet } from "react-router-dom";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
import ContactModal from "../Component/contact/ContactModal";
function CustomerLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-15"> {/* Adjusted margin-top to match the height of the fixed header */}
        <Outlet />
        <ContactModal />
      </main>
      <Footer />
    </div>
  );
}

export default CustomerLayout;
