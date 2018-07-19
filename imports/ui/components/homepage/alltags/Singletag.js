import React, {Component} from 'react';
export default class Singletag extends Component{
	render() {
		return (
			<div><li><a href="">{this.props.tagsDetail.tagtitle}</a></li></div>
		);
	}
}
