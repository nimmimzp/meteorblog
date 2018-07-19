import React, { Component } from 'react';
import Singleuser from './Singleuser.js';
import Allfollowers from './Allfollowers.js';
import Allfollowing from './Allfollowing.js';
import Addtags from './alltags/Addtags.js';
import Eachtags from './alltags/Eachtags.js';
import { withTracker } from 'meteor/react-meteor-data';
class Totalusers extends Component {

	constructor(){
		super();
		this.state = {
			allUser:{
				subscriptions:Meteor.subscribe("allUser")
			}
		}
	}
	render() {
		let followersIds = "";
		let followTotal = 0;
		let followingTotal = 0;
		if(this.props.allFollowers[0]){
			followersIds = (this.props.allFollowers[0].followersIds)
			followTotal = followersIds.length;
		}
		let followingIds = "";
		if(this.props.allFollowing[0]){
			followingIds = (this.props.allFollowing[0].followingIds);
			followingTotal = followingIds.length;
		}
		return(
			<div>
				<h3>Follow Users</h3>
				<ul>
					{
						this.props.userList.map((res) => {
							return <Singleuser key={res._id} userDetail={res} />
						})
					}
				</ul>
				<h3>Your Follower ({followTotal})</h3>
				<ul>
				{ followersIds ?
					followersIds.map((userId) =>{
						return <Allfollowers key={userId} userID={userId} />
					}) : "You don't have followers."
				}
				</ul>
				<h3>Following ({followingTotal})</h3>
				<ul>
				{ followingIds ?
					followingIds.map((userId) => {
						return <Allfollowing key={userId} userID={userId}/>
					}): "You did't follow anyone."
					
				}
				</ul>
				<h3>All Tags</h3>
				<Addtags />
				<Eachtags />
			</div>
			
		)
	}
}
export default withTracker((props) => {
	return {
		userList:Meteor.users.find({ _id: { $ne: Meteor.userId() },followersIds:{$nin:[ Meteor.userId() ]}} ).fetch(),
		allFollowers:Meteor.users.find({_id:Meteor.userId(),followersIds:{$exists: true}}).fetch(),
		allFollowing:Meteor.users.find({_id:Meteor.userId(),followingIds:{$exists: true}}).fetch(),
	}
})(Totalusers);
