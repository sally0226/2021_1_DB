import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import PaginationDot from './PaginationDot';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Carousel = (data) => {
	const movieData = data.data;
	const reverse = [...movieData].reverse();


	const [index, setIndex] = useState(0)
	var dots = movieData.length;
	if(movieData.length>8) dots = 8;

	const handleChangeIndex = ( index ) => {
		setIndex(index);
	}

	const dotHandler = ( event, index ) => {
		handleChangeIndex(index);
	}
	const dotFunc = () => {
		const result = [];
		for(let i=0; i<dots; i++){
			result.push(<PaginationDot key={i} index={i} active={i === index} onClick={dotHandler} />);
		}
		return result;
	}
	const vidFunc = () => {
		const result = [];
		for(let i=0; i<dots; i++)
			result.push(<div style={{height:'18rem'}}>
				<iframe width="100%" height="100%" allowfullscreen src={reverse[i].VIDEO} title="YouTube video player" frameBorder="0" allow="accelerometer"></iframe>
			</div>)
		return result
	}

	return (
		<div className="carousel">
			<AutoPlaySwipeableViews index={index} onChangeIndex={handleChangeIndex}>
				{
					// reverse.map((vid, i) => (
					// 	<div style={{height:'18rem'}}>
					// 		<iframe width="100%" height="100%" allowfullscreen src={vid.VIDEO} title="YouTube video player" frameBorder="0" allow="accelerometer"></iframe>
					// 	</div>
					// ))
					vidFunc()
				}
			</AutoPlaySwipeableViews>
			<div className="dotCon">{dotFunc()}</div>
		</div>
	);
}

export default Carousel;