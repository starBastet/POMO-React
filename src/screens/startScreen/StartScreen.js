import React, {Component} from 'react';
import './StartScreen.css';
import StartScreenBlurb from './StartScreenBlurb';
import FocusInput from './../../utils/focusInput/FocusInput';


class StartScreen extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			dataA:this.props.dataA,
			className:'',
			inputText:''
		};
		
		this.timeout = null;
		this.callback = this.props.callback;
		
		this.show = this.show.bind(this);
		this.focusInputSet = this.focusInputSet.bind(this);
		this.removal = this.removal.bind(this);
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
	
	focusInputSet(inputText)
	{
		this.timeout = setTimeout(this.removal,500);
		this.setState(
		{
			className:'remove',
			inputText:inputText
		});
	}
	
	removal()
	{
		this.callback(this.state.inputText);
	}
	
	render()
	{
		var dataA = this.state.dataA;
		return(
			<div id={'startScreen'} className={this.state.className}>
				<StartScreenBlurb 
					dataA={dataA[0]}
				/>
				<FocusInput 
					promptText={dataA[1]} 
					autoFill={false} 
					inputMax={dataA[2]} 
					callback={this.focusInputSet}
				/>
			</div>
		);
	}
}

export default StartScreen;