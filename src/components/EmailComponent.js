import React from 'react';


export const EmailComponent = (props) => {
	let emails = []
	if(Object.keys(props.result).length > 0) {
		Object.keys(props.result.emails).map(k => {
			props.result.emails[k].forEach(email => {
				if(emails.indexOf(email) === -1) {
					emails.push(email)
				}
			})		
		})
	}
	emails.sort((a, b) => a.createdAt > b.createdAt)
	emails = emails.slice(0, 10)
	if(!props.result) {
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
		let emailNodes = emails.length > 0 ? emails.map(email => {
			return (
				<tbody>
					<tr> 
						<td> 
							{email.username}
						</td>
						<td> {email.email} </td>
					</tr>
				</tbody>
			)
		}): []
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
				{emailNodes}
			</table>
		)
	}

}