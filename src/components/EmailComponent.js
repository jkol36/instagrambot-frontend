import React from 'react';


export const EmailComponent = (props) => {
	let emails = []
	props.result.emails ? Object.keys(props.result.emails).map(k => {
		let email = props.result.emails[k]
		emails.push(email)
	}):null
	if(!props.result.emails) {
		return (
			<table className='table table-striped'> 
				<thead className='thead-inverse'> 
					<tr>
						<th> Profile Pic </th>

						<th> 
							Username
						</th>
						<th>
							Email
						</th>
						<th> Followers </th>
						<th> Full Name </th>
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
							<img src={email.metaData.user.profile_pic_url}></img>
						</td>
						<td> 
							{email.username}
						</td>
						<td> {email.email} </td>
						<td> {email.metaData.user.followed_by.count} </td>
						<td> {email.metaData.user.full_name} </td>
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
							Profile Pic
							</th>
							<th> 
								Username
							</th>
							<th>
								Email
							</th>
							<th> 
							followers
							</th>
							<th> 
							full Name
							</th>
						</tr>
					</thead> 
					{emailNodes.slice(0,10)}
				</table>
				
			</div>
		)
	}

}