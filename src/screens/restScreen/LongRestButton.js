import React, {Component} from 'react';
import './LongRestButton.css';


class LongTimeButton extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			textA:this.props.textA,
			jsx:null,
			className:'',
			clicked:false
		};
		
		this.callback = this.props.callback;
		this.timeout = null;
		
		this.show = this.show.bind(this);
		this.compileJsx = this.compileJsx.bind(this);
		this.mDown = this.mDown.bind(this);
		this.removal = this.removal.bind(this);
	}
	
	componentWillMount()
	{
		this.compileJsx();
	}
	
	componentDidMount()
	{
		this.timeout = setTimeout(this.show,10);
	}
	
	componentWillReceiveProps(newProps)
	{
		if (newProps.dismissBtn)
		{
			this.mDown();
		}
	}
	
	show()
	{
		var cName = 'show';
		this.timeout = null;
		this.setState(
		{
			className:cName
		});
	}
	
	compileJsx()
	{
		var textA = this.state.textA;
		var jsx = <div>
					<p>{textA[0]}</p>
					<div className={'btnTime'}>
						<span className={'btnLarge'}>{textA[1]}</span>
						<span className={'btnSmall'}>{textA[2]}</span>
					</div>
				  </div>;
		
		this.setState(
		{
			jsx:jsx
		});
	}
	
	mDown(e)
	{
		if (this.state.clicked === true)
		{
			return;
		}
		
		clearTimeout(this.timeout);
		this.timeout = setTimeout(this.removal,500);
		var cName = 'remove';
		
		this.setState(
		{
			className:cName,
			clicked:true
		});
	}
	
	removal()
	{
		this.timeout = null;
		
		this.callback();
	}
	
	render()
	{
		var jsx = this.state.jsx;
		
		return(
			<div id={'longRestBtn'} 
				className={this.state.className} 
				onClick={this.mDown}
			>
				{jsx}
			</div>
		);
	}
}

export default LongTimeButton;