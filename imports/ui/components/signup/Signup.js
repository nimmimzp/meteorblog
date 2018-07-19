import React, { Component, PropTypes, findDOMNode } from 'react';

export default class Signup extends Component {
	
	signup(event){
		event.preventDefault();
  	let useremail = this.refs.emailOfUser.value.trim();
  	let password = this.refs.passwordForUser.value.trim();
  	let name = this.refs.nameOfUser.value.trim();
  	if(name == "" || useremail == "" || password == "" ){
   		Bert.alert("Blanks space not allowed","danger",'growl-top-right');
   		return false;
   	}else{
   		Accounts.createUser({
        email: useremail,
        password,
        createdAt: new Date(),
        profile:{
        					name
        				}
      },(e, id)=>{
      	if(e){
      		Bert.alert(e.reason,"danger",'growl-top-right');
      		
      	}else{
      		Bert.alert("Accounct Created.","success",'growl-top-right');
      		FlowRouter.go('/');
      	}
      });
   	}
	}
	
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="col-md-6">
							<form className="login" onSubmit={this.signup.bind(this)} >
								<h1>Signup</h1>
								<div className="form-group">
							    <label htmlFor="exampleInputEmail1">Name</label>
							    <input type="text" className="form-control" ref="nameOfUser"	placeholder="Name" />
							  </div>
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
							  <a href="/">Login Here</a>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
