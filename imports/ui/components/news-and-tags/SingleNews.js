import React, { Component } from 'react';
import swal from 'sweetalert';
import Truncate from 'react-truncate';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import EditModal from './EditModal.js';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Post } from '../../../api/links/post.js';
export default class SingleNews extends TrackerReact(Component){
	constructor(){
		super();
		this.state = {
      expanded: false,
      truncated: false,
      modalIsOpen: false,
      title: "",
      description: "",
      showComponent: false,
      tags:"",
      allPost:{
				subscriptions:Meteor.subscribe("allPost")
			}
    };
    this._onButtonClick = this._onButtonClick.bind(this);
    this.handleTruncate = this.handleTruncate.bind(this);
    this.toggleLines = this.toggleLines.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
	}

	_onButtonClick() {
    this.setState({
      showComponent: !this.state.showComponent
    });
  }

	openModal() {
    this.setState({modalIsOpen: true});
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  } 

	handleTruncate(truncated) {
    if (this.state.truncated !== truncated) {
      this.setState({
         truncated
      });
    }
  }
 
  toggleLines(event) {
    event.preventDefault();

    this.setState({
      expanded: !this.state.expanded
    });
  }
  

	deletePost(){
		swal({
		  title: "Are you sure?",
		  text: "Are you sure that you want to delete this news?",
		  icon: "warning",
		  dangerMode: true,
		  buttons: {
		    cancel: true,
		    confirm: "Confirm",
		  }
		})
		.then(willDelete => {
		  if (willDelete) {
		  	let tag_array = this.props.postDetail.tags;
		
				for(let i=0; i<tag_array.length; i++){
					Meteor.call('updateTag',tag_array[i],-1,(err,res)=>{
					});
				}
				Meteor.call('removePost',this.props.postDetail._id,(err,res)=>{
					if(err){
						swal("Oops!", "Some thing went worng", "danger");
					}else{
						swal("Deleted!", "News deleted", "success");
					}
				})
		  }
		});		
	}

	


	/*componentDidUpdate(prevProps) {
		console.log('hi');
		if(prevProps.postDetail.title !== this.props.postDetail.title){
			console.log('hi')
		}
	}*/

	componentDidMount() {
		
		let currentDetail = Post.find({_id:this.props.postDetail._id}).fetch();
		//console.log(currentDetail[0]);
  	this.setState({
  		title: currentDetail[0].title,
  		description: currentDetail[0].description,
  		tags: currentDetail[0].tags.join()
  	});
	} 
	
	openeditModal(event){
		
		event.preventDefault();
		let currentDetail = Post.find({_id:this.props.postDetail._id}).fetch();
		let tags = currentDetail[0].tags;
		tags = tags.join();
		this.setState({ title: currentDetail[0].title ,description: currentDetail[0].description, tags:tags});
		//console.log(this.state)
	}
	render() {
		const customStyles = {
		  content : {
		    top : '30%',
		    left : '30%',
		    right : 'auto',
		    bottom : 'auto',
		    width: '50%'
		  }
		};
		let expanded = this.state.expanded;
		let truncated = this.state.truncated;
		let lines = this.props.lines;
		let more = this.props.more;
		let less = this.props.less;
		//console.log(this.props); 
		return (
			<div className="col-md-4 mb-4" id="box">
        <div className="card h-100" >
          <div className="card-body">
            <h2 className="card-title">{this.props.postDetail.title}</h2> 
            <Truncate
              lines={!expanded && lines}
              ellipsis={(
                  <span>... <a href='#' onClick={this.openModal}>{more}</a></span>
              )}
              onTruncate={this.handleTruncate}
          	>
            	{this.props.postDetail.description}
	          </Truncate>
	          {!truncated && expanded && (
	              <span> <a href='#'  onClick={this.toggleLines}>{less}</a></span>
	          )}
          </div>
          <Modal
	          isOpen={this.state.modalIsOpen}
	          onAfterOpen={this.afterOpenModal}
	          onRequestClose={this.closeModal}
	          style={customStyles}
	          contentLabel="Example Modal"
	        >
	          <h2 >{this.props.postDetail.title}</h2>
	          <div>{this.props.postDetail.description}</div>
	          <button onClick={this.closeModal}>close</button>
	        </Modal>
          <div className="card-footer">
            <button onClick={this.deletePost.bind(this)} className="btn btn-danger">Delete</button>
            <button data-toggle="modal" type="button" className="btn btn-primary btnClass" onClick={this._onButtonClick}>Edit</button>
            {
            	this.state.showComponent ?

            	<EditModal currentDetail={this.props.postDetail} id="editModal" className="modal fade" role="dialog"/> :
			          null
			      }
          </div>
        </div>
       
      </div>
		);
	}
}

SingleNews.defaultProps = {
  lines: 2,
  more: 'Read more',
  less: 'Show less'
};
 
SingleNews.propTypes = {
  /*children: PropTypes.node.isRequired,*/
  text: PropTypes.node,
  lines: PropTypes.number
};
