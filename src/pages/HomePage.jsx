import { useNavigate } from "react-router-dom";
import { useAuth } from "../Stores/AuthContext.jsx";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <main className=" home">
      <section className="text">
        <h1>You travel the world. WorldWise keeps track of your adventures.</h1>
        <p>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </p>
        <button
          className="link button"
          onClick={() =>
            isAuthenticated ? navigate("/app") : navigate("/login")
          }
        >
          Start tracking now
        </button>
      </section>
    </main>
  );
}
