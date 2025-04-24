import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RegisterItem from "./pages/RegisterItem";
import EditItem from "./pages/EditItem";
import Paymant from "./pages/Paymant";
import ConfirmEmail from "./pages/ConfirmEmail";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registerItem" element={<RegisterItem />} />
          <Route path="/editItem" element={<EditItem />} />
          <Route path="/home" element={<Home />} />
          <Route path="/payment" element={<Paymant />} />
          <Route path="/confirmEmail" element={<ConfirmEmail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
