import React, {Component} from 'react';
import './FocusScreen.css';
import Blurb from './../../utils/blurb/Blurb';
import Clock from './../../utils/clock/Clock';


class FocusScreen extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			blurbA:this.props.dataA[0],
			clockColor:this.props.clockColor,
			time:this.props.dataA[1],
			className:'',
			forceRemoval:this.props.forceRemoval
		};
		
		this.callback = this.props.callback;
		this.timeout = null;
		
		this.show = this.show.bind(this);
		this.focusFinished = this.focusFinished.bind(this);
		this.removal = this.removal.bind(this);
	}
	
	componentWillReceiveProps(newProps)
	{
		if (newProps.forceRemoval)
		{
			this.callback = newProps.callback;
			
			this.focusFinished();
		}
	}
	
	componentDidMount()
	{
		// StartScreen '.show' works without a timeOut, but not this - WHY?!?! CDM alone is enough in StartScreen!!
		this.timeout = setTimeout(this.show,10);
	}
	
	show()
	{
		this.timeout = null;
		var cName = 'show';
		this.setState(
		{
			className:cName
		});
	}
	
	focusFinished()
	{
		if (this.state.forceRemoval)
		{
			return;
		}
		
		this.timeout = setTimeout(this.removal,500);
		
		this.setState(
		{
			className:'remove',
			forceRemoval:true
		});
	}
	
	removal()
	{
		this.callback();
	}
	
	render()
	{
		return(
			<div id={'focusScreen'} className={this.state.className}>
				<Blurb 
					dataA={this.state.blurbA}
				/>
				<Clock 
					time={this.state.time} 
					color={this.state.clockColor} 
					forceRemoval={this.state.forceRemoval} 
					callback={this.focusFinished}
				/>
			</div>
		);
	}
}

export default FocusScreen;