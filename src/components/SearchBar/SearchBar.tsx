import { FunctionalComponent, h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { getSearchIcon, search, useBrowserEngine } from '../../options';
import CloseIcon from '../../icons/CloseIcon';
import style from './SearchBar.css';
import { searchWithDefaultEngine } from '../../extension';

const SearchBar: FunctionalComponent = () => {
    const [value, setValue] = useState("");
    const inputRef = useRef<any>();
    const [icon, setIcon] = useState<string | undefined>();
    
    async function getSearchFavicon() {
        const result = await getSearchIcon();
        setIcon(result);
    }

    useEffect(() => {
        getSearchFavicon();
    });

    function handleChange(e: any) {
        setValue(e.target.value);
    }

    function handleSubmit(e: any) {
        if (e.code === 'Enter' && value !== '') {
            if (useBrowserEngine()) {
                searchWithDefaultEngine(value);
                return;
            }

            const url = search(value);
            window.location.href = url;
        }
    }

    function clearInput() {
        setValue("");
        inputRef.current?.focus();
    }

    function preventDrag(e: any) {
        e.preventDefault();
    }

    return (
        <div class={style.searchbar}>
            <img 
                class={style.logo}
                src={icon}
                alt=''
                onDragStart={preventDrag}
                draggable={false}
            />
            <input 
                class={style.input}
                ref={inputRef}
                value={value}
                autofocus
                onInput={handleChange}
                onKeyPress={handleSubmit}
                placeholder='Search the web'
                type='text'
                autoComplete='false' 
                spellCheck={false}
                autocorrect='false'
            />
            { value !== "" && <button class={style.clear} onClick={clearInput}>
                <CloseIcon size='18' />
            </button> }
        </div>
    );
};

export default SearchBar;
