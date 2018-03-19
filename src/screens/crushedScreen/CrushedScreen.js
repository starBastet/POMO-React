import React, {Component} from 'react';
import './CrushedScreen.css';
import Blurb from './../../utils/blurb/Blurb';
import FocusInput from './../../utils/focusInput/FocusInput';


class CrushedScreen extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			blurbA:this.props.dataA[0],
			inputText:this.props.dataA[1],
			inputMax:this.props.dataA[2],
			className:'',
			forceRemoval:this.props.forceRemoval
		};
		
		this.callback = this.props.callback;
		this.timeout = null;
		
		this.show = this.show.bind(this);
		this.compileSvgJsx = this.compileSvgJsx.bind(this);
		this.crushedFinished = this.crushedFinished.bind(this);
		this.removal = this.removal.bind(this);
	}
	
	componentWillReceiveProps(newProps)
	{
		if (newProps.forceRemoval)
		{
			this.callback = newProps.callback;
			this.crushedFinished();
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
	
	compileSvgJsx()
	{
		var jsxA = [];
		for (var i=1;i<5;i++)
		{
			var jsx = <div className={'star star'+i} key={'star'+i}></div>
			jsxA.push(jsx);
		}
		return jsxA;
	}
	
	crushedFinished(inputText)
	{
		if (this.state.forceRemoval)
		{
			return;
		}
		
		this.timeout = setTimeout(this.removal,500);
		
		this.setState(
		{
			inputText:inputText,
			className:'remove',
			forceRemoval:true
		});
	}
	
	removal()
	{
		this.callback(this.state.inputText);
	}
	
	render()
	{
		var svgJsx = this.compileSvgJsx();
		
		return(
			<div id={'crushedScreen'} className={this.state.className}>
				{svgJsx}
				<Blurb 
					dataA={this.state.blurbA}
				/>
				<FocusInput 
					promptText={this.state.inputText} 
					autoFill={true} 
					inputMax={this.state.inputMax} 
					callback={this.crushedFinished}
				/>
			</div>
		);
	}
}

export default CrushedScreen;