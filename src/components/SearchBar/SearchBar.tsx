import { FunctionalComponent, h } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { getSearchIcon, search } from '../../options';
import CloseIcon from '../../icons/CloseIcon';
import style from './SearchBar.css';

const SearchBar: FunctionalComponent = () => {
    const [value, setValue] = useState("");
    const inputRef = useRef<any>();
    const icon = getSearchIcon();

    function handleChange(e: any) {
        setValue(e.target.value);
    }

    function handleSubmit(e: any) {
        if (e.code === 'Enter' && value !== '') {
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
