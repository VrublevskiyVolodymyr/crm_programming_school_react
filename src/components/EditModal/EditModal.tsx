import {FC, useState} from 'react';

import {IOrder} from "../../interfaces";
import css from "./editModal.module.css"

interface IProps {
    onClose: () => void;
    onEditOrder: (id: number, editedOrder: any) => void;
    order: IOrder;
}

const EditModal: FC<IProps> = ({onClose, onEditOrder, order}) => {
    const [group, setGroup] = useState(order?.group?.name || '');
    const [status, setStatus] = useState(order?.status || '');
    const [name, setName] = useState(order?.name || '');
    const [sum, setSum] = useState(order?.sum || '');
    const [surname, setSurname] = useState(order?.surname || '');
    const [alreadyPaid, setAlreadyPaid] = useState(order?.alreadyPaid || '');
    const [email, setEmail] = useState(order?.email || '');
    const [course, setCourse] = useState(order?.course || '');
    const [phone, setPhone] = useState(order?.phone || '');
    const [courseFormat, setCourseFormat] = useState(order?.courseFormat || '');
    const [age, setAge] = useState(order?.age || '');
    const [courseType, setCourseType] = useState(order?.courseType || '');

    const handleSaveClick = () => {

        const editedOrder = {
            group,
            status,
            name,
            sum,
            surname,
            alreadyPaid,
            email,
            course,
            phone,
            courseFormat,
            age,
            courseType,
        };

        onEditOrder(order.id, editedOrder);

        onClose();
    };

    return (
        <div className={css.modal}>
            <div className={css.modalContent}>
                <div className={css.scrollableContainer}>
                    <div className={css.inputGroup}>
                        <div className={css.inputRow}>
                            <label htmlFor="group">Group:</label>
                            <input
                                type="text"
                                id="group"
                                value={group}
                                onChange={(e) => setGroup(e.target.value)}
                                className={css.input}
                            />
                        </div>
                        <div className={css.inputRow}>
                            <label htmlFor="status">Status:</label>
                            <input
                                type="text"
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className={css.input}
                            />
                        </div>
                        <div className={css.inputRow}>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={css.input}
                            />
                        </div>
                        <div className={css.inputRow}>
                            <label htmlFor="sum">Sum:</label>
                            <input
                                type="text"
                                id="sum"
                                value={sum}
                                onChange={(e) => setSum(e.target.value)}
                                className={css.input}
                            />
                        </div>
                        <div className={css.inputRow}>
                            <label htmlFor="surname">Surname:</label>
                            <input
                                type="text"
                                id="surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                className={css.input}
                            />
                        </div>
                        <div className={css.inputRow}>
                            <label htmlFor="alreadyPaid">Already Paid:</label>
                            <input
                                type="text"
                                id="alreadyPaid"
                                value={alreadyPaid}
                                onChange={(e) => setAlreadyPaid(e.target.value)}
                                className={css.input}
                            />
                        </div>
                        <div className={css.inputRow}>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={css.input}
                            />
                        </div>
                        <div className={css.inputRow}>
                            <label htmlFor="course">Course:</label>
                            <input
                                type="text"
                                id="course"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                className={css.input}
                            />
                        </div>
                        <div className={css.inputRow}>
                            <label htmlFor="phone">Phone:</label>
                            <input
                                type="text"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className={css.input}
                            />
                        </div>
                        <div className={css.inputRow}>
                            <label htmlFor="courseFormat">Course Format:</label>
                            <input
                                type="text"
                                id="courseFormat"
                                value={courseFormat}
                                onChange={(e) => setCourseFormat(e.target.value)}
                                className={css.input}
                            />
                        </div>
                        <div className={css.inputRow}>
                            <label htmlFor="age">Age:</label>
                            <input
                                type="text"
                                id="age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className={css.input}
                            />
                        </div>
                        <div className={css.inputRow}>
                            <label htmlFor="courseType">Course Type:</label>
                            <input
                                type="text"
                                id="courseType"
                                value={courseType}
                                onChange={(e) => setCourseType(e.target.value)}
                                className={css.input}
                            />
                        </div>
                    </div>
                </div>
                <div className={css.buttonRow}>
                    <button onClick={handleSaveClick} className={css.submitButton}>
                        SUBMIT
                    </button>
                    <button onClick={onClose} className={css.closeButton}>
                        CLOSE
                    </button>
                </div>
            </div>
        </div>
    );
};



export {EditModal};