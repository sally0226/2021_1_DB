import React from 'react'
import { Grid } from '@material-ui/core';

function RatingCircle({ rating }) {
	return (
		<Grid
			className={
				rating === "전체이용가" ? 'ratingCircle all'
				: rating === "18세이용가" ? 'ratingCircle adult'
				: 'ratingCircle avg'
			}
		>
			{
				rating === "전체이용가" ? '전'
				: rating === "18세이용가" ? '18'
				: rating === "15세이용가" ? '15'
				: '12'
			}
		</Grid>
	)
}

export default RatingCircle
