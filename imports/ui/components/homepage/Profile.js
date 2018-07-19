import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
export default class Profile extends TrackerReact(Component){
	constructor(){
		super();
		this.state = {
			currentUser:{
				subscriptions:Meteor.subscribe("currentUser")
			}
		}
	}

	logout(event){
		event.preventDefault();
		Meteor.logout((err,res)=>{
			FlowRouter.go('/');
		});
	}

	currentlogin(){
		return Meteor.user();
	}
	render() {
		let user = this.currentlogin();
		if(!user){
			return (<div>Loading....</div>);
		}
		return (
			<div>
				
				<div className="form-group">
			    <label htmlFor="exampleInputEmail1">{user.profile.name}</label>
			    
			  </div>
			  <div className="form-group">
			  	<a href="/profile" className="btn btn-primary">Profile</a>
			  </div>
			  <button type="submit" className="btn btn-primary" onClick={this.logout.bind(this)}>Logout</button>
			</div>
		)
	}
}
