import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import SignupForm from "./Components/SignupForm";
import ResetPasswordForm from "./Components/ResetPasswordForm";
import HomePage from "./Components/HomePage";
import Dashboard from "./Components/Dashboard";
import UserPage from "./Components/UserPage";
import { Contracts } from "./pages/Contracts";
import { Products } from "./pages/Products";
import { Vendors } from "./pages/Vendors";
import { Settings } from "./pages/Settings";
import { Profile } from "./pages/Profile";
import "./App.css";
import PeopleList from "./pages/People";
import { ProfileEdit } from "./pages/ProfileEdit";
import EmployeeTable from "./pages/SAPEMP";
import Employee from "./pages/EmployeeTable";

//Vendor
import { SAPDataFetcher } from "./pages/SAPDataFetcher";

// //Approver
import { ApproverInterface } from "./pages/Approver/ApproverInterface";

//userContext
import { UserProvider } from "./context/UserContext";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    // <Router>
    <UserProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="vendor-dashboard" element={<Dashboard />} />
        <Route path="user" element={<UserPage />} />
        <Route path="reset-password" element={<ResetPasswordForm />} />
        <Route path="profile2" element={<Profile />} />
        <Route path="profile" element={<ProfilePage/>} />
        <Route path="profile/edit" element={<ProfileEdit />} />
        <Route path="settings" element={<Settings />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="products" element={<Products />} />
        <Route path="contracts" element={<Contracts />} />
        <Route path="people" element={<PeopleList />} />
        <Route path="SAPEMP" element={<EmployeeTable />} />
        <Route path="CPI" element={<Employee />} />

        {/* Vendor */}
        <Route path="sample" element={<SAPDataFetcher />} />

        {/* Approver */}
        <Route path="approver/discount" element={<ApproverInterface />} />
        <Route
          path="/approver/discount/approved"
          element={<ApproverInterface />}
          />
        <Route
          path="/approver/discount/rejected"
          element={<ApproverInterface />}
          />

        {/* Unknown Route */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
     </BrowserRouter>
    </UserProvider>
    // </Router>
  );
};

export default App;
