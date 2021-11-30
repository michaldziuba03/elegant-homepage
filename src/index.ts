import './style/index.css';
import App from './components/app';

declare global {
    interface Window {
        contextMenuActive: boolean;
    }
}

export default App;
