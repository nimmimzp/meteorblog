import React from 'react';
import { mount } from 'react-mounter';
import Login from '../../ui/components/login/Login.js';
import Signup from '../../ui/components/signup/Signup.js';
import Homepage from '../../ui/components/homepage/Homepage.js';
import FileUploadComponent from '../../ui/components/homepage/profile/FileUploadComponent.js';
import AddNews from '../../ui/components/news-and-tags/AddNews.js';
import App from '../../ui/components/news-and-tags/App.js';
import { MainLayout } from '../../ui/layout/MainLayout.js';

FlowRouter.route('/',{
	action(){
		mount(MainLayout,{content:<Login />})
	}
});

FlowRouter.route('/signup',{
	action(){
		mount(MainLayout,{content:<Signup />})
	}
});

FlowRouter.route('/homepage',{
	action(){
		mount(MainLayout,{content:<Homepage />})
	}
});


FlowRouter.route('/profile',{
	action(){
		mount(MainLayout,{content:<FileUploadComponent />})
	}
});


FlowRouter.route('/tagcloud',{
	action(){
		mount(MainLayout,{content:<AddNews />})
	}
});


FlowRouter.route('/viewtagcloud',{
	action(){
		mount(MainLayout,{content:<App />})
	}
});
