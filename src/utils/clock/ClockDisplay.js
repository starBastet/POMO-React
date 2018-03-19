import React, {Component} from 'react';
import './ClockDisplay.css';


class ClockDisplay extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			timeString:this.props.timeString,
			color:this.props.color
		};
		
	}
	
	componentWillMount()
	{
		//console.log('');
	}
	
	componentWillReceiveProps(newProps)
	{
		this.setState(
		{
			timeString:newProps.timeString
		});
	}
	
	render()
	{
		var timeString = this.state.timeString;
		var style={color:this.state.color};
		
		return(
			<div id={'clock'} style={style}>
				{timeString}
			</div>
		);
	}
}

export default ClockDisplay;