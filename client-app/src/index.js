import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router,Route,IndexRoute,browserHistory} from 'react-router';
import thunk from 'redux-thunk';
import {AUTH_USER} from './actions/types';

import App from './components/app';
import Welcome from './components/welcome';
import reducers from './reducers';

import Posts from './components/posts/posts';
import AuthCheck from './components/auth/auth_check';
import AddPost from './components/posts/add_post';
import PostsShow from './components/posts/posts_show';
import EditPost from './components/posts/edit_post';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

if(token){
  store.dispatch({type:AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
    <Router history ={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute  component={Welcome} />
        <Route path="posts" component ={Posts} />
        <Route path="post/add" component ={AddPost} />
        <Route path="posts/:id" component = {PostsShow} />
        <Route path="posts/:id/edit" component = {EditPost} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
