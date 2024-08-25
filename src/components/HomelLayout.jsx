import { Navbar } from "./Navbar"

export const HomelLayout = ({ children }) => {
    return (
        <div
            className="w-full h-full"
        >
            <Navbar />
            {children}

        </div>
    )
}
