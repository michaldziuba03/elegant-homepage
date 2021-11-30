import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';
import style from './Modal.css';

interface IProps {
    onClose: () => void;
}

const Modal: FunctionalComponent<IProps> = ({ onClose, children }) => {
    function escape(ev: KeyboardEvent) {
        if (ev.code === 'Escape') {
            onClose();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', escape);

        return () => { 
            window.removeEventListener('keydown', escape); 
        };
    });

    return (
        <Fragment>
            <div class={style.modal}>
                {children}
            </div>

            <div onClick={onClose} className='overlay'>
            </div>
        </Fragment>

    )
};

export default Modal;
