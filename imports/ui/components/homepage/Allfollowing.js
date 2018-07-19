import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
export default class Allfollowing extends TrackerReact(Component){
	

	constructor(){
		super();
		this.state = {
			allUser:{
				subscriptions:Meteor.subscribe("allUser")
			}
		}
	}

	toggelChecked(event){
		let userId = this.refs.follow.value;
		Meteor.call('userUnfollow',userId,(err,res)=>{
			if(err){
				Bert.alert( error.reason, 'danger', 'growl-top-right' );
			}else{
				Bert.alert( "You unfollowed the user.", 'success', 'growl-top-right' );
			}
		});
	}

	render() {
		let userDetail = Meteor.users.find({_id:this.props.userID}).fetch();
		return (
			<div>
				<div className="">
					<input 
						ref="follow"
						type="checkbox"
						readOnly={true}
						checked={true}
						value={userDetail[0]._id}
						className="form-check-input"
						onClick={this.toggelChecked.bind(this)}
					/>
					<label className="form-check-label"  htmlFor="exampleCheck1">{userDetail[0].profile.name}</label>
				</div>
			</div>
		);
	}
}
