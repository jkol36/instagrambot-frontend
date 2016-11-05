import React, { PropTypes, Component } from 'react'

class SuggestionItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hovering: false,
			selected: false
		}
		this.onMouseOver = this.onMouseOver.bind(this)
		this.onMouseLeave = this.onMouseLeave.bind(this)
		this.onClick = this.onClick.bind(this)
	}
	onMouseOver() {
		this.setState({
			hovering:true
		})
	}
	onMouseLeave() {
		this.setState({
			hovering:false
		})
	}
	onClick() {
		this.props.onClick(this.props.username)
	}

	render() {
		let className = this.state.hovering || this.props.selected ? 'highlighted':''
		return (
			<li ref='suggestion' onClick={this.onClick} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}  className={className}> 
				<img width={50} className='profile-photo' src={this.props.img}/>
				<p className='muted'>name: {this.props.fullName} </p>
				<p className='muted'>username: {this.props.username} </p>
				<p className='muted'>followers: {this.props.followers}</p>
			</li>
			)
	}

}
class SuggestionComponent extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<ul className='search-bar-suggestions'> 
				{this.props.suggestions.map((suggestion, index) => {
					return <SuggestionItem 
					key={index}
					onClick={this.props.onSelectedSuggestion}
					selected={suggestion.username === this.props.selectedSuggestion} 
					fullName={suggestion.full_name} 
					username={suggestion.username}
					followers={suggestion.follower_count}
					img={suggestion.profile_pic_url}
					className={suggestion.className}/>
				})}
			</ul>
		)
	}
}

SuggestionComponent.PropTypes = {
	suggestions: PropTypes.array
}
export default SuggestionComponent