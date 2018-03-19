import React, {Component} from 'react';
import './FocusInputButton.css';


class FocusInputButton extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			isOvered:false,
			className:''
		};
		
		this.callback = this.props.callback;
		
		this.mOver = this.mOver.bind(this);
		this.mOut = this.mOut.bind(this);
		this.mDown = this.mDown.bind(this);
	}
	
	mOver(e)
	{
		var cName = 'over';
		this.setState(
		{
			isOvered:true,
			className:cName
		});
	}
	
	mOut(e)
	{
		var cName = '';
		this.setState(
		{
			isOvered:false,
			className:cName
		});
	}
	
	mDown(e)
	{
		this.callback();
	}
	
	render()
	{
		return(
			<div id={'focusInputButton'} className={this.state.className} 
				onMouseOver={this.mOver} 
				onMouseOut={this.mOut} 
				onMouseDown={this.mDown}
			>
			</div>
		);
	}
}

export default FocusInputButton;