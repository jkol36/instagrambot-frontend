import React from 'react';


export const EmailComponent = (props) => {
	let emails = []
	props.result.emails ? Object.keys(props.result.emails).map(k => {
		let email = props.result.emails[k]
		emails.push(email)
	}):null
	console.log(Math.floor(props.activePage*props.itemCountForPage/2))
	if(!props.result.emails) {
		return (
			<table className='table table-striped'> 
				<thead className='thead-inverse'> 
					<tr>
						<th> 
							Username
						</th>
						<th>
							Email
						</th>
					</tr>
				</thead> 
			</table>
		)
	}
	else {
		let emailNodes = emails.length > 0 ? emails.map((email, index) => {
			return (
				<tbody key={index}>
					<tr> 
						<td> 
							{email.username}
						</td>
						<td> {email.email} </td>
					</tr>
				</tbody>
			)
		}):[]
		return (
			<div>
				<table className='table table-striped'> 
					<thead className='thead-inverse'> 
						<tr>
							<th> 
								Username
							</th>
							<th>
								Email
							</th>
						</tr>
					</thead> 
					{emailNodes.slice(Math.floor(props.itemCountForPage*props.activetPage),props.activePage*props.itemCountForPage)}
				</table>
				
			</div>
		)
	}

}