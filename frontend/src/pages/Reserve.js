import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { CustomerInput, Header, Modal } from '../components'

function Reserve() {
	const [modal, setModal] = useState(false);
	return (
		<div className="reserve">
			<Header />
			<Button onClick={() => setModal(true)}>modal</Button>
			<Modal open={modal} close={() => setModal(false)} header="비회원 정보 입력">
				<CustomerInput />
			</Modal>
		</div>
	)
}

export default Reserve
