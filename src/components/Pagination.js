import React from 'react';

const Pagination = (props) => {
	const { onLeftClick, onRightClick, page, totalPages } = props;
	return (
		<div className='pagination'>
			<button onClick={onLeftClick}>
				<div>👈</div>
			</button>
			<div className='pagination-text'>
				<span className='yellow'>{page}</span> of {totalPages}
			</div>
			<button onClick={onRightClick}>👉</button>
		</div>
	);
};

export default Pagination;
