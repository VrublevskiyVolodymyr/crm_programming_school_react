import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

import {useAppDispatch} from "../../hooks";
import {ITokenPair} from "../../interfaces";
import {authActions} from "../../redux/slices/auth.slice";
import {authService} from "../../services";
import css from './login.module.css'



const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {handleSubmit, register, formState: {isValid}} = useForm<ITokenPair>();

    const login: SubmitHandler<ITokenPair> = async (user) => {
        try {
            const { meta: { requestStatus } } = await dispatch(authActions.login(user));

            if (requestStatus === 'fulfilled') {
                navigate('/orders');
            }
        } catch (error) {
            authService.deleteTokens();
        }
    };


    return (
        <form onSubmit={handleSubmit(login)} className={css.loginForm}>
            <div className={css.formGroup}>
                <label>Username</label>
            <input type="text" placeholder={'username'} {...register('username', {required: true})}/>
            </div>
            <div className={css.formGroup}>
                <label>Password</label>
            <input type="text" placeholder={'password'} {...register('password', {required: true})}/>
            </div>
            <button disabled={!isValid}>Login</button>
        </form>
    );
};

export {LoginForm};