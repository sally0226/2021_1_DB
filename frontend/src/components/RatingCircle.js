import React from 'react'
import { Grid } from '@material-ui/core';

function RatingCircle({ rating }) {
	return (
		<Grid
			className={
				rating === 10001 ? 'ratingCircle all'
				: rating === 10004 ? 'ratingCircle adult'
				: 'ratingCircle avg'
			}
		>
			{
				rating === 10001 ? '전'
				: rating === 10004 ? '18'
				: rating === 10003 ? '15'
				: '12'
			}
		</Grid>
	)
}

export default RatingCircle
