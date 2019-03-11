import axios from 'axios';
import jwtdecode from 'jwt-decode';
import {browserHistory} from 'react-router';
import cookie from 'react-cookies'
import {AUTH_USER,AUTH_ERROR,LOGOUT_USER,FETCH_POST,ADD_POST,POST_SHOW,DELETE_POST,EDIT_POST,
    UPDATE_POST,FETCH_POST_SUCCESS,EDIT_POST_SUCCESS,POST_SHOW_SUCCESS,UPDATE_POST_SUCCESS,
USER_INFO_SUCCESS,USER_INFO} from './types';

const ROOT_URL = 'http://localhost:8181';

export function addPost(formData){
    console.log(cookie.load('XSRF-TOKEN'));
  return function(dispatch){
    axios.post(`${ROOT_URL}/api/charles_uploads`, formData,
      {
      headers:{'X-XSRF-TOKEN': cookie.load('XSRF-TOKEN')}
    })
    .then(response => {
      dispatch({
        type:ADD_POST,
        payload:response
      })
    })
  }
}

export function fetchPost(){
    return dispatch => {
     dispatch({type:FETCH_POST});
      axios.get(`${ROOT_URL}/api/charles_uploads`,{
       headers: { authorization: localStorage.getItem('token') }
      })
        .then(response =>{
            dispatch(fetchPostSuccess(response));
        })
    }
}

export function fetchPostSuccess(posts){
    return {
        type:FETCH_POST_SUCCESS,
        payload:posts
    };
}


export function PostShow(id){
    return dispatch =>{
     dispatch({type:POST_SHOW});
      axios.get(`${ROOT_URL}/api/charles_uploads/${id}`,{
       headers: { authorization: localStorage.getItem('token') }
      })
        .then(response =>{
            dispatch(postShowSuccess(response));
        })

    }
}

export function postShowSuccess(post){
    return {
        type:POST_SHOW_SUCCESS,
        payload:post
    };
}

export function EditPost(id){
    return dispatch =>{
        dispatch({type:EDIT_POST});  
      axios.get(`${ROOT_URL}/api/charles_uploads/${id}`,{
       headers: { authorization: localStorage.getItem('token') }
      })
        .then(response =>{
            dispatch(editPostSuccess(response))
        })
    }
}
export function editPostSuccess(posts){
    return {
        type:EDIT_POST_SUCCESS,
        payload:posts  
    };
}

export function updatePost(id, formData){
      return dispatch => {
        dispatch({type:UPDATE_POST});
        axios.post(`${ROOT_URL}/api/charles_uploads/${id}/replace`, formData,
          {
          headers:{'X-XSRF-TOKEN': cookie.load('XSRF-TOKEN')}
        })
        .then(response => {
            dispatch(updatePostSuccess(response));
      });
    }
}

export function updatePostSuccess(post){
    return {
        type:UPDATE_POST_SUCCESS,
        response:post
    }
}




export function deletePost(id){
    return function(dispatch) {
      axios.delete(`${ROOT_URL}/api/charles_uploads/${id}`,{
       headers: {'X-XSRF-TOKEN': cookie.load('XSRF-TOKEN')}
      })
        .then(response =>{
            dispatch({
              type:DELETE_POST,
              payload:response
            });
        })

    }
}

export function authError(error){
    return {
      type:AUTH_ERROR,
      payload:error
    }
}


