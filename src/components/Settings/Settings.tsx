import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getSearchEngine, saveSearch } from '../../options';
import style from './Settings.css';

interface IProps {
    onClose: () => void;
}

const SettingsMenu: FunctionalComponent<IProps> = ({ onClose }) => {
    const [engine, setEngine] = useState(getSearchEngine());

    useEffect(() => {
        function escape(ev: KeyboardEvent) {
            if (ev.code === 'Escape') {
                onClose();
            }
        }

        window.addEventListener('keydown', escape);

        return () => window.removeEventListener('keydown', escape);
    }, []);

    function handleEngineChange(ev: any) {
        setEngine(ev.target.value);
        saveSearch(ev.target.value);
    }
    
    return (
        <div>
            <div onClick={onClose} className="overlay"></div>
            <div class={style.options}>
                <h2>Options</h2>
                <div class={style.option}>
                    <label>Search engine:</label>
                    <select value={engine} onChange={handleEngineChange}>
                        <option value="google">Google</option>
                        <option value="duckduckgo">DuckDuckGo</option>
                        <option value="bing">Bing</option>
                        <option value="yahoo">Yahoo</option>
                        <option value="qwant">Qwant</option>
                        <option value="swisscows">Swisscows</option>
                        <option value="searx">Searx BE</option>
                    </select>
                </div>

                <button onClick={onClose} class={style.close}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default SettingsMenu;