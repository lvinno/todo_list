import { createStore } from 'redux';
import TodoList from '../reducer/TodoList';

let Store = createStore(TodoList,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default Store;

