import {FC} from 'react';
import {Outlet} from "react-router-dom";

import {Footer, Header} from '../components';

interface IProps {

}

const MainLayout: FC<IProps> = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export {MainLayout};