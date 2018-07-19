import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Profile from './Profile.js';
import Totalusers from './Totalusers.js';
import Allpost from './allpost/Allpost.js';
export default class Homepage extends TrackerReact(Component){
	
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="col-md-3">
							<h3>Hello</h3>
							<Profile />
						</div>
						<div className="col-md-6">
							<Allpost />
						</div>
						<div className="col-md-3">
							<Totalusers />
						</div>
				</div>
				</div>
			</div>
		)
	}
}
