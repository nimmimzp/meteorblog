
import React, { Component } from 'react';
export default class ResolutionsForm extends Component{
	addTags(event){
		event.preventDefault();
		let text = this.refs.tags.value;
		if(text){
			Meteor.call('addTags',text,(error,data)=>{
				if(error){
					Bert.alert(error.error,"danger","growl-top-right");
				}else{
					Bert.alert("Tag added.","success","growl-top-right");
					this.refs.tags.value = "";
				}
			});
		}	
	}
	render(){
		return(
			<form className="my-resolutions" onSubmit={this.addTags.bind(this)}>
				<input 
					type="text"
					ref="tags"
					placeholder="Add new tags" />
			</form>
		)
	}
}
