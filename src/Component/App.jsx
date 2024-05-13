import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../ContexApi/AuthContex.jsx";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute.jsx";
import PublickRoute from "./PublickRoute.jsx";
import Home from "./pages/Home";
import LogIn from "./pages/Login";
import Quize from "./pages/Quize";
import Result from "./pages/Result";
import SignUp from "./pages/SignUp";
import "./style/App.css";
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/SignUp"
              element={
                <PublickRoute>
                  <SignUp />
                </PublickRoute>
              }
            />
            <Route
              path="/LogIn"
              element={
                <PublickRoute>
                  <LogIn />
                </PublickRoute>
              }
            />

            <Route
              path="/Quize/:id"
              element={
                <PrivateRoute>
                  <Quize />
                </PrivateRoute>
              }
            />
            <Route
              path="/Result/:id"
              element={
                <PrivateRoute>
                  <Result />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
