import React, {Component} from 'react';
import './Blurb.css';


class Blurb extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			dataA:this.props.dataA,
			jsx:null
		};
		
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentWillMount()
	{
		this.compileJsx();
	}
	
	compileJsx()
	{
		var dataA = this.state.dataA;
		var textA = [dataA[0][0],dataA[1][0]];
		var styleA = [{color:dataA[0][1]},{color:dataA[1][1]}];
		var jsx = <div>
					<p style={styleA[0]}>{textA[0]}</p>
					<p className={'blurbLarge'} style={styleA[1]}>{textA[1]}</p>
				  </div>;
		
		this.setState(
		{
			jsx:jsx
		});
	}
	
	render()
	{
		var jsx = this.state.jsx;
		
		return(
			<div id={'blurbText'}>
				{jsx}
			</div>
		);
	}
}

export default Blurb;