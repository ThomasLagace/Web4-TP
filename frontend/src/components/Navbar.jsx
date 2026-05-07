import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <Link to="/" className="navbar-brand">Affrontement des pions</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Accueil</Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/games">Parties</Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/news">Actualité</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
