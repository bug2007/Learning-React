import {Outlet, useNavigation} from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';

function RootLayout() {
    // const navigation = useNavigation();

    return (
        <>
            <MainNavigation />
            <main>
                {/* if we're having an active route transition where the data is still being fetched in the loader */}
                {/* {navigation.state === 'loading' && <p>Loading...</p>}   */}
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout;