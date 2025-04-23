import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Kryefaqja from "./pages/Kryefaqja";
import Punetefundit from "./pages/Punetefundit";
import Projektetefundit from "./pages/Projektetefundit";
import Identifikohu from "./pages/Identifikohu";
import RegisteringAsTalent from "./pages/RegisteringAsTalent";
import RegisteringAsClient from "./pages/RegisteringAsClient";

import TalentProfile from "./pages/TalentProfile";
import ClientProfile from "./pages/ClientProfile";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ProfileClientCreatePostPage from "./pages/ProfileClientCreatePostPage.jsx"
import ViewTalentPublicProfile from "./pages/ViewTalentPublicProfile.jsx"
import ClientSideRegistration from "./pages/ClientSideRegistration";
import TalentSideRegistration from "./pages/TalentSideRegistration";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from './utils/ProtectedRoute';

import ProfileTalentMessenger from "./components/ProfileTalentMessenger.jsx";
import ProfileClientMessenger from "./components/ProfileClientMessenger.jsx";


import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <AuthProvider>

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Kryefaqja />} />
        <Route path="/punet" element={<Punetefundit />} />
        <Route path="/projektet" element={<Projektetefundit />} />
        <Route path="/identifikohu" element={<Identifikohu />} />
        <Route path="/registering-as-talent" element={<RegisteringAsTalent />} />
        <Route path="/registering-as-client" element={<RegisteringAsClient />} />
        <Route path="/client-registration" element={<ClientSideRegistration />} />
        <Route path="/talent-registration" element={<TalentSideRegistration />} />
        <Route path="/view-talent-profile/:id" element={<ViewTalentPublicProfile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes (with role check) */}
        <Route path="/talent-profile/:id" element={<ProtectedRoute role="talent" element={<TalentProfile />} />} />
        <Route path="/client-profile/:id" element={<ProtectedRoute role="client" element={<ClientProfile />} />} />
        <Route path="/create-job" element={<ProtectedRoute role="client" element={<ProfileClientCreatePostPage />} />} />
        <Route path="/message-client/:id" element={<ProtectedRoute role="talent" element={<ProfileTalentMessenger />} />} />
        <Route path="/message-talent/:id" element={<ProtectedRoute role="client" element={<ProfileClientMessenger />} />} />

      </Routes>
    </AuthProvider >
  );
}

export default App;
