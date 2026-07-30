import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Upload from './components/forms/upload/moderation';
import Home from './pages/home';
import HomeLayout from "./components/homeLayout";
import Login from "./components/forms/login/index";
import SendOTP from './components/forms/signup/sendotp';
import SignUp from './components/forms/signup/signup';
import UploadProfilePicture from './components/forms/upload/profile';
import Profile from './pages/profile';
import Saved from './pages/saved';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SendOTP />} />
          <Route path="/verify-email" element={<SignUp />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/" element={<HomeLayout><Home /></HomeLayout>} />
          <Route path="/upload-profile-picture" element={<UploadProfilePicture />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
