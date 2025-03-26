import { withProviders } from './providers/index.js';
import { MainPage } from '../pages/main/index.js';

const App = () => <MainPage />;

export default withProviders(App);
