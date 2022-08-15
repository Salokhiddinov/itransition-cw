import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from './pages/ProfilePage';
import Navigation from "./components/Navigation";

function App() {
  return (
    <section>
      <Navigation />
      <Routes>
          <Route path="/" component={HomePage} />
          <Route path='/profile' component={ProfilePage} />
      </Routes>
    </section>
  );
}

export default App;
