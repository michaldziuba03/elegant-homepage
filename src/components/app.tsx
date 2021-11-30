import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import SettingsIcon from '../icons/SettingsIcon';
import { getBackground } from '../options';
import PhotoAuthor from './Author/Author';
import Bookmarks from './Bookmarks/Bookmarks';
import SearchBar from './SearchBar/SearchBar';
import SettingsMenu from './Settings/Settings';

const App: FunctionalComponent = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [author, setAuthor] = useState<string>();
    useEffect(() => {
        const { url, author } = getBackground();
        setAuthor(author);
        document.body.style.backgroundImage = `url('${url}')`;
    }, []);

    function closeMenu() {
        setShowMenu(false)
    }

    function openMenu() {
        setShowMenu(true);
    }

    return (
        <div id="root">
            <div className='darken'></div>
            <SearchBar />
            <Bookmarks />
            <PhotoAuthor name={author} />
            { showMenu && <SettingsMenu onClose={closeMenu} /> }
            <div onClick={openMenu} className='settings'>
                <SettingsIcon size='24px' />
            </div>
        </div>
    );
};

export default App;
