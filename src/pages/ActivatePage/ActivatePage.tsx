import {FC} from 'react';

import {ActivateFormModal} from "../../components/ActivateFormModal/ActivateFormModal";
interface IProps {

}

const ActivatePage: FC<IProps> = () => {
    return (
        <div>
            <ActivateFormModal/>
        </div>
    );
};

export {ActivatePage};