import {FC} from 'react';

import {LoginForm} from "../../components";
import css from './login.module.css'

interface IProps {

}

const LoginPage: FC<IProps> = () => {

    return (
        <div className={css.loginPage}>
            <LoginForm/>
        </div>
    );
};

export {LoginPage};