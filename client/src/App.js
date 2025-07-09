import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Members from "./pages/Members";
import ModalLayout from "./layouts/ModalLayout";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/entryPages/Login";
import Notifications from "./pages/Notifications";

const App = () => {
  return (
    <>
      <Router>
        <ModalLayout />
        <Routes>
          <Route path="/giris-yap" element={<Login />} />

          <Route path="/" element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }>
            <Route index path="/" element={<Home />} />
            <Route path="/uyeler" element={<Members />} />
            <Route path="/bildirimler" element={<Notifications />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App