import CarsList from "./pages/CarsList";
import { Home } from "./pages/home";
import Login from "./pages/login/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsersList from "./pages/UsersList";
import ClientsList from "./pages/ClientsList";
import CarDetails from "./pages/CarDetails";
import UserDetails from "./pages/userDetails";
import ToastProvider from "./contexts/ToastContext";
import BookingFlow from "./pages/BookingFlow";
import BookingsList from "./pages/BookingsList";

function App() {
  return (
    <ToastProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/cars"
              element={
                <Home>
                  <CarsList />
                </Home>
              }
            />
            <Route
              path="/car-details/:id"
              element={
                <Home>
                  <CarDetails />
                </Home>
              }
            />
            <Route
              path="/add-car"
              element={
                <Home>
                  <CarDetails />
                </Home>
              }
            />
            <Route
              path="/booking/:carId"
              element={
                <Home>
                  <BookingFlow />
                </Home>
              }
            />
            <Route
              path="/bookings"
              element={
                <Home>
                  <BookingsList />
                </Home>
              }
            />
            <Route
              path="/clients"
              element={
                <Home>
                  <ClientsList />
                </Home>
              }
            />
            <Route
              path="/users"
              element={
                <Home>
                  <UsersList />
                </Home>
              }
            />
            <Route
              path="/profile"
              element={
                <Home>
                  <UserDetails />
                </Home>
              }
            />

            <Route
              path="/user-details/:id"
              element={
                <Home>
                  <UserDetails />
                </Home>
              }
            />
            <Route
              path="/add-user"
              element={
                <Home>
                  <UserDetails />
                </Home>
              }
            />
          </Routes>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
