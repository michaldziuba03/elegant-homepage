import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getBookmarks, saveBookmarks } from '../../options';
import Item from './Item';
import style from './Bookmarks.css';

const Bookmarks: FunctionalComponent = () => {
    let startId = 0;
    const [bookmarks, setBookmarks] = useState<any[]>(getBookmarks());

    useEffect(() => {
        window.addEventListener('storage', readBookmarksFromStorage);

        return () => window.removeEventListener('storage', readBookmarksFromStorage);
    }, []);

    function readBookmarksFromStorage() {
        setBookmarks(getBookmarks());
    }

    function handleDeleteBookmark(id: number) {
        setBookmarks(_bookmarks => {
            const newBookmarks = _bookmarks.map(item => {
                if (!item) return item;
                if (item.id !== id) return item;

                return null;
            });

            saveBookmarks(newBookmarks);
            return newBookmarks;
        });
    }

    function handleUpdateBookmark(bookmark: any) {
        setBookmarks(_bookmarks => {
            const newBookmarks = _bookmarks.map(item => {
                if (!item) return item;
                if (item.id === bookmark.id) return bookmark;

                return item;
            });

            saveBookmarks(newBookmarks);
            return newBookmarks;
        });
    }

    function handleNewBookmark(bookmark: any) {
        setBookmarks(_bookmarks => {
            _bookmarks[bookmark.id-1] = bookmark;
            saveBookmarks(_bookmarks);
            return Array.from(_bookmarks);
        });
    }

    return (
        <div class={style.bookmarks}>
    
            { bookmarks.map(bookmark => {
            startId += 1;
            return <Item 
                id={startId} 
                bookmark={bookmark} 
                onCreate={handleNewBookmark}
                onUpdate={handleUpdateBookmark}
                onDelete={handleDeleteBookmark}
            />}) }
        </div>
    );
};

export default Bookmarks;
