import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Post} from '../../../api/links/post.js';
import SingleNews from './SingleNews.js';
export default class News extends TrackerReact(Component){
	constructor(){
		super();
		this.state = {
			allPost:{
				subscriptions:Meteor.subscribe("allPost")
			}
		}
	}
	render() {
		let allnews = Post.find({tags:{"$exists":true}}).fetch();
		if(!allnews){
			return <div>Loading</div>
		}	
		return (
			<div >
				{
					allnews.map((res) => {
						return <SingleNews key={res._id} postDetail={res}  />
					}) 
				}
			</div>

		);
	}
}
