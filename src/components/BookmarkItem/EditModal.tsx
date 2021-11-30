import { Fragment, FunctionComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import Modal from '../Modal/Modal';

interface IProps {
    onClose: () => void;
    onUpdate: (bookmark: IEditBookmark) => void;
    formData: {
        name: string;
        url: string;
    }
}

export interface IEditBookmark {
    url: string;
    name: string;
}

const EditModal: FunctionComponent<IProps> = ({ onClose, onUpdate, formData }) => {
    const [form, setForm] = useState(formData);

    function handleInput(e: any) {
        const value = e.target.value;
        const name = e.target.name;
        setForm(oldForm => ({ ...oldForm, [name]: value }));
    }
    
    function handleSubmit() {
        onUpdate(form);
    }

    return (
        <Modal
            onClose={onClose}> 
            <Fragment>
                <h3>Edit bookmark</h3>
                <div className='column'>
                    <input 
                        name="name" 
                        value={form.name} 
                        placeholder='Name' 
                        onChange={handleInput} 
                    />
                </div>

                <div className='column'>
                    <input 
                        name="url" 
                        value={form.url} 
                        placeholder='URL' 
                        onChange={handleInput} 
                    />
                </div>

                <div className='column'>
                    <button onClick={onClose}>Close</button>
                    <button onClick={handleSubmit}>Add</button>
                </div>
            </Fragment>
        </Modal>
    )
}

export default EditModal;