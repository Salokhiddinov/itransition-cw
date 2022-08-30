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
import CollectionItems from "./pages/CollectionItems";
import Item from "./components/Item";
import UserPage from "./pages/UserPage";
// import Collection from "./components/Collection";

function App() {
  return (
    <div className="App">
      <TheNavigation className="the-navigation" />
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
          <Route path="/collection">
            <Route
              path="/collection/:collectionID"
              element={<CollectionItems />}
            />
          </Route>
          <Route path="/item">
            <Route path="/item" element={<Item />} />
          </Route>
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/user/:username">
            <Route
              path="/user/:username/:collectionID"
              element={<CreateItemPage />}
            >
              <Route
                path="/user/:username/:collectionID/create"
                element={<CreateItemPage />}
              />
            </Route>
          </Route>
        </Routes>
      </section>
    </div>
  );
}

export default App;
