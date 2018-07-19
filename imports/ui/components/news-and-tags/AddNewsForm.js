import React, { Component } from 'react';
import swal from 'sweetalert';
export default class AddNewsForm extends Component{
	constructor(props) {
		
    super(props);
    //console.log(Tags.find({}).fetch())
    this.state = {}
  }
  
	addPost(event){
		event.preventDefault();
		let title = this.refs.title.value.replace(/\s/g,'');
		let description = this.refs.description.value.trim();
		let tags = (this.refs.tags.value.trim()).toLowerCase();
		tags = tags.replace(/\s/g,'');
		let tags_array = tags.split(',');
		let duplicate = 0;
		let new_arry = [];
		if(tags_array.length>1){
			for(let i=0; i<tags_array.length; i++){
				if(i && new_arry.includes(tags_array[i])){
					//console.log(i);
					duplicate = 1;
					break;
				}
				new_arry.push(tags_array[i]);
								
			}	
		}

		if(duplicate != 1 ){
			if(title !== "" && description !== "" && tags !== ""){
				for(let i=0; i<new_arry.length; i++){
					if(tags_array[i]!==""){
						Meteor.call("addNewsTag",new_arry[i],(err,res)=>{});
					}
					
				}
				Meteor.call('addPosts',title,description,new_arry,	(err,res)=>{
					if(err){
						Bert.alert( err.reason, 'danger', 'growl-top-right' );
					}else{
						
						swal("Great!", "New added successfully.", "success");
						this.refs.title.value = "";
						this.refs.description.value = "";
						this.refs.tags.value = "";
					}
				}); 
			}else{
				swal("Oops!", "All field required.", "error");
			}
		}else{
			swal("Oops!", "Some tags are duplicate", "error");
			
		}
	}

	render() {
		return (
			<div>
				<h3>Add News</h3>
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
				    <label htmlFor="exampleInputPassword1">Post Tags</label>
				    <input type="text" ref="tags" className="form-control" id="exampleInputPassword1" placeholder="News tags" />
				  </div>
				  <button type="submit" className="btn btn-primary">Submit</button>
				</form>
				</div>
			
		);
	}
}
