import React,{Component} from 'react';
import {connect} from 'react-redux';
import {addPost} from  '../../actions/index';
import {reduxForm} from 'redux-form';
import {browserHistory} from 'react-router';

class AddPost extends Component {
    static contextTypes = {
        router:React.PropTypes.object
};
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleselectedFile = this.handleselectedFile.bind(this);
    }


    handleFormSubmit(formProps){
        const formData = new FormData();
        formData.append('file', this.state.selectedFile, this.state.selectedFile.name);
        this.props.addPost(formData);
        this.context.router.push('/posts');
    }

    handleselectedFile(event) {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    render(){
      const {handleSubmit,fields:{file}} = this.props;
        return (
          <div className="row">
          <div className="col-md-12">
                <div>
                <fieldset className="form-group">
                  <label>File:</label>
                  <input {...file} type="file" onChange={this.handleselectedFile} className="form-control" value={null} />
                  {file.touched && file.error && <div className="text-danger">{file.error}</div>}
                  </fieldset>

                 <button className="btn btn-success" onClick={this.handleFormSubmit}>Add</button>
                </div>
          </div>
          </div>
        );

    }

}

function validate(formProps){
const errors = {};
if(! formProps.title){
 errors.title = "Title is required";   
}
if(! formProps.body){
    errors.body = "Body is required";
}
return errors;
}

function mapStateToProps(state){
  return {
    posts:state.post
  }
}

export default reduxForm({
form:'post',
fields:['file'],
validate:validate,
},mapStateToProps,{addPost})(AddPost);
