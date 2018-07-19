/*import React, { Component } from 'react';

import TagCloud from 'react-tag-cloud';
import randomColor from 'randomcolor';
 
export default class TagCloud1 extends Component {
  render() {
    return (
      <TagCloud 
        style={{
          fontFamily: 'sans-serif',
          fontSize: 30,
          fontWeight: 'bold',
          fontStyle: 'italic',
          color: () => randomColor(),
          padding: 5,
          width: '100%',
          height: '100%'
        }}>
        <div style={{fontSize: 50}}>react</div>
        <div style={{color: 'green'}}>tag</div>
        <div rotate={90}>cloud</div>
      </TagCloud>
    );
  }
}

*/

import React, { Component } from 'react';
import randomColor from 'randomcolor';
import TagCloud from 'react-tag-cloud';
import SingleTag from './SingleTag.js';
import {Tags} from '../../../api/links/tags.js';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
//import CloudItem from './CloudItem';
import './style.css';


export default class App extends TrackerReact(Component) {
	constructor(){
		super();
		this.state = {
			allTags:{
				subscriptions:Meteor.subscribe("allTags")
			}
		}
	}

  componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 3000);
  }

  render() {
  	const styles = {
		  large: {
		    fontSize: 60,
		    fontWeight: 'bold'
		  },
		  small: {
		    opacity: 0.7,
		    fontSize: 16
		  }
		};
  	let allTags = Tags.find({noOfPost:{$exists:true}},{sort:{noOfPost:-1}}).fetch();
		if(!allTags && !maxmin){
			return <div>Loading...</div>
		}
		
    return (
      <div className='app-outer'>
        <div className='app-inner'>
          <h1>react-tag-cloud demo</h1>
          <TagCloud 
            className='tag-cloud'
            style={{
              fontFamily: 'sans-serif',
              //fontSize: () => Math.round(Math.random() * 50) + 16,
              fontSize: 30,
              color: () => randomColor({
                hue: 'blue'
              }),
              padding: 5,
            }}>
            
            {
							allTags.map((res,index) => {
								let tagwieght = res.noOfPost;
								let fontsize = allTags[0].noOfPost;
								let min = 20;
								let max = 100;
								let id = res._id;
								fontsize = (math.log(tagwieght)/math.log(fontsize))*(max-min)+min;
							
								const styles = {
									fontStyle:{
										fontSize: fontsize
									},
									ukey:{
										id
									}
								}
								console.log(styles.ukey.id)
								return (
									<div key={styles.ukey.id} className="tag-item-wrapper">
										<div style={styles.fontStyle}  >
											{res.tagtitle}
										</div>
              			<div  className="tag-item-tooltip">
              				{res.noOfPost}
              			</div>
              		</div>
								)
							}) 
						}     
          </TagCloud>
        </div>
      </div>
    );
  }
}
