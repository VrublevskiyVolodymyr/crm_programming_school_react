import {FC} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import {MainLayout} from "./layouts";
import {LoginPage, OrderPage} from "./pages";
import {RequiredAuth} from "./hoс";
import './App.css';


interface IProps {

}

const App: FC<IProps> = () => {


    return (
        <div className="app_container">

            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route index element={<Navigate to={"orders"}/>}/>
                    <Route path={"login"} element={<LoginPage />}/>
                    <Route path={'orders'} element={
                        <RequiredAuth>
                            <OrderPage/>
                        </RequiredAuth>
                    }/>
                </Route>
            </Routes>

        </div>
    );
};

export {App};