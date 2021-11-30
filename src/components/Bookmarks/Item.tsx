import { FunctionalComponent, h } from 'preact';
import AddBookmarkItem from '../AddBookmarkItem/AddBookmarkItem';
import BookmarkItem from '../BookmarkItem/BookmarkItem';

interface IProps {
    id: number;
    bookmark?: {
        title: string;
        url: string;
        favicon: string;
    };
    onCreate: (bookmark: any) => void;
    onUpdate: (bookmark: any) => void;
    onDelete: (id: number) => void;
}

const Item: FunctionalComponent<IProps> = (props) => {
    if (props.bookmark) {
        return <BookmarkItem 
            {...props.bookmark} 
            id={props.id}
            onDelete={props.onDelete}
            onUpdate={props.onUpdate}
        />
    }

    return <AddBookmarkItem id={props.id} onCreate={props.onCreate} />;
};

export default Item;
