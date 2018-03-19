import React, {Component} from 'react';
import './Branding.css';


class Branding extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			text:this.props.text,
			color:this.props.color,
			className:''
		};
		
		this.timeout = null;
		
		this.show = this.show.bind(this);
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentDidMount()
	{
		this.timeout = setTimeout(this.show,10);
	}
	
	componentWillReceiveProps(newProps)
	{
		var newColor = newProps.color;
		this.setState(
		{
			color:newColor
		});
	}
	
	show()
	{
		var cName = 'show';
		this.setState(
		{
			className:cName,
			timeout:clearTimeout(this.state.timeout)
		});
	}
	
	compileJsx()
	{
		var text = this.state.text;
		var imgStyle = {backgroundColor:this.state.color};
		var txtStyle = {color:this.state.color};
		var jsx = <div>
					<div className={'brandingImage'} style={imgStyle}></div>
					<div className={'brandingText'} style={txtStyle}>{text}</div>
				  </div>;
		
		return jsx;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div id={'brandingContainer'} className={this.state.className}>
				{jsx}
			</div>
		);
	}
}

export default Branding;