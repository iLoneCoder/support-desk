import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewTicket from "./pages/NewTicket";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new-ticket" element={<ProtectedRoute />}>
            <Route path="/new-ticket" element={<NewTicket />} />
          </Route>
          <Route path="/tickets" element={<ProtectedRoute />}>
            <Route path="/tickets" element={<Tickets />} />
          </Route>
          <Route path="/ticket/:ticketId" element={<ProtectedRoute />}>
            <Route path="/ticket/:ticketId" element={<Ticket />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>

  );
}

export default App;
