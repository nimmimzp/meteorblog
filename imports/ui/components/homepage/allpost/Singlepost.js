import React, { Component } from 'react';

export default class Singlepost extends Component{

	like(){
		let postId = this.refs.likeButton.value;
		let buttonText = this.refs.likeButton.innerText;
		if(this.props.authorDetail[0]._id == Meteor.userId()){
			Bert.alert( "You can't like this post because you are author.", 'danger', 'growl-top-right' );
		}else{
			Meteor.call("likedButton", postId,buttonText);
		}
	}
	unlike(){
		let postId = this.refs.unlikeButton.value;
		let buttonText = this.refs.unlikeButton.innerText;
		if(this.props.authorDetail[0]._id == Meteor.userId()){
			Bert.alert( "You can't dislike this post because you are author.", 'danger', 'growl-top-right' );
		}else{
			Meteor.call("unlikePost",postId,buttonText);
		}
	}

	render() {
		if(!this.props.postDetail){
			return (<div>No Post</div>)
		}
		let button = "";
		let button1 = false;
		let button2 = false;
		if(this.props.authorDetail[0]._id == Meteor.userId()){
			button = <a href="">Edit</a>;
			button2 = true;
			button1 = true;
		}
		let like = 'Like';
		let likelength = 0;
		let unlike = 'Unlike';
		let unlikelength = 0;
		if(this.props.postDetail.like && this.props.postDetail.like.length){
			likelength = this.props.postDetail.like.length;
			let user = this.props.postDetail.like;
			
			{
				user.map((res) => {
					if(res == Meteor.userId()){
						like = 'Liked';
					}
				}) 
			}		
		}
		if(this.props.postDetail.unlike && this.props.postDetail.unlike.length){
			unlikelength = this.props.postDetail.unlike.length;
			let user = this.props.postDetail.unlike;
			{
				user.map((res) => {
					if(res == Meteor.userId()){
						unlike = 'Unliked';
					}
				}) 
			}		
		}
		return (
			<div>
				<div  id="box">
					<div className = "rect">
						<div className="authorBox">
							<label htmlFor="exampleInputPassword1">Author</label>
							{this.props.authorDetail[0].profile.name}
							<div className="hr-style"></div>
						</div>
					  <label htmlFor="exampleInputPassword1">{this.props.postDetail.title}</label>
					  <div>
					  	{this.props.postDetail.description}
					  </div>
					 
					  <button className="btn btn-primary" ref="likeButton" value={this.props.postDetail._id} onClick={this.like.bind(this)}>{like}</button>({likelength})
					  <button className="btn btn-primary" ref="unlikeButton" value={this.props.postDetail._id} onClick={this.unlike.bind(this)}>{unlike}</button>({unlikelength})
					</div>
				</div>
			</div>
		);
	}
}
