import { FunctionalComponent, h } from 'preact';
import style from './Button.css';

interface IProps {
    onClick?: (...args: any) => void;
    primary?: boolean; 
}

const Button: FunctionalComponent<IProps> = ({ children, primary, onClick }) => {
    return (
        <button 
            class={primary ? style.primary : style.secondary}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button;