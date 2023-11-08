import {FC, useState} from 'react'
import {useForm, Controller} from 'react-hook-form';
import Select from 'react-select';

import {IOrder} from "../../interfaces";
import css from './editModal.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {orderActions} from "../../redux";

interface IProps {
    onClose: () => void;
    onEditOrder: (id: number, editedOrder: any) => void;
    order: IOrder;
}

const EditModal: FC<IProps> = ({onClose, onEditOrder, order}) => {

    const {groups} = useAppSelector((state) => state.orderReducer);
    const dispatch = useAppDispatch();

    const {register, handleSubmit, control} = useForm();
    const [isGroupButtonsVisible, setGroupButtonsVisible] = useState(false);
    const [isSelectVisible, setSelectVisible] = useState(true);
    const [newGroup, setNewGroup] = useState(order?.group?.name || "");

    const initialGroupValue = order.group
        ? { value: order.group.name, label: order.group.name }
        : { value: null, label: "all groups" };

    const groupOptions = [
        { value: null, label: "all groups" },
        ...groups.map((group) => ({
            value: group.name,
            label: group.name,
        })),
    ];


    const courseOptions = [
        { value: 'FS', label: 'FS' },
        { value: 'QACX', label: 'QACX' },
        { value: 'JCX', label: 'JCX' },
        { value: 'JSCX', label: 'JSCX' },
        { value: 'FE', label: 'FE' },
        { value: 'PCX', label: 'PCX' },
        { value: null, label: 'all courses' }

    ];

    const statusOptions = [
        { value: 'In work', label: 'In work' },
        { value: 'New', label: 'New' },
        { value: 'Agree', label: 'Agree' },
        { value: 'Disagree', label: 'Disagree' },
        { value: null, label: 'all statuses' }

    ];

    const courseTypeOptions = [
        { value: 'pro', label: 'pro' },
        { value: 'minimal', label: 'minimal' },
        { value: 'premium', label: 'premium' },
        { value: 'incubator', label: 'incubator' },
        { value: 'vip', label: 'vip' },
        { value: null, label: 'all courseTypes' }
    ];

    const courseFormatOptions = [
        { value: 'static', label: 'static' },
        { value: 'online', label: 'online' },
        { value: null, label: 'all courseFormats'}
    ];


    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            border: 'none',
            backgroundColor: 'transparent',
        }),
        indicatorSeparator: (provided: any) => ({
            ...provided,
            display: 'none',
        }),
        menu: (provided: any) => ({
            ...provided,
            background: "#ededed",
        }),
    };

    const onSubmit = (data: { [key: string]: any }) => {
        const filteredData = Object.keys(data).reduce((acc, key) => {
            if (data[key] !== null && data[key] !== "") {
                acc[key] = data[key];
            }
            return acc;
        }, {} as { [key: string]: any });

        onEditOrder(order.id, filteredData);
        onClose();
    };


    const handleAddGroup = (newGroupName: string) => {
        dispatch(orderActions.createGroup({ name: newGroupName }));
        setNewGroup("");
    };

    const handleSelectGroup = () => {
        setSelectVisible(true);
        setGroupButtonsVisible(false);
        setNewGroup("");
    };

    const toggleGroupButtons = () => {
        setGroupButtonsVisible(!isGroupButtonsVisible);
        setSelectVisible(false);
        setNewGroup("");
    };


    return (
        <div className={css.modal}>
            <div className={css.modalContent}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={css.scrollableContainer}>
                        <div className={css.inputGroup}>

                            <div className={css.inputRow}>
                                <label htmlFor="group">Group</label>
                                {isSelectVisible ? (
                                    <Controller
                                        key="select"
                                        control={control}
                                        name="group"
                                        render={({ field }) => (
                                            <Select
                                                className={css.custom_select}
                                                classNamePrefix="select"
                                                defaultValue={initialGroupValue}
                                                styles={customStyles}
                                                maxMenuHeight={220}
                                                menuPlacement="auto"
                                                name="group"
                                                options={groupOptions}
                                                onChange={(selectedOption) => {
                                                    field.onChange(selectedOption ? selectedOption.value : '');
                                                }}
                                            />
                                        )}
                                    />

                                ) : (
                                <input type="text" id="group"  placeholder={"group"} {...register('group')} value={newGroup}
                                       onChange={(e) => setNewGroup(e.target.value)}
                                       className={css.input}/>
                                )}
                                {!isGroupButtonsVisible && (
                                    <button type="button" onClick={toggleGroupButtons}
                                            className={css.add_group_button}>ADD GROUP</button>)}
                                {isGroupButtonsVisible && (
                                    <div className={css.group_buttons}>
                                        <button type="button" onClick={() => handleAddGroup(newGroup)} className={css.add_button}>ADD</button>
                                        <button type="button" onClick={handleSelectGroup} className={css.select_button}>SELECT</button>
                                    </div>
                                )}
                            </div>

                            <div className={css.inputRow}><label htmlFor="status">Status</label>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            className={css.custom_select}
                                            classNamePrefix="select"
                                            defaultValue={statusOptions.find((option) => option.value === order?.status)}
                                            options={statusOptions}
                                            styles={customStyles}
                                            maxMenuHeight={250}
                                            {...field}
                                            value={statusOptions.find((option) => option.value === field.value)}
                                            onChange={(selectedOption) => {
                                                field.onChange(selectedOption ? selectedOption.value : '');
                                            }}
                                        />
                                    )}
                                />
                            </div>

                            <div className={css.inputRow}>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" placeholder={"name"} {...register('name')} defaultValue={order?.name || ''}
                                       className={css.input}/>
                            </div>

                            <div className={css.inputRow}>
                                <label htmlFor="sum">Sum</label>
                                <input type="text" id="sum" placeholder={"sum"} {...register('sum')} defaultValue={order?.sum || ''}
                                       className={css.input}/>
                            </div>

                            <div className={css.inputRow}>
                                <label htmlFor="surname">Surname</label>
                                <input type="text" id="surname" placeholder={"surname"} {...register('surname')}
                                       defaultValue={order?.surname || ''} className={css.input}/>
                            </div>

                            <div className={css.inputRow}>
                                <label htmlFor="alreadyPaid">Already Paid</label>
                                <input type="text" id="alreadyPaid" placeholder={"alreadyPaid"} {...register('alreadyPaid')}
                                       defaultValue={order?.alreadyPaid || ''} className={css.input}/>
                            </div>

                            <div className={css.inputRow}>
                                <label htmlFor="email">Email</label>
                                <input type="text" id="email" placeholder={"email"} {...register('email')} defaultValue={order?.email || ''}
                                       className={css.input}/>
                            </div>

                            <div className={css.inputRow}>
                                <label htmlFor="course">Course</label>
                                <Controller
                                    name="course"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            className={css.custom_select}
                                            classNamePrefix="select"
                                            defaultValue={courseOptions.find((option) => option.value === order?.course)}
                                            options={courseOptions}
                                            styles={customStyles}
                                            maxMenuHeight={250}
                                            {...field}
                                            value={courseOptions.find((option) => option.value === field.value)}
                                            onChange={(selectedOption) => {
                                                field.onChange(selectedOption ? selectedOption.value : '');
                                            }}
                                        />
                                    )}
                                />
                            </div>

                            <div className={css.inputRow}>
                                <label htmlFor="phone">Phone</label>
                                <input type="text" id="phone" placeholder={"phone"} {...register('phone')} defaultValue={order?.phone || ''}
                                       className={css.input}/>
                            </div>

                            <div className={css.inputRow}>
                                <label htmlFor="courseFormat">Course Format</label>
                                <Controller
                                    name="courseFormat"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            className={css.custom_select}
                                            classNamePrefix="select"
                                            defaultValue={courseFormatOptions.find((option) => option.value === order?.courseFormat)}
                                            options={courseFormatOptions}
                                            styles={customStyles}
                                            maxMenuHeight={250}
                                            {...field}
                                            value={courseFormatOptions.find((option) => option.value === field.value)}
                                            onChange={(selectedOption) => {
                                                field.onChange(selectedOption ? selectedOption.value : '');
                                            }}
                                        />
                                    )}
                                />
                            </div>

                            <div className={css.inputRow}>
                                <label htmlFor="age">Age</label>
                                <input type="text" id="age" placeholder={"age"} {...register('age')} defaultValue={order?.age || ''}
                                       className={css.input}/>
                            </div>

                            <div className={css.inputRow}>
                                <label htmlFor="courseType">Course Type</label>
                                <Controller
                                    name="courseType"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            className={css.custom_select}
                                            classNamePrefix="select"
                                            defaultValue={courseTypeOptions.find((option) => option.value === order?.courseType)}
                                            options={courseTypeOptions}
                                            styles={customStyles}
                                            maxMenuHeight={250}
                                            menuPlacement="top"
                                            {...field}
                                            value={courseTypeOptions.find((option) => option.value === field.value)}
                                            onChange={(selectedOption) => {
                                                field.onChange(selectedOption ? selectedOption.value : '');
                                            }}
                                        />
                                    )}
                                />
                            </div>

                        </div>
                    </div>
                    <div className={css.buttonRow}>
                        <button type="submit" className={css.submitButton}>SUBMIT</button>
                        <button type="button" onClick={onClose} className={css.closeButton}>CLOSE</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export {EditModal};
