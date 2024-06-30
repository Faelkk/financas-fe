import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../view/pages/home/Home";
import Signin from "../view/pages/signin/Signin";
import Layout from "../view/layout/Layout";
import Transactions from "../view/pages/transactions/Transactions";
import Stastics from "../view/pages/stastics/Stastics";
import NotFound from "../view/pages/notFound/NotFound";
import { AuthGuard } from "./AuthGuard";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signin"
          element={
            <AuthGuard isPrivate={false}>
              <Signin />
            </AuthGuard>
          }
        />
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <AuthGuard isPrivate>
                <Home />
              </AuthGuard>
            }
          />
          <Route
            path="/transactions"
            element={
              <AuthGuard isPrivate>
                <Transactions />
              </AuthGuard>
            }
          />
          <Route
            path="/statistics"
            element={
              <AuthGuard isPrivate>
                <Stastics />
              </AuthGuard>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
