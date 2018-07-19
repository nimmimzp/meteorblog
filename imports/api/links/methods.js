// Methods related to links

import { Meteor } from 'meteor/meteor';
import { Post } from './post.js';
import { Tags } from './tags.js';

Meteor.methods({
	currentUser(){
		return Meteor.users.find({_id:this.userId});
	},

	allUser(){
		return Meteor.users.find({});
	},

	addPosts(title,description,tags){

		Post.insert({
			title,
			description,
			tags,
			createdAt:new Date(),
			author:this.userId
		});
	},

	userFollow(userId){
		if (!Meteor.user()) {
      throw new Meteor.Error(401, 'You need to be signed in to continue');
    }
    if (Meteor.userId() === userId) {
      throw new Meteor.Error(422, 'You can not follow yourself');
    }
		Meteor.users.update({ _id: Meteor.userId() }, { $addToSet: { followingIds: userId } });
		Meteor.users.update({ _id: userId  }, { $addToSet: { followersIds: Meteor.userId() } });
	},

	userUnfollow(userId){
		if (!Meteor.user()) {
      throw new Meteor.Error(401, 'You need to be signed in to continue');
    }
    if (Meteor.userId() === userId) {
      throw new Meteor.Error(422, 'You can not unfollow yourself');
    }

    Meteor.users.update({ _id: Meteor.userId() }, { $pull: { followingIds: userId } });
    Meteor.users.update({ _id: userId  }, { $pull: { followersIds: Meteor.userId() } });
	},

	likedButton(postId,buttonText){
		if(buttonText == 'Like'){
			Post.update({_id:postId},{$addToSet:{like:Meteor.userId()}});
			Post.update({_id:postId},{$pull:{unlike:Meteor.userId()}});
		}else{
			Post.update({_id:postId},{$pull:{like:Meteor.userId()}});
		}
	},

	unlikePost(postId,buttonText){
		if(buttonText == 'Unlike'){
			Post.update({_id:postId},{$addToSet:{unlike:Meteor.userId()}});
			Post.update({_id:postId},{$pull:{like:Meteor.userId()}});
		}else{
			Post.update({_id:postId},{$pull:{unlike:Meteor.userId()}});
		}
	},

	addTags(text){
		//let tags = Tags.find({tag:text});
		Tags.insert({
			tagtitle:text,
			createdAt:new Date(),
			author:this.userId
		});
	},
	addNewsTag(tags){
		let existingTag = Tags.find({tagtitle:tags}).fetch();
		
		if(existingTag.length>0){
			let tagid = existingTag[0]._id;
			let updatedNoOfPost = existingTag[0].noOfPost+1;
			Tags.update(tagid,{$set:{ noOfPost:updatedNoOfPost}});
		}else{
			Tags.insert({
				tagtitle:tags,
				createdAt:new Date(),
				noOfPost:1
			});
		}
	},
	updateTag(tags,inc){
		let existingTag = Tags.find({tagtitle:tags}).fetch();
		if(existingTag.length>0){
			console.log('hi');
			Tags.update({tagtitle:tags},{$inc:{noOfPost:inc}});
		}else{
			console.log("jkshdjhds");
			Tags.insert({
				tagtitle:tags,
				createdAt:new Date(),
				noOfPost:1
			});
		}
	},
	removePost(id){
		Post.remove({_id:id});
	},
	updatePost(title,description,id,tags_array){
		Post.update(id, {$set:{title:title,description:description,tags:tags_array}})
	}
	
});
