import React from 'react'
import { MovieModel, VisitorModel, CodeModel } from '.'

function ModelProvider({ children }) {
	return (
		<CodeModel>
			<MovieModel>
				<VisitorModel>
					{children}
				</VisitorModel>
			</MovieModel>
		</CodeModel>
	)
}

export default ModelProvider
