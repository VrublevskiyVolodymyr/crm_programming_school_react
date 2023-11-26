import {FC, useEffect, useState} from 'react';
import {useAppDispatch} from "../../hooks";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useNavigate} from "react-router-dom";

import css from "./activateModal.module.css"
import {passwordValidator} from "../../validators/password.validator";
import {IPassword} from "../../interfaces/password.interface";
import {authActions} from "../../redux/slices/auth.slice";
import {authService} from "../../services";

interface IProps {

}

const ActivateFormModal: FC<IProps> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const pathname = window.location.pathname;
        const tokenFromPath = pathname.split('/').pop();

        if (tokenFromPath) {
            setToken(tokenFromPath);
        }
    }, []);


    const {handleSubmit, register, formState: {errors, isValid}} = useForm<IPassword>(
        {
            mode: 'onSubmit',
            resolver: joiResolver(passwordValidator)
        });

    const activate: SubmitHandler<IPassword> = (password) => {
        if (token) {
            dispatch(authActions.activateManager({token, password: password.password}));
        }
        authService.deleteTokens();
        dispatch(authActions.logout())
        navigate('/login?expSession=true');
    }


    const handleInputChange = () => {
        if (showError) {
            setShowError(false);
        }
    };

    const handleButtonSubmit = () => {
        setShowError(true);
    };

    return (
        <div className={css.modalBackground}>
            <div className={css.activateForm}>
                <form onSubmit={handleSubmit(activate)} className={css.form}>
                    <div className={css.formGroup}>
                        <label>Password</label>
                        <input className={css.form_control} type="text"
                               placeholder={'Password'} {...register('password', {required: true})}
                               onChange={handleInputChange}/>
                        {showError && errors.password && <span className={css.error}>{errors.password.message}</span>}
                    </div>

                    <div className={css.formGroup}>
                        <label>Confirm Password</label>
                        <input className={css.form_control} type="text"
                               placeholder={'Confirm Password'} {...register('confirm_password', {required: true})}
                               onChange={handleInputChange}/>
                        {showError && errors.confirm_password &&
                            <span className={css.error}>{errors.confirm_password.message}</span>}
                    </div>

                    <div className={css.buttonContainer}>
                        <button className={css.button} onClick={handleButtonSubmit}>ACTIVATE</button>
                    </div>

                </form>
            </div>
        </div>
    );
};


export {ActivateFormModal};