import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { getWebsiteIcon } from '../../options';
import EditModal, { IEditBookmark } from '../BookmarkItem/EditModal';
import ContextMenu from '../ContextMenu/ContextMenu';
import style from './BookmarkItem.css';

interface IProps {
    title: string;
    url: string;
    favicon: string;
    id: number;
    onUpdate: (bookmark: any) => void;
    onDelete: (id: number) => void;
}

const BookmarkItem: FunctionalComponent<IProps> = ({ id, title, favicon, url, onDelete, onUpdate }) => {
    const [icon, setIcon] = useState(favicon);
    const [contextPoint, setContextPoint] = useState({ x: 0, y: 0 });
    const [showContext, setShowContext] = useState(false);
    const [showModal, setModal] = useState(false);

    const options = [
        { label: 'Open', action: handleClick },
        { label: 'Edit', action: setEditState },
        { label: 'Delete', action: deleteBookmark },
    ]

    function fallbackImage() {
        setIcon('assets/websites/generic.png');
    }

    function setEditState() {
        setModal(true);
    }

    function deleteBookmark() {
        onDelete(id);
    }

    function handleContextMenu(e: any) {
        e.preventDefault();
        if (window.contextMenuActive) return;
        setContextPoint({ x: e.pageX, y: e.pageY });
        setShowContext(true);
    }

    function handleCloseContextMenu() {
        setShowContext(false);
    }

    function preventDrag(e: any) {
        e.preventDefault();
    }

    function handleClick() {
        window.location.href = url;
    }

    function closeModal() {
        setModal(false);
    }

    function updateBookmark(newBookmark: IEditBookmark) {
        const bookmark = {
            id,
            url: newBookmark.url,
            title: newBookmark.name,
            favicon: getWebsiteIcon(newBookmark.url),
        }

        setIcon(bookmark.favicon);
        onUpdate(bookmark);
    }

    return (
        <Fragment>
            { showModal && <EditModal formData={{ name: title, url }} onUpdate={updateBookmark} onClose={closeModal} />}
            { showContext && <ContextMenu position={contextPoint} options={options} onClose={handleCloseContextMenu} /> }
            <div 
                onClick={handleClick}
                onContextMenu={handleContextMenu}
                class={style.container}
                style={{ textAlign: 'center', zIndex: 10, paddingBottom: '16px' }}>
                <div class={style.bookmark}>
                    <img
                        class={style.icon} 
                        draggable={false}
                        onError={fallbackImage}
                        onDragStart={preventDrag}
                        src={icon}
                        alt="favicon"
                    />
                </div>
                <span class={style.name}>{ title }</span>
            </div>
        </Fragment>
    );
};

export default BookmarkItem;
