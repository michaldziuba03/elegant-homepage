import { FunctionalComponent, h } from 'preact';
import style from './Author.css';

interface IProps {
    name?: string;
}

const PhotoAuthor: FunctionalComponent<IProps> = ({ name }) => {
    if (!name) {
        return null;
    }

    return (
        <div class={style.author}>
            Photo by {name}
        </div>
    );
};

export default PhotoAuthor;
