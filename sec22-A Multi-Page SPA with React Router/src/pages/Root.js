import { Outlet } from "react-router-dom"; // marks the place where the children route should be rendered to
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
    return (
        <>
        <MainNavigation />
        <main>
            <Outlet />
        </main>
        </>
    )
}

export default RootLayout;