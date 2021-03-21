import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
	const [search, setSearch] = useState('');

	const onChange = (evt) => {
		setSearch(evt.target.value);
		if (evt.target.value.length === 0) {
			onSearch(null);
		}
	};

	const onKeyPress = (evt) => {
		if (evt.key === 'Enter') {
			onSearch(search);
		}
	};

	const onClick = async (evt) => {
		onSearch(search);
	};

	return (
		<div className='searchbar-container'>
			<div className='searchbar'>
				<input type='text' placeholder='Search by name...' onChange={onChange} onKeyPress={onKeyPress} />
			</div>
			<div className='searchbar-btn'>
				<button onClick={onClick}>
					<span>Search</span>
				</button>
			</div>
		</div>
	);
};

export default SearchBar;
