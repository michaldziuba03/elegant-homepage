import { FunctionalComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';
import style from './ContextMenu.css';

interface IOption {
    label: string;
    action: () => void;
}

interface IProps {
    options: IOption[];
    onClose: () => void;
    position: { x: number; y: number };
}

const MenuOption: FunctionalComponent<IOption> = ({ label, action }) => {
    return (
        <div onClick={action} class={style.option}>
            <span> {label} </span>
        </div>
    )
}

const ContextMenu: FunctionalComponent<IProps> = ({ options, onClose, position }) => {
    const { x, y } = position;
    
    function hideContextMenu(e: Event) {
        e.preventDefault();
    }

    useEffect(() => {
        window.contextMenuActive = true;
        window.addEventListener('click', onClose);
        window.addEventListener('contextmenu', hideContextMenu);

        return () => { 
            window.contextMenuActive = false;
            window.removeEventListener('click', onClose);
            window.removeEventListener('contextmenu', hideContextMenu);
        };
    })

    return (
        <div class={style.menu} style={{ top: y, left: x }}>
            { options.map(option => <MenuOption label={option.label} action={option.action} />) }
        </div>
    );
};

export default ContextMenu;
