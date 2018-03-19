import React, {Component} from 'react';
import './FocusInput.css';
import FocusInputButton from './FocusInputButton';


class FocusInput extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			promptText:this.props.promptText,
			inputMax:this.props.inputMax,
			focusInputText:(this.props.autoFill ? this.props.promptText : ''),
			autoFill:this.props.autoFill,
			clicked:false
		};
		
		this.callback = this.props.callback;
		this.focusInputField = null;
		
		this.updateText = this.updateText.bind(this);
		this.kUp = this.kUp.bind(this);
		this.mDown = this.mDown.bind(this);
	}
	
	componentWillMount()
	{
		//
	}
	
	componentDidMount()
	{
		var field = this.focusInputField;
		field.focus();
		
		const addEvent = field.addEventListener || field.attachEvent;
		addEvent("keypress", this.kUp, false);
	}
	
	componentWillUnmount()
	{
		var field = this.focusInputField;
		const removeEvent = field.removeEventListener || field.detachEvent;
		removeEvent("keypress", this.kUp);
	}
	
	kUp(e)
	{
		var kCode = e.keyCode;
		if (kCode === 13)
		{
			e.preventDefault();
			e.stopPropagation();
			this.mDown();
		}
	}
	
	updateText(e)
	{
		if (this.state.clicked)
		{
			return;
		}
		
		this.setState(
		{
			focusInputText:e.target.value
		});
	}
	
	mDown(e)
	{
		if (this.focusInputField.value === '')
		{
			return;
		}
		
		if (this.state.clicked)
		{
			return;
		}
		
		this.setState(
		{
			focusInputText:this.focusInputField.value,
			clicked:true
		});
		
		this.callback(this.focusInputField.value);
	}
	
	render()
	{
		//    <form onSubmit={this.mDown}>
						//onKeyUp={this.kUp} 
		return(
			<div id={'FocusInputContainer'}>
				<form>
					<input
						maxLength={this.state.inputMax} 
						onChange={this.updateText} 
						placeholder={this.state.promptText} 
						value={this.state.focusInputText} 
						ref={(elem) => this.focusInputField = elem}
					>
					</input>
					<FocusInputButton callback={this.mDown}/>
				</form>
			</div>
		);
	}
}

export default FocusInput;