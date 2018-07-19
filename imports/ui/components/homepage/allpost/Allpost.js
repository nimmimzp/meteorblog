import React, { Component } from 'react';
import Addpost from './Addpost.js';
import Eachpost from './Eachpost.js';
import {Tags} from '../../../../api/links/tags.js';
import { withTracker } from 'meteor/react-meteor-data';
class Allpost extends Component{

	constructor(){
		super();
		this.state = {
			allUser:{
				subscriptions:Meteor.subscribe("allTags")
			}
		}
	}

	render() {
		if(!Tags.find({}).fetch()){
			return <div>Loading</div>
		}
		
		let userFollowing = "";
		if(this.props.userList[0]) {
			userFollowing = this.props.userList[0].followingIds;
		}
		return (
			<div>
				<Addpost tags={Tags.find({}).fetch()} />
				<Eachpost followingIds={userFollowing} />}
			</div>
		);
	}
}
export default withTracker((props) => {
	return {
		userList:Meteor.users.find({ _id: Meteor.userId(),followingIds:{$exists: true} }).fetch(),
	}
})(Allpost);
