import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Upload from './components/forms/upload';
import Home from './pages/home';
import HomeLayout from "./components/homeLayout";
import Login from "./components/forms/login/index";
import Signup from "./components/forms/signup/index";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/" element={<HomeLayout><Home /></HomeLayout>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
