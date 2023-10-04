import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {ITokenPair} from "../../interfaces";
import {authActions} from "../../redux/slices/auth.slice";
import {authService} from "../../services";
import css from './login.module.css'
import {joiResolver} from "@hookform/resolvers/joi";
import {authValidator} from "../../validators";

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const {error} = useAppSelector(state => state.authReducer);

    const navigate = useNavigate();
    const {handleSubmit, register, formState: {isValid}} = useForm<ITokenPair>({
        resolver: joiResolver(authValidator)
    });

    const login: SubmitHandler<ITokenPair> = async (user) => {
        try {
            const { meta: { requestStatus } } = await dispatch(authActions.login(user));

            if (requestStatus === 'fulfilled') {
                navigate('/orders');
            }

        } catch (error) {
            authService.deleteTokens()
        }
    };


    return (
        <form onSubmit={handleSubmit(login)} className={css.loginForm}>
            <div className={css.formGroup}>
                <label>Email</label>
            <input type="email" placeholder={'username'} {...register('username', {required: true})}/>
            </div>
            <div className={css.formGroup}>
                <label>Password</label>
            <input type="password" placeholder={'password'} {...register('password', {required: true})}/>
            </div>
            {error && <p>{error.error}</p>}
            <button disabled={!isValid}>Login</button>
        </form>
    );
}

export {LoginForm};