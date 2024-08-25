import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className="w-full">
            <div className="flex justify-between bg-gray-800 py-4 px-5">
                <Link className="navbar-brand" to="/">FlashCards</Link>
                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <ul className="flex gap-2" id="navbarNav">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" href="/game-rpg">Game RPG</Link>
                    </li> */}
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/game/1">Guess Card</Link>
                    </li> */}
                </ul>
            </div>
        </nav>
    )
}
