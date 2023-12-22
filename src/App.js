import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Job from "./Components/Job/Job";
import UpcomingJob from "./Components/Job/UpcomingJob";
import CancelledJob from "./Components/Job/CancelledJob";
import ParentCategory from "./Components/ParentCategory/ParentCategory";
import ChildCategory from "./Components/ChildCategory/ChildCategory";
import ServiceGroup from "./Components/ServiceGroup/ServiceGroup";
import ServiceType from "./Components/ServiceType/ServiceType";
import Service from "./Components/Servicess/Service";
import User from "./Components/User/User";
import Customer from "./Components/Customer/Customer";
import Hub from "./Components/Hub/Hub";
import Coupon from "./Components/Coupon/Coupon";
import HeroBanner from "./Components/HeroBanner/HeroBanner";
import OfferSection from "./Components/OfferSection/OfferSection";
import Slot from "./Components/Slot/Slot";
import ServiceProvider from "./Components/ServiceProvider/ServiceProvider";
import Package from "./Components/Package/Package";
import AddService from "./Components/Servicess/AddService";
import AddPackage from "./Components/Package/AddPackage";
import AddSP from "./Components/ServiceProvider/AddSP";
import AddSlot from "./Components/Slot/AddSlot";
import CreateJob from "./Components/Job/CreateJob";
import AddCoupon from "./Components/Coupon/AddCoupon";
import EditServices from "./Components/Servicess/EditServices";
import StaticBanner from "./Components/StaticBanner/StaticBanner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/job" element={<Job />} />
        <Route path="/upcoming-job" element={<UpcomingJob />} />
        <Route path="/cancelled-job" element={<CancelledJob />} />
        <Route path="/parent-category" element={<ParentCategory />} />
        <Route path="/child-category" element={<ChildCategory />} />
        <Route path="/service-group" element={<ServiceGroup />} />
        <Route path="/service-type" element={<ServiceType />} />
        <Route path="/services" element={<Service />} />
        <Route path="/users" element={<User />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/hub" element={<Hub />} />
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/hero-banner" element={<HeroBanner />} />
        <Route path="/offer-section" element={<OfferSection />} />
        <Route path="/static-banner" element={<StaticBanner />} />
        <Route path="/slots" element={<Slot />} />
        <Route path="/service-provider" element={<ServiceProvider />} />
        <Route path="/packages" element={<Package />} />
        <Route path="/add-services" element={<AddService />} />
        <Route path="/edit-services/:id" element={<EditServices />} />
        <Route path="/add-package" element={<AddPackage />} />
        <Route path="/add-sp" element={<AddSP />} />
        <Route path="/add-slot" element={<AddSlot />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/add-coupon" element={<AddCoupon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
