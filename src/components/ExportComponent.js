import React, { Component } from 'react';
import {csv} from '../lib/csv';

export default class ExportComponent extends Component {
	constructor(props) {
		super(props)
		this.exportResults = this.exportResults.bind(this);
	}
	exportResults() {
		let results = []
		let columns = ['username', 'email']
		if(Object.keys(this.props.result).length === 0) {
			this.props.setMessage('No results to export');
			return
		}
		console.log('should export results to csv')
		//csv(['username', 'email'], this.state.result.emails.map(email => ))
		console.log(csv);
		Object.keys(this.props.result.emails).map(k => 
			this.props.result.emails[k].forEach(email => results.push(email)));
		
	}

	render() {
		return (
			<div className='row'> 
				<div className='col-md-8'> 
					Export results to CSV
				</div>
				<div className='col-md-4'> 
					<button onClick={this.exportResults} className='btn btn-success'> <i className='fa fa-download'></i> Export </button>
				</div>
			</div>
		)
	}
}