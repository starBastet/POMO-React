import React, {Component} from 'react';
import './RestartButton.css';


class RestartButton extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			showRestart:this.props.showRestart,
			color:this.props.color,
			isOvered:false,
			containerClassName:'',
			btnClassName:''
		};
		
		this.callback = this.props.callback;
		
		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
		this.compileJsx = this.compileJsx.bind(this);
		this.mOver = this.mOver.bind(this);
		this.mOut = this.mOut.bind(this);
		this.mDown = this.mDown.bind(this);
	}
	
	componentWillReceiveProps(newProps)
	{
		var newColor = newProps.color;
		
		this.setState(
		{
			color:newColor
		});
		
		if (newProps.showRestart)
		{
			this.show();
		}
		else
		{
			this.hide();
		}
	}
	
	show()
	{
		var cName = 'show';
		this.setState(
		{
			containerClassName:cName
		});
	}
	
	hide()
	{
		var cName = '';
		this.setState(
		{
			containerClassName:cName
		});
	}
	
	compileJsx()
	{
		var imgStyle = {backgroundColor:this.state.color};
		var jsx = <div>
					<div id={'restartButton'} className={this.state.btnClassName} 
						style={imgStyle} 
						onMouseOver={this.mOver} 
						onMouseOut={this.mOut} 
						onMouseDown={this.mDown}
					>
					</div>
				  </div>;
		
		return jsx;
	}
	
	mOver(e)
	{
		var cName = 'over';
		this.setState(
		{
			isOvered:true,
			btnClassName:cName
		});
	}
	
	mOut(e)
	{
		var cName = '';
		this.setState(
		{
			isOvered:false,
			btnClassName:cName
		});
	}
	
	mDown(e)
	{
		this.hide();
		
		this.callback();
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div id={'restartButtonContainer'} className={this.state.containerClassName}>
				{jsx}
			</div>
		);
	}
}

export default RestartButton;