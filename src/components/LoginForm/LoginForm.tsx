import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {ITokenPair} from "../../interfaces";
import {authActions} from "../../redux/slices/auth.slice";
import {authService} from "../../services";
import css from './login.module.css'
import {useState} from "react";

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const {error} = useAppSelector(state => state.authReducer);
    const {loading} = useAppSelector(state => state.orderReducer);

    const navigate = useNavigate();
    const {handleSubmit, register, formState: {}} = useForm<ITokenPair>({});

    const [showError, setShowError] = useState(false);


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

    const handleInputChange = () => {
        if (showError) {
            setShowError(false);
        }
    };

    function handleButtonSubmit() {
        setShowError(true);
    }


    return (
        <form onSubmit={handleSubmit(login)} className={css.loginForm}>
            <div className={css.formGroup}>
                <label>Email</label>
                <input className={"form-control"} type="email" placeholder={'username'} {...register('username', {required: true})} onChange={handleInputChange} />
            </div>
            <div className={css.formGroup}>
                <label>Password</label>
                <input className={"form-control"} type="password" placeholder={'password'} {...register('password', {required: true})} onChange={handleInputChange} />
            </div>
            <button className={css.loginButton} onClick={handleButtonSubmit}>{loading ? 'LOADING...' : 'LOGIN'}</button>
            {showError && error && <p>{error.error}</p>}
        </form>
    );
}

export {LoginForm};