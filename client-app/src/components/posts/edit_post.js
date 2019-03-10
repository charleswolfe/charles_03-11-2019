import React, { Component, PropTypes } from 'react';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {initialize} from 'redux-form';

class EditPost extends Component {
    static contextTypes = {
        router:PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        }
        this.handleselectedFile = this.handleselectedFile.bind(this);
    }


    componentWillMount(){
        this.props.EditPost(this.props.params.id);
    }


    handleFormSubmit(formProps){
        const formData = new FormData();
        formData.append('file', this.state.selectedFile, this.state.selectedFile.name)
        this.props.updatePost(this.props.params.id, formData);
        if (this.props.updatePostStatus.post == true){
            this.context.router.push('/posts');
        }
    }

    handleselectedFile(event) {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    render(){
      const {handleSubmit,fields:{file}} = this.props;
        if(!this.props.edit){
            return <div className="loader"></div>;
        }
        return (
            <div>
          <div className="row">
          <div className="col-md-12">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                  <label>File:</label>
                  <input {...file} type="file"  onChange={this.handleselectedFile} className="form-control" value={null} />
                  {file.touched && file.error && <div className="text-danger">{file.error}</div>}
                  </fieldset>

                 <button className="btn btn-success">Update</button>
                </form>

          </div>
          </div>
            </div>
               );
    }

    }

function mapStateToProps(state) {
    return {
        edit:state.posts.editPost,
        initialValues: state.posts.editPost.post,
        updatePostStatus: state.posts.updatePost
    }
}
export default reduxForm({
form:'edit',
fields:['file'],
},mapStateToProps,actions)(EditPost);
