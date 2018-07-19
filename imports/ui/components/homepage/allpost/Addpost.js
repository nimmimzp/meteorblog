import React, { Component } from 'react';

import {Tags} from '../../../../api/links/tags.js';
export default class Addpost extends Component{

	constructor(props) {
		
    super(props);
    //console.log(Tags.find({}).fetch())
    this.state = {}
  }
  
	addPost(event){
		event.preventDefault();
		let title = this.refs.title.value.trim();
		let description = this.refs.description.value.trim();
		let privacy = this.refs.privacy.value.trim();
		//console.log(this.refs.tags.value);
		if(title !== "" && description !== ""){
			Meteor.call('addPosts',title,description,privacy,(err,res)=>{
				if(err){
					Bert.alert( err.reason, 'danger', 'growl-top-right' );
				}else{
					Bert.alert( 'Post added successfully', 'success', 'growl-top-right' );
					this.refs.title.value = "";
					this.refs.description.value = "";
				}
			});
		}else{
			Bert.alert( 'Only blank spaces not allowed', 'danger', 'growl-top-right' );
		}
	}

	render() {
		return (
			<div>
				<form onSubmit={this.addPost.bind(this)}>
				  <div className="form-group">
				    <label htmlFor="exampleInputPassword1">Post Title</label>
				    <input type="text" ref="title" className="form-control" id="exampleInputPassword1" placeholder="Post Title" />
				  </div>
				  <div className="form-check">
				    <label className="form-check-label" htmlFor="exampleCheck1">Post Description</label>
				    <textarea className="form-control" ref="description" rows="4"></textarea>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleFormControlSelect1">Privacy</label>
				    <select ref="privacy" className="form-control" id="exampleFormControlSelect1">
				      <option value="1">Private</option>
				      <option value="0">Public</option>
				    </select>
				  </div>
				  <button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
		);
	}

	
}
