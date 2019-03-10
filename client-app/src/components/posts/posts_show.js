import React, { Component, PropTypes } from 'react';
import * as thunkMiddleware from 'redux-thunk';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {Link} from 'react-router';

class PostsShow extends Component{
    static contextTypes= {
        router:PropTypes.object
    }

    componentWillMount(){
    this.props.PostShow(this.props.params.id);
    }

    handleDeleteClick(){
        this.props.deletePost(this.props.params.id);
             this.context.router.push('/posts');
        }

    handleDeletePost() {
                return (                
       <button onClick={this.handleDeleteClick.bind(this)} className="btn btn-danger pull-xs-right">Delete</button>
                );
    }

    renderPost(post){
        if (post){
            return (
                <div>
                <a href={"http://localhost:8181/api/charles_uploads/"+post.id+"/download"}
                    target="_blank">
                    <strong>{post.label_file_name} </strong>
                </a>
                {this.handleDeletePost()}
                <p>Created at: {post.created_at} UTC</p>
                <p>Created at: {post.updated_at} UTC</p>
                </div>
                   );
        }
    }
    render(){
        const {post,loading,error} = this.props.activePost;
        if(loading == true){
            return <div className="loader"></div>;
        }
        return (
            <div>
            {this.renderPost(post)}
            </div>
               );
    }
}
function mapStateToProps(state){
    return {
        activePost:state.posts.activePost,
        authenticated:state.auth.authenticated
    }
}

export default connect(mapStateToProps,actions)(PostsShow);
