import React, {Component} from 'react';
import './RestScreen.css';
import Blurb from './../../utils/blurb/Blurb';
import Clock from './../../utils/clock/Clock';
import LongRestButton from './LongRestButton';


class RestScreen extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			blurbA:this.props.dataA[0],
			clockColor:this.props.clockColor,
			time:this.props.dataA[1],
			longRestA:this.props.dataA[2],
			showLongRestBtn:true,
			dismissBtn:false,
			className:'',
			forceRemoval:this.props.forceRemoval
		};
		
		this.timeout = null;
		this.callback = this.props.callback;
		
		this.show = this.show.bind(this);
		this.longRestClicked = this.longRestClicked.bind(this);
		this.longRestRemoval = this.longRestRemoval.bind(this);
		this.compileSvgJsx = this.compileSvgJsx.bind(this);
		this.restFinished = this.restFinished.bind(this);
		this.removal = this.removal.bind(this);
	}
	
	componentWillReceiveProps(newProps)
	{
		if (newProps.forceRemoval)
		{
			this.callback = newProps.callback;
			this.restFinished();
		}
	}
	
	componentDidMount()
	{
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
	
	longRestClicked()
	{
		if (this.state.dismissBtn)
		{
			this.setState(
			{
				showLongRestBtn:false
			});
		}
		else
		{
			var newTime = Number(this.state.longRestA[1]) - Number(this.state.time);
			this.setState(
			{
				time:newTime
			});
		}
	}
	
	longRestRemoval()
	{
		this.setState(
		{
			dismissBtn:true
		});
	}
	
	compileSvgJsx()
	{
		var jsxA = [];
		for (var i=1;i<3;i++)
		{
			var jsx = <div className={'cloud cloud'+i} key={'cloud'+i}></div>
			jsxA.push(jsx);
		}
		return jsxA;
	}
	
	restFinished()
	{
		if (this.state.forceRemoval)
		{
			return;
		}
		
		this.timeout = setTimeout(this.removal,500)
		
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
		var svgJsx = this.compileSvgJsx();
		
		return(
			<div id={'restScreen'} className={this.state.className}>
				{svgJsx}
				<Blurb 
					dataA={this.state.blurbA}
				/>
				<Clock 
					time={this.state.time} 
					color={this.state.clockColor} 
					forceRemoval={this.state.forceRemoval} 
					longRestRemovalCallback={this.longRestRemoval} 
					callback={this.restFinished}
				/>
				{this.state.showLongRestBtn ? 
					<LongRestButton 
						textA={this.state.longRestA[0]} 
						dismissBtn={this.state.dismissBtn} 
						callback={this.longRestClicked}
					/>
				: null}
			</div>
		);
	}
}

export default RestScreen;