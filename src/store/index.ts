import { createStore, compose } from 'redux';
import reducer from '../reducers';

// Используем compose для подключения Redux DevTools
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers()
);

export default store;
