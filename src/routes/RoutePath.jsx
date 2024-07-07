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
import ManagerHistory from "../Component/ManagerLayout/ManagerHistory.jsx";
import ManagePricingTimelines from "../Component/ManagerLayout/ManagePricingTimelines.jsx";
import AssessmentPaperPreview from "../Component/AssetsmentPaper/AssessmentPaperPreview.jsx";
import AssessmentPaperListCs from "../Component/AssessmentPaperListPage/AssessmentPaperListCs.jsx";
import ReceiptDetail from "../Component/AssessmentReceiptDetailPage/AssessmentReceiptDetail.jsx";
import ProductSearch from "../Component/SearchProductPage/SearchProduct";
import { EvaluateService } from "../Component/ServicePricePage/Service.jsx";
import AccountInfo from "../Component/AccountInfo/AccountInfo.jsx";
import AdminLayout from "../Component/AdminLayout/AdminLayout.jsx";
import CreateManageUsers from "../Component/AdminLayout/CreateManageUsers.jsx";
import DeleteSuspendUsers from "../Component/AdminLayout/DeleteSuspendUsers.jsx";
import AssignRolesPermissions from "../Component/AdminLayout/AssignRolesPermissions.jsx";
import SystemMaintenance from "../Component/AdminLayout/SystemMaintenance.jsx";
import SystemUpdate from "../Component/AdminLayout/SystemUpdate.jsx";
import ContentDatabase from "../Component/AdminLayout/ContentDatabase.jsx";
import CustomerHistory from "../Component/CustomerHistory/CustomerHistory.jsx";
import SealList from "../Component/Sealing/SealList.jsx";
import SuccessBooking from "../Component/AssessmentBookingSuccess/SuccessBooking.jsx";
import SelectedDiamonds from "../Component/Sealing/SelectedDiamonds.jsx";
import SealHistory from "../Component/Sealing/SealHistory.jsx";
import ReprintedBooking from "../Component/AssessmentPaperReprinted/ReprintedBooking.jsx";

import DiamondInformation from "../Component/DiamondInformationPage/DiamondInformation.jsx";
import ZirconDetail from "../Component/DiamondInformationPage/ZirconDetail.jsx";
import TanzaniteDetail from "../Component/DiamondInformationPage/TanzaniteDetail.jsx";
import AquamarineDetail from "../Component/DiamondInformationPage/AquamarineDetail.jsx";
import CoralDetail from "../Component/DiamondInformationPage/CoralDetail.jsx";
import LookupPaperpage from "../Component/AssessmentPaperReprinted/LookupPaperpage.jsx";
import SealForm from "../Component/Sealing/SealForm.jsx";
import Commitment from "../Component/ManagerLayout/Commitment.jsx";
import CommitmentPaperImage from "../Component/ManagerLayout/CommitmentPaperImage.jsx";

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
          <Route path="lookup" element={<ProductSearch />} />
          <Route path="services" element={<EvaluateService />} />
          <Route path="diamonds" element={<DiamondInformation />} />
          <Route path="account" element={<AccountInfo />} />
          <Route path="history" element={<CustomerHistory />} />
          <Route path="/sealist" element={<SealList />} />
          {/* <Route path="/sealselect" element={<SelectedDiamonds />} />
          <Route path="/sealhistory" element={<SealHistory />} /> */}
          <Route path="successbooking" element={<SuccessBooking />} />
          <Route path="/diamonds/zircon" element={<ZirconDetail />} />
          <Route path="/diamonds/tanzanite" element={<TanzaniteDetail />} />
          <Route path="/diamonds/aquamarine" element={<AquamarineDetail />} />
          <Route path="/diamonds/sanho" element={<CoralDetail />} />
        </Route>

        <Route path="/consultingstaff" element={<ConsultingStaffLayout />}>
          <Route index element={<AssessmentRequestConsulting />} />
          <Route path="assessmentrequest" element={<AssessmentRequestConsulting />} />
          <Route path="assessmentrequest/:id" element={<AssessmentRequestDetail />} />
          {/* <Route path='assessmentrequest/:id/createbooking' element={<CreateAssessmentBooking />} /> */}
          <Route path="assessmentrequest/:id/inputdiamonds" element={<AssessmentBookingDiamondInput />} />
          <Route path="assessmentrequest/:id/inputdiamonds/summary" element={<AssetsmentList />} />
          <Route path="assessmentpaperlist" element={<AssessmentPaperListCs />} />
          <Route path="assessmentpaperlist/:id" element={<AssessmentPaperDetail />} />
          <Route path="receipt" element={<AssessmentReceipt />} />
          <Route path="receipt/:bookingId" element={<ReceiptDetail />} />
          <Route path="reprintpaper" element={<ReprintedBooking />} />
          <Route path="reprintpaper/lookuppaper" element={<LookupPaperpage />} />
        </Route>

        <Route path="/assessmentstaff" element={<AssessmentStaffLayout />}>
          <Route index element={<AssessmentBooking />} />
          <Route path="assessmentbooking" element={<AssessmentBooking />} />
          {/* <Route path='assessmentbooking/:id' element={<AssessmentBookingSample />} /> */}
          <Route path="assessmentbooking/:id/selection" element={<SelectionForm />} />
          <Route path="assessmentbooking/:id/selection/info" element={<InfoForm />} />
          {/* <Route path="assessmentbooking/:id/selection/info/cut" element={<CutForm/>} /> */}
          <Route path="assessmentbooking/:id/selection/info/summary" element={<AssetsmentPaper />} />
          <Route path="assessmentbooking/:id/selection/info/summary/preview" element={<AssessmentPaperPreview />} />
          <Route path="assessmentpaperlist" element={<AssessmentPaperList />} />
          <Route path="assessmentpaperlist/:id" element={<AssessmentPaperDetail />} />
        </Route>
        <Route path="/manager" element={<ManagerLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/manager/manage-pricing-timelines" element={<ManageOrderTimelines />} />
          <Route path="/manager/sealing-records" element={<SealList />} />
          <Route path="/manager/sealform" element={<SealForm />} />
          <Route path="/manager/sealselect" element={<SelectedDiamonds />} />
          <Route path="/manager/sealhistory" element={<SealHistory />} />
          <Route path="/manager/commitment-paper" element={<Commitpaper />} />
          <Route path="/manager/assignpaper" element={<AsPaperManager />} />
          <Route path="/manager/managerhistory" element={<ManagerHistory />} />
          <Route path="/manager/commit" element={<Commitment />} />
          <Route path="/manager/commitmentdownload" element={<CommitmentPaperImage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DeleteSuspendUsers />} />
          <Route path="/admin/block-suspend-users" element={<DeleteSuspendUsers />} />
          <Route path="/admin/assign-roles-permissions" element={<AssignRolesPermissions />} />
          {/* <Route path="/admin/system-maintenance" element={<SystemMaintenance />} /> */}
          {/* <Route path="/admin/system-update" element={<SystemUpdate />} /> */}
          {/* <Route path="/admin/content-database" element={<ContentDatabase />} /> */}
          {/* <Route path="/admin/create-manage-users" element={<CreateManageUsers />} /> */}
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
