import React from 'react'
import { MovieViewModel, CodeViewModel } from '.'

function ViewModelProvider({ children }) {
	return (
		<CodeViewModel>
			<MovieViewModel>
				{children}
			</MovieViewModel>
		</CodeViewModel>
	)
}

export default ViewModelProvider
