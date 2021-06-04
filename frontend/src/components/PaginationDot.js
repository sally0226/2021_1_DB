import React from 'react';
import '../css/common/dot.scss'

function PaginationDot({key, index, active, onClick}) {
	const handleClick = event => {
		onClick(event, index);
	};

    return (
      <div type="button" className="dot-clickable" onClick={handleClick}>
        <div className={active ? "dot-cstyle dot-active" : "dot-cstyle"} />
      </div>
    );
}

export default PaginationDot;