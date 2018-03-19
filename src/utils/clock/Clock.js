import React, {Component} from 'react';
import tickSnd from './../../resources/sounds/snd/tick.m4a';
import alarmSnd from './../../resources/sounds/snd/alarm.m4a';
import ClockDisplay from './ClockDisplay';


class Clock extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			minutes:Number(this.props.time),
			seconds:8,
			timeString:this.props.time+':00',
			color:this.props.color
		};
		
		this.tickSnd = new Audio(tickSnd);
		this.alarmSnd = new Audio(alarmSnd);
		this.timer = null;
		this.timeout = null;
		this.longRestRemovalCallback = (this.props.longRestRemovalCallback ? this.props.longRestRemovalCallback : null);
		this.callback = this.props.callback;
		
		
		this.ticker = this.ticker.bind(this);
		this.alarmComplete = this.alarmComplete.bind(this);
		this.compileTimeString = this.compileTimeString.bind(this);
		this.countdownComplete = this.countdownComplete.bind(this);
	}
	
	componentWillMount()
	{
		var timeStr = this.state.timeString;
		if (this.state.minutes < 10)
		{
			timeStr = '0'+timeStr;
		}
		
		this.setState(
		{
			timeString:timeStr
		});
	}
	
	componentDidMount()
	{
		this.timer = setInterval(this.ticker,1000);
	}
	
	componentWillReceiveProps(newProps)
	{
		if (newProps.forceRemoval)
		{
			clearInterval(this.timer);
			clearTimeout(this.timeout);
		}
		else
		{
			var minutes = Number(newProps.time) + Number(this.state.minutes);
			this.setState(
			{
				minutes:minutes
			});
		}
	}
	
	shouldComponentUpdate(newProps,newState)
	{
		if (newState.minutes !== this.state.minutes || newState.seconds !== this.state.seconds || newState.timeString !== this.state.timeString)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	componentWillUnmount()
	{
		//clearInterval(this.state.timer);
	}
	
	compileTimeString(minutes,seconds)
	{
		var minStr = minutes;
		var secStr = seconds;
		
		if (minutes < 10)
		{
			minStr = '0' + minStr;
		}
		
		if (seconds < 10)
		{
			secStr = '0' + secStr;
		}
		
		var timeStr = minStr + ':' + secStr;
		return timeStr;
	}
	
	ticker()
	{
		var minutes = Number(this.state.minutes);
		var seconds = Number(this.state.seconds);
		
		if (seconds === 0)
		{
			seconds = 59;
			minutes--;
		}
		else
		{
			seconds--;
		}
		
		if (minutes === 0 && seconds === 0)
		{
			this.countdownComplete();
		}
		else if (minutes === 0 && seconds === 2)
		{
			if (this.longRestRemovalCallback !== null)
			{
				this.longRestRemovalCallback()
			}
		}
		
		var timeString = this.compileTimeString(minutes,seconds);
		
		this.tickSnd.pause();
		this.tickSnd.currentTime = 0;
		this.tickSnd.play();
		
		this.setState(
		{
			minutes:minutes,
			seconds:seconds,
			timeString:timeString
		});
	}
	
	countdownComplete()
	{
		var delay = 1000;
		
		clearInterval(this.timer);
		this.timeout = setTimeout(this.alarmComplete,delay);
		this.alarmSnd.pause();
		this.alarmSnd.currentTime = 0;
		this.alarmSnd.play();
	}
	
	alarmComplete()
	{
		this.callback();
	}
	
	render()
	{
		return(
			<div>
				<ClockDisplay 
					timeString={this.state.timeString} 
					color={this.state.color}
				/>
			</div>
		);
	}
}

export default Clock;