import {FC} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import {MainLayout} from "./layouts";
import {AdminPanelPage, LoginPage, OrderPage} from "./pages";
import {RequiredAuth} from "./hoс";
import './App.css';
import {ActivatePage} from "./pages/ActivatePage/ActivatePage";


interface IProps {

}

const App: FC<IProps> = () => {


    return (
        <div className="app_container">

            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route index element={<Navigate to={"orders"}/>}/>
                    <Route path={"login"} element={<LoginPage />}/>
                    <Route path={"activate/:token"} element={<ActivatePage/>}/>
                    <Route path={'orders'} element={
                        <RequiredAuth>
                            <OrderPage/>
                        </RequiredAuth>
                    }/>
                    <Route path={'adminPanel'} element={
                        <RequiredAuth>
                            <AdminPanelPage/>
                        </RequiredAuth>
                    }/>
                </Route>
            </Routes>

        </div>
    );
};

export {App};