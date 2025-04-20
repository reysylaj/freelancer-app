import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

import Kryefaqja from "./pages/Kryefaqja";
import Punetefundit from "./pages/Punetefundit";
import Projektetefundit from "./pages/Projektetefundit";
import Identifikohu from "./pages/Identifikohu";
import RegisteringAsTalent from "./pages/RegisteringAsTalent";
import RegisteringAsClient from "./pages/RegisteringAsClient";
import RegisteringAsAgency from "./pages/RegisteringAsAgency";
import AgencyProfile from "./pages/AgencyProfile";
import TalentProfile from "./pages/TalentProfile";
import ClientProfile from "./pages/ClientProfile";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ProfileClientCreatePostPage from "./pages/ProfileClientCreatePostPage.jsx"
import ViewTalentPublicProfile from "./pages/ViewTalentPublicProfile.jsx"

import ClientSideRegistration from "./pages/ClientSideRegistration";
import TalentSideRegistration from "./pages/TalentSideRegistration";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Kryefaqja />} />
        <Route path="/punet" element={<Punetefundit />} />
        <Route path="/projektet" element={<Projektetefundit />} />
        <Route path="/identifikohu" element={<Identifikohu />} />
        <Route path="/registering-as-talent" element={<RegisteringAsTalent />} />
        <Route path="/registering-as-client" element={<RegisteringAsClient />} />
        <Route path="/client-registration" element={<ClientSideRegistration />} />
        <Route path="/talent-registration" element={<TalentSideRegistration />} />
        <Route path="/registering-as-agency" element={<RegisteringAsAgency />} />
        <Route path="/agency-profile" element={<AgencyProfile />} />

        <Route path="/talent-profile/:id" element={<TalentProfile />} />

        <Route path="/talent-registration" element={<TalentSideRegistration />} />

        <Route path="/client-profile/:id" element={<ClientProfile />} />
        <Route path="/view-talent-profile/:id" element={<ViewTalentPublicProfile />} />


        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-job" element={<ProfileClientCreatePostPage />} />
      </Routes>
    </AuthProvider >
  );
}

export default App;
