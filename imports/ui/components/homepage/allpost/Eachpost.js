import React, { Component } from 'react';
import Singlepost from './Singlepost.js';
import { withTracker } from 'meteor/react-meteor-data';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Post } from '../../../../api/links/post.js';
export default class Eachpost extends TrackerReact(Component){

	constructor(){
		super();
		this.state = {
			allPost:{
				subscriptions:Meteor.subscribe("allPost")
			}
		}
	}

	render() {
		if(!this.props.followingIds){
			return (<div>Loading</div>);
		}
		let ids = [];
		let arr = this.props.followingIds;
		let len = this.props.followingIds.length;
		let postDetail;
		for(let i=0; i<len; i++ ){
			ids.push(arr[ i ]);
		}
		ids.push(Meteor.userId());
		Post.find( {$or:[{author: {$in: ["4R4EKS38iD22DjPa7"]}},{privacy:'0'}]})
		postDetail = Post.find( {$or:[{author: {$in: ids}},{privacy:'0'}]}).fetch();
		return (
			<div >
			<h2>All Post</h2>
				{
					postDetail.map((res) => {
						return <Singlepost key={res._id} postDetail={res} authorDetail={Meteor.users.find({_id:res.author}).fetch()} />
					}) 
				}		
			</div>
		);
	}
}
