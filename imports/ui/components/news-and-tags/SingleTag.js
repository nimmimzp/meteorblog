import React, { Component } from 'react';
export default class SingleTag extends Component{
	render() {
		let tagwieght = this.props.tagDetail.noOfPost;
		let tagclass = "normal";
		let fontsize = this.props.noOfPost;
		let min = 10;
		let max = 40;
		fontsize = (math.log(tagwieght)/math.log(fontsize))*(max-min)+min;
		let fontstyle = {
			fontSize: fontsize + 'px'
		}
		return (
			<div style={fontstyle}>
				{this.props.tagDetail.tagtitle}({this.props.tagDetail.noOfPost})
			</div>
		);
	}
}
