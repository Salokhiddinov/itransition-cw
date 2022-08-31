import { Link } from "react-router-dom";

export default function StartPage() {
  return (
    <div>
      <header>
        <h2>
          the<span>COLLECTOR</span>
        </h2>
      </header>
      <main>
        <h1>The Collector</h1>
        <p>Manage your collections easily.</p>
        <Link to="/signup">Let's dive in!</Link>
      </main>
    </div>
  );
}
