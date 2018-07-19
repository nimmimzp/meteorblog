import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'

export default class Login extends Component{

	loginuser(event){
		event.preventDefault();
  	let useremail = this.refs.emailOfUser.value;
  	let password = this.refs.passwordForUser.value;
  	Meteor.loginWithPassword(useremail, password,(error,data)=>{
  		if(error){
  			Bert.alert( error.reason, 'danger', 'growl-top-right' );
		  }else{
		  	FlowRouter.go('/homepage');
		  }
  	});
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="col-md-6">
							<form className="login" onSubmit={this.loginuser.bind(this)}>
								<h1>Login</h1>
							  <div className="form-group">
							    <label htmlFor="exampleInputEmail1">Email address</label>
							    <input type="email" className="form-control" ref="emailOfUser"	placeholder="e-Mail" />
							    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
							  </div>
							  <div className="form-group">
							    <label htmlFor="exampleInputPassword1">Password</label>
							    <input type="password" className="form-control" ref="passwordForUser"	placeholder="Password" />
							  </div>
							  <button type="submit" className="btn btn-primary">Submit</button>
							  <a href="/signup">Don't have account? Signup Here</a>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
