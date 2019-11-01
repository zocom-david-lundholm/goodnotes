import '../styles/index.scss';
import {initUI} from './ui';
import {loadPersistedState} from './state';

loadPersistedState();
initUI();