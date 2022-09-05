import * as React from "react";
import { Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Navigation from "./components/layout/Navigation";
import CreateItemPage from "./pages/CreateItemPage";
import CollectionItems from "./pages/CollectionItems";
import Item from "./components/items/Item";
import UserPage from "./pages/UserPage";
import CreateCollection from "./pages/CreateCollection";
import UpdateCollectionPage from "./pages/UpdateCollectionPage";
import UpdateItemPage from "./pages/UpdateItemPage";
import UpdateUser from "./pages/UpdateUser";
import TagSearchPage from "./pages/TagSearchPage";
// import Collection from "./components/Collection";
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.style.setProperty("--main-bg", "#171717");
  document.documentElement.style.setProperty("--second-bg", "#000000");
  document.documentElement.style.setProperty("--main-font", "#ffffff");
  document.documentElement.style.setProperty("--main-link", "#0453ff");
}
if (localStorage.getItem("theme") === "light") {
  document.documentElement.style.setProperty("--main-bg", "#ebf5ff");
  document.documentElement.style.setProperty("--second-bg", "#ffffff");
  document.documentElement.style.setProperty("--main-font", "#000000");
  document.documentElement.style.setProperty("--main-link", "#0453ff");
}

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
              path="/collection/create-item/:username/:collectionID"
              element={<CreateItemPage />}
            />
            <Route
              path="/collection/items/:collectionID"
              element={<CollectionItems />}
            />
            <Route
              path="/collection/:username/:collectionID/update"
              element={<UpdateCollectionPage />}
            />
          </Route>
          <Route path="/item">
            <Route path="/item" element={<Item />} />
            <Route path="/item/edit/:id" element={<UpdateItemPage />} />
          </Route>
          <Route path="/user/:username">
            <Route path="/user/:username" element={<UserPage />} />
            <Route
              path="/user/:username/:collectionID"
              element={<CollectionItems />}
            ></Route>
          </Route>
          <Route path="/user/edit/:id" element={<UpdateUser />} />
          <Route path="/tag/:tag" element={<TagSearchPage />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
