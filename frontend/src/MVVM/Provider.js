import React from 'react'
import Router from '../routes'
import ModelProvider from './model/ModelProvider'

// model->viewmodel->view(router)
function Provider() {
	return (
		<ModelProvider>
			<Router />
		</ModelProvider>
	)
}

export default Provider
