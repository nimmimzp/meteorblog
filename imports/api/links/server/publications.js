// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Post } from '../post.js';
import { Tags } from '../tags.js';
Meteor.publish('currentUser', function () {
  return Meteor.user();
});

Meteor.publish('allUser', function () {
  return Meteor.users.find({});
});

Meteor.publish('allPost', function(){
	return Post.find({});
});

Meteor.publish('allTags', function () {
  return Tags.find({});
});
