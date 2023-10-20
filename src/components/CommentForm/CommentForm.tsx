import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form"
import 'bootstrap/dist/css/bootstrap.min.css';

import {useAppDispatch, useAppSelector} from "../../hooks";
import { orderActions } from "../../redux";
import css from "./comment.module.css";
import {authActions} from "../../redux/slices/auth.slice";



interface IProps {
    orderId: number;
    managerId:number;
}

const CommentForm: FC<IProps> = ({ orderId,managerId}) => {
    const dispatch = useAppDispatch();
   const {me} = useAppSelector(state => state.authReducer)

    const { handleSubmit, register,reset, formState: { errors, isValid } } = useForm<{ comment: string }>({
        mode: 'onSubmit',
    });

    const createComment: SubmitHandler<{ comment: string }> = async (data) => {
        if(me && me.id == managerId) {
            await dispatch(orderActions.createComment({
                comment: data.comment, orderId
            }) as any);
            reset()
        }
    };

    return (
        <form onSubmit={handleSubmit(createComment)} className={css.commentForm}>
            <div className={css.formGroup}>
                <input className={"form-control"} type="text" placeholder="comment" {...register("comment", { required: true })} />
                {errors.comment && <span>This field is required</span>}
            </div>
            <button disabled={!isValid || !(me && me.id == managerId)} type="submit" className="btn btn-success">SUBMIT</button>
        </form>
    );
};

export { CommentForm };
