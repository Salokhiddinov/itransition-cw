import { Link } from "react-router-dom";

export default function StartPage() {
  return (
    <div>
      <header>
        <div>
          THE<strong>COLLECTOR</strong>
        </div>
      </header>
      <main>
        <h1>The Collector</h1>
        <p>Manage your collections easily.</p>
        <Link to="/login">Let's dive in!</Link>
      </main>
    </div>
  );
}
