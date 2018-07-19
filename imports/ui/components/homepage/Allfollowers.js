import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
export default class Allfollowers extends TrackerReact(Component){

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
		if(this.refs.follow.checked){
			Meteor.call('userFollow',userId,(err,res)=>{
				if(err){
					Bert.alert( error.reason, 'danger', 'growl-top-right' );
				}else{
					Bert.alert( "You started following.", 'success', 'growl-top-right' );
				}
			});
		}else{
			Meteor.call('userUnfollow',userId,(err,res)=>{
				if(err){
					Bert.alert( error.reason, 'danger', 'growl-top-right' );
				}else{
					Bert.alert( "You unfollowed the user.", 'success', 'growl-top-right' );
				}
			});
		}
	}

	render() {
		let userDetail = Meteor.users.find({_id:this.props.userID}).fetch();
		let checke = false;
		let checked = Meteor.users.find({_id:this.props.userID ,followingIds:Meteor.userId()}).fetch();
		if(checked[0].followersIds){
			checked[0].followersIds.map((res) => {
				if(res == Meteor.userId()){
					checke = true;
				}
			})
		}
		return (
			<div>
				<div className="form-check">
					<input ref="follow" readOnly={true} checked={checke} type="checkbox" value={userDetail[0]._id} className="form-check-input" id={userDetail[0]._id} onClick={this.toggelChecked.bind(this)}/>
				  <label className="form-check-label"  htmlFor="exampleCheck1">{userDetail[0].profile.name}</label>
				</div>
			</div>
		);
	}
}
