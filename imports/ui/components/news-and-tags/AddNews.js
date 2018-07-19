import React, { Component } from 'react';
import AddNewsForm from './AddNewsForm.js';
import News from './News.js';
import TotalTag from './TotalTag.js';
export default class AddNews extends Component{
	render() {
		
		return (
			<div id="mainpage">
				<div className="container" >
					<div className="row">
						<div className="col-md-8">
								<AddNewsForm />
						</div>
						<div className="col-md-4">
							<TotalTag />
						</div>
					</div>
					<div className="row">
						<News />
					</div>	
				</div>
				<footer className="bg-dark footer	">
	    		<div >
	      		<p className="m-0 text-center text-white">Copyright © Your Website 2018</p>
	    		</div>
	  		</footer>
	  	</div>
		);
	}
}
