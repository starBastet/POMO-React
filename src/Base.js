import React, {Component} from 'react';
import './Base.css';
import data from './resources/data/json.json';
import SoundPreloader from './resources/sounds/SoundPreloader';
import Branding from './utils/branding/Branding';
import RestartButton from './utils/restartButton/RestartButton';
import StartScreen from './screens/startScreen/StartScreen';
import FocusScreen from './screens/focusScreen/FocusScreen';
import RestScreen from './screens/restScreen/RestScreen';
import CrushedScreen from './screens/crushedScreen/CrushedScreen';


class Base extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			jDataA:data[0],
			brandingA:data[0].BRANDING_A,
			brandingColor:'',
			phaseDataA:data[0].PHASES,
			currPhaseN:0,
			screenDataA:data[0].SCREENS,
			inputText:'',
			className:'',
			screenColor:data[0].SCREENS.START.BKGND_COLOR,
			forceRemoval:false
		};
		
		this.useSoundPreloader = true;
		
		this.removeSoundPreloader = this.removeSoundPreloader.bind(this);
		this.getScreenData = this.getScreenData.bind(this);
		this.focusInputAcquired = this.focusInputAcquired.bind(this);
		this.focusFinished = this.focusFinished.bind(this);
		this.restFinished = this.restFinished.bind(this);
		this.crushedFinished = this.crushedFinished.bind(this);
		this.callRestart = this.callRestart.bind(this);
		this.resetter = this.resetter.bind(this);
		this.changeBkgnd = this.changeBkgnd.bind(this);
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentWillMount()
	{
		//console.log(this.state.screenDataA[this.state.currScreenN]);
	}
	
	componentDidMount()
	{
		this.changeBkgnd(this.state.screenColor);
	}
	
	removeSoundPreloader()
	{
		this.useSoundPreloader = false;
	}
	
	getScreenData(phaseN)
	{
		var phase = this.state.phaseDataA[phaseN];
		var screenData = this.state.screenDataA[phase];
		return screenData;
	}
	
	changeBkgnd(newColor)
	{
		document.body.style.backgroundColor = newColor;
	}
	
	focusInputAcquired(inputText)
	{
		var newPhaseNum = this.state.currPhaseN + 1;
		var screenData = this.getScreenData(newPhaseNum);
		var screenColor = screenData.BKGND_COLOR;
		this.setState(
		{
			currPhaseN:newPhaseNum,
			inputText:inputText,
			screenColor:screenColor
		});
		
		this.changeBkgnd(screenColor);
	}
	
	focusFinished()
	{
		var newPhaseNum = this.state.currPhaseN + 1;
		var screenData = this.getScreenData(newPhaseNum);
		var screenColor = screenData.BKGND_COLOR;
		this.setState(
		{
			currPhaseN:newPhaseNum,
			screenColor:screenColor
		});
		
		this.changeBkgnd(screenColor);
	}
	
	restFinished()
	{
		var newPhaseNum = this.state.currPhaseN + 1;
		var screenData = this.getScreenData(newPhaseNum);
		var screenColor = screenData.BKGND_COLOR;
		this.setState(
		{
			currPhaseN:newPhaseNum,
			screenColor:screenColor
		});
		
		this.changeBkgnd(screenColor);
	}
	
	crushedFinished(inputText)
	{
		var newPhaseNum = 1;
		var screenData = this.getScreenData(newPhaseNum);
		var screenColor = screenData.BKGND_COLOR;
		this.setState(
		{
			currPhaseN:newPhaseNum,
			inputText:inputText,
			screenColor:screenColor
		});
		
		this.changeBkgnd(screenColor);
	}
	
	callRestart()
	{
		this.setState({
			forceRemoval:true
		});
	}
	
	resetter()
	{
		var newPhaseNum = 0;
		var screenData = this.getScreenData(newPhaseNum);
		var screenColor = screenData.BKGND_COLOR;
		this.setState(
		{
			currPhaseN:newPhaseNum,
			screenColor:screenColor,
			inputText:'',
			className:'',
			forceRemoval:false
		});
		
		this.changeBkgnd(screenColor);
	}
	
	compileJsx()
	{
		var phase = this.state.phaseDataA[this.state.currPhaseN];
		var screenData = this.getScreenData(this.state.currPhaseN);
		
		var blurbA;
		var inputMax;
		var clockColor;
		var time;
		var callback;
		var dataA;
		var jsx;
		var forceRemoval = this.state.forceRemoval;
		
		if (phase === 'START')
		{
			var welcomeText = screenData.BLURB_A;
			var promptText = screenData.PROMPT_TEXT;
			inputMax = screenData.INPUT_MAX;
			dataA = [welcomeText,promptText,inputMax];
			callback = this.focusInputAcquired;
			
			jsx = <StartScreen dataA={dataA} callback={callback}/>
		}
		else if (phase === 'FOCUS')
		{
			blurbA = screenData.BLURB_A;
			blurbA[1][0] = this.state.inputText;
			clockColor = screenData.CLOCK_COLOR;
			time = screenData.TIME;
			callback = forceRemoval ? this.resetter : this.focusFinished;
			dataA = [blurbA,time];
			jsx = <FocusScreen dataA={dataA} clockColor={clockColor} forceRemoval={forceRemoval} callback={callback}/>;
		}
		else if (phase === 'REST')
		{
			blurbA = screenData.BLURB_A;
			clockColor = screenData.CLOCK_COLOR;
			time = screenData.TIME;
			var longRestA = [screenData.LONG_REST_BTN_TEXT_A,screenData.LONG_REST_TIME];
			callback = forceRemoval ? this.resetter : this.restFinished;
			dataA = [blurbA,time,longRestA];
			jsx = <RestScreen dataA={dataA} clockColor={clockColor} forceRemoval={forceRemoval} callback={callback}/>;
		}
		else if (phase === 'CRUSHED')
		{
			blurbA = screenData.BLURB_A;
			var inputText = this.state.inputText;
			inputMax = screenData.INPUT_MAX;
			callback = forceRemoval ? this.resetter : this.crushedFinished;
			dataA = [blurbA,inputText,inputMax];
			jsx = <CrushedScreen dataA={dataA} forceRemoval={forceRemoval} callback={callback}/>;
		}
		
		return jsx;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div id={'appContainer'} className={this.state.className}>
				{this.useSoundPreloader ?
					<SoundPreloader
						callback={this.removeSoundPreloader}
					/>
					:
					null
				}
				<Branding 
					text={this.state.brandingA[0]} 
					color={this.state.currPhaseN === 1 ? this.state.brandingA[2] : this.state.brandingA[1]}
				/>
				{jsx}
				<RestartButton 
					showRestart={this.state.currPhaseN === 0 ? false : true} 
					color={this.state.currPhaseN === 1 ? this.state.brandingA[2] : this.state.brandingA[1]} 
					callback={this.callRestart}
				/>
			</div>
		);
	}
}

export default Base;