import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "@/contexts/AuthContexts";
import { LoginPage } from "@/components/pages/LoginPage";
import { SignUpPage } from "@/components/pages/SignUpPage";
import { Home } from "@/components/pages/Home";
import { EstaPage } from "@/components/pages/EstaPage";
import { CountryPage } from "@/components/pages/CountryPage";
import { PackingList } from "@/components/pages/PackingList";
import { Profile } from "@/components/pages/Profile";
import { PrivateRoute } from "@/components/templetes/PrivateRoute";
import { Review } from "@/components/pages/Review";
import { PassportPage } from "@/components/pages/PassportPage";
import { TicketPage } from "@/components/pages/TicketPage";
import { TaxPage } from "@/components/pages/TaxPage";
import { Admin } from "@/components/pages/Admin";

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
        <Route path="/:country/packing-list/esta" element={<EstaPage />} />
        <Route
          path="/:country/packing-list/passport"
          element={<PassportPage />}
        />
        <Route path="/:country/packing-list/ticket" element={<TicketPage />} />
        <Route path="/:country/packing-list/tax" element={<TaxPage />} />
        <Route path="/country-list" element={<CountryPage />} />
        <Route path="/:country/packing-list" element={<PackingList />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/:country/reviews" element={<Review />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AuthContextProvider>
  );
};
