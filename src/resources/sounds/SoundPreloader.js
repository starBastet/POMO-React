import React, {Component} from 'react';
import tickSnd from './snd/tick.m4a';
import alarmSnd from './snd/alarm.m4a';

class SoundPreloader extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.tickSnd = new Audio(tickSnd);
		this.alarmSnd = new Audio(alarmSnd);
		this.soundsA = [this.tickSnd,this.alarmSnd];
		this.loadedCount = 0;
		this.callback = this.props.callback;
		
		
		this.soundLoaded = this.soundLoaded.bind(this);
	}
	
	componentWillMount()
	{
		/*this.alarmSnd.pause();
		this.alarmSnd.currentTime = 0;
		this.alarmSnd.play();*/
		
		var arr = this.soundsA;
		for (var i=0;i<arr.length;i++)
		{
			arr[i].addEventListener('canplaythrough',this.soundLoaded,false);
		}
	}
	
	soundLoaded(e)
	{
		e.target.removeEventListener('canplaythrough',this.soundLoaded,false);
		this.loadedCount++;
		if (this.loadedCount === this.soundsA.length)
		{
			this.callback();
		}
	}
	
	render()
	{
		return(
			<div>
			</div>
		);
	}
}

export default SoundPreloader;