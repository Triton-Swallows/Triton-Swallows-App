import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AuthContextProvider } from "@/contexts/AuthContexts";
import { LoginPage } from "@/components/pages/LoginPage";
import { SignUpPage } from "@/components/pages/SignUpPage";
import { Home } from "@/components/pages/Home";
import { EstaPage } from "@/components/pages/EstaPage";
import { CountryPage } from "@/components/pages/CountryPage";
import { Profile } from "@/components/pages/Profile";
import { PrivateRoute } from "@/components/templetes/PrivateRoute";
import { Review } from "@/components/pages/Review";
import { PassportPage } from "@/components/pages/PassportPage";
import { TicketPage } from "@/components/pages/TicketPage";
import { TaxPage } from "@/components/pages/TaxPage";
import { Admin } from "@/components/pages/Admin";
import { AdminRoute } from "@/components/templetes/AdminRoute";
import { MyPackingList } from "@/components/pages/MyPackingList";
import { MyPackingListItems } from "@/components/pages/MyPackingListItems";
import { EveryonePackingList } from "@/components/pages/EveryonePackingList";
import { EveryonePackingListItems } from "@/components/pages/EveryonePackingListItems";
import { useEffect } from "react";
import { OVerview } from "@/components/pages/Overview";

const AppStateInjector = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.fromApp) {
      navigate(location.pathname + location.search, {
        replace: true,
        state: { ...location.state, fromApp: true },
      });
    }
  }, [location.pathname]);

  return <>{children}</>;
};

export const Router = () => {
  return (
    <AuthContextProvider>
      <AppStateInjector>
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
          <Route
            path="/:country/packing-list/ticket"
            element={<TicketPage />}
          />
          <Route path="/:country/packing-list/tax" element={<TaxPage />} />
          <Route path="/country-list" element={<CountryPage />} />
          <Route path="/:country/overviews" element={<OVerview />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/:country/reviews" element={<Review />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />

          {/*  マイリスト*/}
          <Route path="/my-packing-list" element={<MyPackingList />} />
          {/* マイリストの中身 */}
          <Route
            path="/my-packing-list/:id/items"
            element={<MyPackingListItems />}
          />
          {/* みんなのリスト */}
          <Route
            path="/everyone-packing-list"
            element={<EveryonePackingList />}
          />
          {/* みんなのリストの中身 */}
          <Route
            path="/everyone-packing-list/:id/items"
            element={<EveryonePackingListItems />}
          />
        </Routes>
      </AppStateInjector>
    </AuthContextProvider>
  );
};
