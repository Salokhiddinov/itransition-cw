import * as React from "react";
import { Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Navigation from "./components/Navigation";
import CreateItemPage from "./pages/CreateItemPage";
import CollectionItems from "./pages/CollectionItems";
import Item from "./components/Item";
import UserPage from "./pages/UserPage";
import CreateCollection from "./pages/CreateCollection";
import UpdateCollectionPage from "./pages/UpdateCollectionPage";
import UpdateItemPage from "./pages/UpdateItemPage";
// import Collection from "./components/Collection";

function App() {
  return (
    <div className="App">
      <Navigation />
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
              path="/collection/create/:username"
              element={<CreateCollection />}
            />
            <Route
              path="/collection/:collectionID"
              element={<CollectionItems />}
            />
            <Route
              path="/collection/:username/:collectionID/update"
              element={<UpdateCollectionPage />}
            />
          </Route>
          <Route path="/item">
            <Route path="/item" element={<Item />} />
            <Route
              path="/item/:username/:collectionID/:id/update"
              element={<UpdateItemPage />}
            />
          </Route>
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/user/:username">
            <Route
              path="/user/:username/:collectionID"
              element={<CollectionItems />}
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
