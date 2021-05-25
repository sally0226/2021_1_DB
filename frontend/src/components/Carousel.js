import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import PaginationDot from './PaginationDot';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Carousel = () => {
	const [index, setIndex] = useState(0)
	const dots = 3;

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

	return (
		<div className="carousel">
			<AutoPlaySwipeableViews index={index} onChangeIndex={handleChangeIndex}>
				<div className={`${"slide"} ${"slide1"}`} />
				<div className={`${"slide"} ${"slide2"}`} />
				<div className={`${"slide"} ${"slide3"}`} />
			</AutoPlaySwipeableViews>
			<div className="dotCon">{dotFunc()}</div>
		</div>
	);
}

export default Carousel;