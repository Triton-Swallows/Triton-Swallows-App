import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "@/contexts/AuthContexts";
import { LoginPage } from "@/components/pages/LoginPage";
import { SignUpPage } from "@/components/pages/SignUpPage";
import { Home } from "@/components/pages/Home";
import { CountryPage } from "@/components/pages/CountryPage";
// import { PrivateRoute } from "@/components/templetes/PrivateRoute";

export const Router = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route
          path="/"
          element={
            // <PrivateRoute>
            <Home />
            // </PrivateRoute>
          }
        ></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/country-list" element={<CountryPage />} />
      </Routes>
    </AuthContextProvider>
  );
};
