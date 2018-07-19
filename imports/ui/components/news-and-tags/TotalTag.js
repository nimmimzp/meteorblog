import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Tags} from '../../../api/links/tags.js';
import SingleTag from './SingleTag.js';
import App from './App.js';
export default class TotalTag extends TrackerReact(Component){
	constructor(){
		super();
		this.state = {
			allTags:{
				subscriptions:Meteor.subscribe("allTags")
			}
		}
	}
	render() {
		/*let maxmin = Tags.find({},{sort:{noOfPost:-1},limit:1}).fetch();
		console.log(maxmin)
		*/
		let allTags = Tags.find({noOfPost:{$gt:0}},{sort:{noOfPost:-1}}).fetch();
		if(!allTags && !maxmin){
			return <div>Loading...</div>
		}
	
		
		return (
			<div>
				<div className="col-md-4">
					<h2><a href="/viewtagcloud">Tags</a></h2>
				{
					allTags.map((res) => {
						
						return <SingleTag key={res._id} tagDetail={res} noOfPost={allTags[0].noOfPost} />
					}) 
				}
				</div>
			</div>
		);
	}
}
