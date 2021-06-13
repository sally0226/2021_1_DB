import React from 'react'
import Router from '../routes'
import ModelProvider from './model/ModelProvider'
import ViewModelProvider from './viewmodel/ViewModelProvider'

// model->viewmodel->view(router)
function Provider() {
	return (
		<ModelProvider>
			<ViewModelProvider>
				<Router />
			</ViewModelProvider>
		</ModelProvider>
	)
}

export default Provider
