import * as React from "react";
import { Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import TheNavigation from "./components/TheNavigation";
import CreateItemPage from "./pages/CreateItemPage";

function App() {
  return (
    <div className="App">
      <TheNavigation />
      <section className="container">
        <Routes>
          {localStorage.getItem("currentUser") ? (
            <Route path="/" element={<HomePage />} />
          ) : (
            <Route path="/" element={<StartPage />} />
          )}
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create" element={<CreateItemPage />} />

          {/* <Route path="/user">
            <Route path="/collection">
              <Route path="/:id" />
              <Route path="/create"/>
              <Route path="/item">
                <Route path="/:id" element={<CreateItemPage />} />
                <Route path="/create" element={<CreateItemPage />} />
              </Route>
            </Route>
          </Route> */}
        </Routes>
      </section>
    </div>
  );
}

export default App;
