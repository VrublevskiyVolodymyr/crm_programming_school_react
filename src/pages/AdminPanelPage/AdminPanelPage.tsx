import {FC} from 'react';
import {Managers} from "../../components";

interface IProps {

}

const AdminPanelPage: FC<IProps> = () => {
    return (
        <div>
            <Managers/>
        </div>
    );
};

export {AdminPanelPage};