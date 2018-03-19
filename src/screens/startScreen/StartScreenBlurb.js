import React, {Component} from 'react';
import './StartScreenBlurb.css';


class StartScreenBlurb extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			dataA:this.props.dataA
		};
		
	}
	
	render()
	{
		var text = this.state.dataA;
		
		return(
			<div id={'welcomeText'}>
				<p>
					<b>{text[0]}</b>  {text[1]}
				</p>
				<div className={'welcomeSmall'}>
					{text[2]}
				</div>
			</div>
		);
	}
}

export default StartScreenBlurb;