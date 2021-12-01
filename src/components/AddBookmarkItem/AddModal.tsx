import { Fragment, FunctionComponent, h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import Modal from '../Modal/Modal';

interface IProps {
    onClose: () => void;
    onCreate: (bookmark: IEditBookmark) => void;
}

export interface IEditBookmark {
    url: string;
    name: string;
}

const AddModal: FunctionComponent<IProps> = ({ onClose, onCreate }) => {
    const inputRef = useRef<any>();
    const [form, setForm] = useState({
        name: '',
        url: '',
    });

    useEffect(() => {
        if (!inputRef.current) return;
        inputRef.current.focus();
    }, []);

    function handleInput(e: any) {
        const value = e.target.value;
        const name = e.target.name;
        setForm(oldForm => ({ ...oldForm, [name]: value }));
    }
    
    function handleSubmit() {
        onCreate(form);
    }

    return (
        <Modal onClose={onClose}>
            <Fragment>
                <h3>Add bookmark</h3>
                <div className='column'>
                    <input name="name" placeholder='Name' onChange={handleInput} />
                </div>

                <div className='column'>
                    <input autofocus ref={inputRef} name="url" placeholder='URL' onChange={handleInput} />
                </div>

                <div className='column'>
                    <button onClick={onClose}>Close</button>
                    <button onClick={handleSubmit}>Add</button>
                </div>
                
            </Fragment>
        </Modal>
    )
}

export default AddModal;