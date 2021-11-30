import { FunctionalComponent, h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { getWebsiteIcon } from '../../options';
import AddModal from '../AddBookmarkItem/AddModal';
import style from './AddBookmarkItem.css';

interface IProps {
    id: number;
    onCreate: (bookmark: any) => void;
}

const AddBookmarkItem: FunctionalComponent<IProps> = ({ id, onCreate }) => {
    const [showModal, setModal] = useState(false);

    function addBookmark({ url, name }: any) {
        const favicon = getWebsiteIcon(url);
        const bookmark = {
            id,
            url,
            title: name,
            favicon
        }

        setModal(false);
        onCreate(bookmark);
    }

    function handleClick() {
        setModal(true);
    }

    function handleContextMenu(e: any) {
        e.preventDefault();
    }

    function closeModal() {
        setModal(false);
    }

    return (
        <Fragment>
            { showModal && <AddModal onCreate={addBookmark} onClose={closeModal}> </AddModal>}
            <div 
                onClick={handleClick}
                onContextMenu={handleContextMenu}
                style={{ textAlign: 'center', zIndex: 10, paddingBottom: '16px' }}
            >
                <div class={style.bookmark}>
                    <h1>+</h1>
                </div>
            </div>
        </Fragment>
    );
};

export default AddBookmarkItem;
