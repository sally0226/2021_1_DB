import React from 'react'
import '../css/common/dot.scss'

function DotStep({key, index, active}) {
	// dot 한 개만 나타냅니당
	  return (
		<div className="dot">
		  <div className={active ? "dot-style dot-active" : "dot-style"} />
		</div>
	  );
}

export default DotStep
