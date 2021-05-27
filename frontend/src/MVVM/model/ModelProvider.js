import React from 'react'
import { MovieModel } from '.'

function ModelProvider({ children }) {
	return (
		<MovieModel>
			{children}
		</MovieModel>
	)
}

export default ModelProvider
