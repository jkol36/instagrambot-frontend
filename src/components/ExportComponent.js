import React, { Component } from 'react';
import CsvDownloader from 'react-csv-downloader';

const ExportComponent = (props) => {
	return (
		<CsvDownloader 
			columns={props.columns} 
			filename={props.filename} 
			datas={props.data}
			header={props.header}
			> 
			<button className='btn btn-success'> <i className='fa fa-download'></i> Export Results  </button>
		</CsvDownloader>
	)
}

export default ExportComponent