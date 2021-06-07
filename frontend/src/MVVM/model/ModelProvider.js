import React from 'react'
import { MovieModel, VisitorModel } from '.'

function ModelProvider({ children }) {
	return (
		<MovieModel>
			<VisitorModel>
				{children}
			</VisitorModel>
		</MovieModel>
	)
}

export default ModelProvider
