import React from 'react'
import '../css/common/dot.scss'

import { Grid } from '@material-ui/core'
import { DotStep } from '.'
function DotStepper({steps, step, title}) {
	const result = [];
	for(let i=0; i<steps; i++){
		result.push(
			<Grid className="dot-con">
				<DotStep key={i} index={i} active={i === step} />
				{title[i]}
			</Grid>
		);
	}

	return (
		<Grid className="dot-stepper">
			{result}
		</Grid>
	)
}

export default DotStepper
