import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Tags} from '../../../../api/links/tags.js';
import Singletag from './Singletag.js';
export default class Eachtags extends TrackerReact(Component){

	constructor(){
		super();
		this.state = {
			allTags:{
				subscriptions:Meteor.subscribe("allTags")
			}
		}
	}

	render() {
		let allTags = Tags.find({}).fetch();
		if(!allTags){
			return <div>No tags</div>
		}
		return (
			<div>
				<ul>
				{
					allTags.map((res)=>{
						/*console.log(res);*/
						return <Singletag key={res._id}  tagsDetail={res} />
					})
				}	
				</ul>	
			</div>
		);
	}
}
