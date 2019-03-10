import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';

import {Link} from 'react-router';
class Header extends Component {



  renderLinks(){

      return[
      <li className="nav-item pull-xs-left" key={1}>
      <Link className="nav-item nav-link" to="/post/add">Upload New File</Link>
      </li>,
      ];

  }

  render (){
      console.log(this.props.userinfo);
        return (
              <nav className="navbar navbar-light bg-faded">
               <Link to="/" className="navbar-brand">charles_03-11-2019</Link>
               <ul className="nav navbar-nav">
                  {this.renderLinks()}
               </ul>
              </nav>
        )

  }


}
function mapStateToProps(state){
   return {
     authenticated:state.auth.authenticated,
     userinfo:''
   };
}

export default connect(mapStateToProps)(Header)
