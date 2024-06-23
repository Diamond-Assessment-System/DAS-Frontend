// src/RoutePath.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AssessmentStaffLayout from "../layout/AssessmentStaffLayout";
import AssessmentBooking from "../Component/AssessmentBookingPage/AssessmentBooking";
import AssessmentPaperList from "../Component/AssessmentPaperListPage/AssessmentPaperList";
import AssessmentBookingSample from "../Component/AssessmentBookingSamplePage/AssessmentBookingSample";
import CustomerLayout from "../layout/CustomerLayout";
import HomePage from "../Component/HomePage/HomePage";
import GoogleLoginComponent from "../Component/Login/Login";
import InfoForm from "../Component/ConsultingStaffPage/InfoForm";
import CutForm from "../Component/ConsultingStaffPage/CutForm";
// import SummaryPage from '../Component/ConsultingStaffPage/SummaryPage'
import ErrorPage from "../Component/ErrorPage/ErrorPage";
import SelectionForm from "../Component/ConsultingStaffPage/SelectionForm";
import AssessmentRequestCustomer from "../Component/AssessmentRequestCustomer/AssessmentRequestCustomer";
import ConsultingStaffLayout from "../layout/ConsultingStaffLayout";
import AssessmentRequestConsulting from "../Component/AssessmentRequestPage/AssessmentRequestConsulting";
import AssessmentRequestDetail from "../Component/AssessmentRequestDetail/AssessmentRequestDetail";
import SuccessPage from "../Component/SuccessPage/SuccessPage";
import CreateAssessmentBooking from "../Component/CreateAssessmentBooking/CreateAssessmentBooking";
import AssessmentBookingDiamondInput from "../Component/AssessmentBookingDiamondInputPage/AssessmentBookingDiamondInput";
import { useCookies } from "react-cookie";
import AssessmentPaperDetail from "../Component/AssessmentPaperDetail/AssessmentPaperDetail";
import InfoPage from "../Component/CompanyInformation/CompanyInformation";
import AssetsmentPaper from "../Component/AssetsmentPaper/AssetsmentPaper";
import ConsultingBooking from "../Component/ConsultingBooking/ConsultingBooking";
import ManagerLayout from "../Component/ManagerLayout/ManagerLayout.jsx";
import SealingRecords from "../Component/ManagerLayout/SealingRecords.jsx";
import CommitmentPaper from "../Component/ManagerLayout/CommitmentPaper.jsx";
import Dashboard from "../Component/ManagerLayout/Dashboard";
import AssetsmentList from "../Component/AssetmentList/AssetsmentList";
import ManageOrderTimelines from "../Component/ManagerLayout/ManagePricingTimelines.jsx";
import Commitpaper from "../Component/ManagerLayout/Commitpaper.jsx";
import RegisterComponent from "../Component/Register/RegisterComponent.jsx";
import AssignWork from "../Component/ManagerLayout/Assignwork.jsx";
import AsPaperManager from "../Component/ManagerLayout/AsPaperManager.jsx";
import AssessmentReceipt from "../Component/AssessmentReceipt/AssessmentReceipt.jsx";
import ManagePricingTimelines from "../Component/ManagerLayout/ManagePricingTimelines.jsx";
import AssessmentPaperPreview from "../Component/AssetsmentPaper/AssessmentPaperPreview.jsx";

const RoutePath = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<HomePage />} />
          <Route path="homepage" element={<HomePage />} />
          <Route path="about" element={<InfoPage />} />
          <Route path="makerequest" element={<AssessmentRequestCustomer />} />
          <Route path="success" element={<SuccessPage />} />
        </Route>
        <Route path="/consultingstaff" element={<ConsultingStaffLayout />}>
          <Route index element={<AssessmentRequestConsulting />} />
          <Route path="assessmentrequest" element={<AssessmentRequestConsulting />}/>
          <Route path="assessmentrequest/:id" element={<AssessmentRequestDetail />}/>
          {/* <Route path='assessmentrequest/:id/createbooking' element={<CreateAssessmentBooking />} /> */}
          <Route path="assessmentrequest/:id/inputdiamonds" element={<AssessmentBookingDiamondInput />}/>
          <Route path="assessmentrequest/:id/inputdiamonds/summary" element={<AssetsmentList />}/>
          <Route path="receipt" element={<AssessmentReceipt />}/>
        </Route>

        <Route path="/assessmentstaff" element={<AssessmentStaffLayout />}>
          <Route index element={<AssessmentBooking />} />
          <Route path="assessmentbooking" element={<AssessmentBooking />} />
          {/* <Route path='assessmentbooking/:id' element={<AssessmentBookingSample />} /> */}
          <Route path="assessmentbooking/:id/selection" element={<SelectionForm />}/>
          <Route path="assessmentbooking/:id/selection/info" element={<InfoForm />}/>
          {/* <Route path="assessmentbooking/:id/selection/info/cut" element={<CutForm/>} /> */}
          <Route path="assessmentbooking/:id/selection/info/summary" element={<AssetsmentPaper />}/>
          <Route path="assessmentbooking/:id/selection/info/summary/preview" element={<AssessmentPaperPreview />}/>
          <Route path="assessmentpaperlist" element={<AssessmentPaperList />} />
          <Route path="assessmentpaperlist/:id" element={<AssessmentPaperDetail />} />
        </Route>
        <Route path="/manager" element={<ManagerLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/manager/manage-pricing-timelines" element={<ManageOrderTimelines />} />
          <Route path="/manager/sealing-records" element={<SealingRecords />} />
          <Route path="/manager/commitment-paper" element={<Commitpaper />} />
          <Route path="/manager/assignwork" element={<AssignWork />} />
          <Route path="/manager/assignpaper" element={<AsPaperManager />} />
        </Route>
        <Route path="assetsmentpaper" element={<AssetsmentPaper />} />
        <Route path="/login" element={<GoogleLoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutePath;
