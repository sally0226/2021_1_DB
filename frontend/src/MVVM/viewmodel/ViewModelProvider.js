import React from 'react'
import { MovieModel, VisitorModel } from '.'
import { MovieViewModel } from '.'

function ViewModelProvider({ children }) {
	return (
		<MovieViewModel>
			{children}
		</MovieViewModel>
	)
}

export default ViewModelProvider
