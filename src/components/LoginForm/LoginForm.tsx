import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {ITokenPair} from "../../interfaces";
import {authActions} from "../../redux/slices/auth.slice";
import {authService} from "../../services";
import css from './login.module.css'
import {joiResolver} from "@hookform/resolvers/joi";
import {authValidator} from "../../validators";
import {useState} from "react";

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const {error} = useAppSelector(state => state.authReducer);

    const navigate = useNavigate();
    const {handleSubmit, register, formState: {errors}} = useForm<ITokenPair>({
        mode: 'onSubmit',
        resolver: joiResolver(authValidator)
    });

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
            <input className={"form-control"} type="email" placeholder={'username'} {...register('username', {required: true})}   onChange={handleInputChange}/>
            </div>
            <div className={css.formGroup}>
                <label>Password</label>
            <input className={"form-control"} type="password" placeholder={'password'} {...register('password', {required: true})}   onChange={handleInputChange}/>
            </div>
            {error && <p>{error.error}</p>}
            <button className="btn btn-success" onClick={handleButtonSubmit}>Login</button>
            {showError && Object.keys(errors).length > 0 && <div>{Object.values(errors)[0].message}</div>}
        </form>
    );
}

export {LoginForm};