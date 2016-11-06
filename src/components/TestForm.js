import React from 'react'
import 'css/form.css'

const TestForm = (props) => {
	console.log(props)
	return (
		<div className='flex-wrap'> 
			<form className='color-card'> 
				<div className='color-card__header'> 
					<h1> Sign up </h1>
				</div>
				<div className='color-card__body'> 
					<label for='name'> 
						<input type='text' name='name'/>
					</label>
				</div>
				<a href='#' className='color-card__button'> Done </a>
			</form>
		</div>
	)
}

export default TestForm