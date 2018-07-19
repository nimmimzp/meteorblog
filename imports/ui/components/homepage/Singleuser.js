import React, { Component } from  'react';
export default class Singleuser extends Component {

	toggelChecked(event){
		let userId = this.refs.follow.value;
		if(this.refs.follow.checked){
			Meteor.call('userFollow',userId,(err,res)=>{
				if(err){
					Bert.alert( error.reason, 'danger', 'growl-top-right' );
				}else{
					Bert.alert( "You started following.", 'success', 'growl-top-right' );
				}
			});
		}else{
			Meteor.call('userUnfollow',userId,(err,res)=>{
				if(err){
					Bert.alert( error.reason, 'danger', 'growl-top-right' );
				}else{
					Bert.alert( "You started following.", 'success', 'growl-top-right' );
				}
			});
		}
	}

	render() {
		return (
			<div>
				
				<div className="form-check">
					<input ref="follow"  type="checkbox" value={this.props.userDetail._id} className="form-check-input" id={this.props.userDetail._id} onClick={this.toggelChecked.bind(this)}/>
				  <label className="form-check-label"  htmlFor="exampleCheck1">{this.props.userDetail.profile.name}</label>
				</div>
			</div>
		);
	}
}
