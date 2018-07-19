import React, { Component } from 'react';


export default class EditModal extends Component{
	constructor(){
		super();
		this.state = {
			title: "",
      description: "",
      tags:""
		}
	}
	handleChangeTitle(event){
		this.setState({
  		title: event.target.value,
  	});
	}

	handleChangeDescription(event){
		this.setState({
  		description: event.target.value,
  	});
	}

	handleChangeTag(event){
		this.setState({
  		tags: event.target.value,
  	});
	}

	componentDidMount() {
  	this.setState({
  		title: this.props.currentDetail.title,
  		description: this.props.currentDetail.description,
  		tags: this.props.currentDetail.tags.join()
  	});

	} 
	/*componentWillUnmount(){
		this.setState({
  		title: "",
  		description: "",
  		tags: ""
  	});
	}*/
	updatePost(event){
		event.preventDefault();
		let title = this.refs.title.value.trim();
		let description = this.refs.description.value.trim();
		let tags = (this.refs.tags.value.trim()).toLowerCase();
		let id = this.props.currentDetail._id;
		tags = tags.replace(/\s/g,'');
		let duplicate = 0;
		let old_tags = this.props.currentDetail.tags;
		let tags_array = tags.split(',');
		let old_index = -1;
		let new_arr = [];
		if(title !== "" && description !== "" && tags !== ""){
			if(tags_array.length>1){
				for(let i=0; i<tags_array.length; i++){
					for(let j=i+1; j <= tags_array.length-i-1; j++ ){
						if(tags_array[i] == tags_array[j]){
							duplicate = 1;
						}
					}				
				}
			}
		
			for(let i = 0; i<old_tags.length; i++){
				for(let j=0; j<tags_array.length; j++){
					//condition that checks any tag deleted or not
					/*
						First condition checks that if any index of new tags array matches the old one then break the loop;
					*/
					if(old_tags[i]==tags_array[j]){
						new_arr.push(tags_array[j]);
						break;
					}
					//second condition check that if old tag array does not match any of new tags and if the element is last element of the new array, tag were delete.
					
					if(old_tags[i]!= tags_array[j] && j==tags_array.length-1){
						let inc = -1;
						Meteor.call('updateTag',old_tags[i],inc,(err,res)=>{});
					}
				}
			}
			if(duplicate != 1 ){
				//console.log(new_arr.length,tags_array.length)
				if(new_arr.length!=tags_array.length && new_arr.length>0){
					for(let i=0; i<tags_array.length;i++){
						if(!new_arr.includes(tags_array[i])){	
							if(tags_array[i]==""){
								let inc = 1;
								Meteor.call('updateTag',tags_array[i],inc,(err,res)=>{});
							}
						}
					}
				}
				Meteor.call('updatePost',title,description,id,tags_array,(err,success)=>{
					if(err){
						swal(err.reason, 'danger', 'success' );
					}else{
						swal("Great!", "New updated successfully.", "success");
					}
				});
			}else{
				swal("Oops!", "Some tags are duplicate", "error");	
			}
		}else{
			sswal("Oops!", "All fields are required.", "error");
		}
	}

	render() {
		return (
			<div>
				<h3>Edit News</h3>
				<form onSubmit={this.updatePost.bind(this)}>
				  <div className="form-group">
				    <label htmlFor="exampleInputPassword1">Post Title</label>
				    <input type="text" ref="title" onChange={this.handleChangeTitle.bind(this)} value={this.state.title} className="form-control" id="exampleInputPassword1" placeholder="Post Title"  />
				  </div>
				  <div className="form-check">
				    <label className="form-check-label" htmlFor="exampleCheck1">Post Description</label>
				    <textarea className="form-control" ref="description"  onChange={this.handleChangeDescription.bind(this)} value={this.state.description} rows="4"></textarea>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputPassword1">Post Tags</label>
				    <input type="text" ref="tags" onChange={this.handleChangeTag.bind(this)} value={this.state.tags} className="form-control" id="exampleInputPassword1" placeholder="News tags" />
				  </div>
				  <button type="submit" className="btn btn-primary">Submit</button>
				</form>
				</div>
		);
	}
}
