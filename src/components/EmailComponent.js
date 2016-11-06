import React from 'react';
import 'css/table.less'


export const EmailComponent = (props) => {
	let emails = []
	props.result.emails ? Object.keys(props.result.emails).map(k => {
		let email = props.result.emails[k]
		emails.push(email)
	}):null
	if(!props.result.emails) {
		return (
			<div className='table-responsive-vertical shadow-z-1'>
				<table id='table' className='table table-hover table-mc-light-blue'> 
					<thead> 
						<tr>
							<th> Profile Pic </th>
							<th> 
								Username
							</th>
							<th>
								Email
							</th>
						</tr>
					</thead> 
				</table>
			</div>
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
			<div className='table-responsive-vertical shadow-z-1'>
				<table className='table table-hover table-mc-light-blue'> 
					<thead> 
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