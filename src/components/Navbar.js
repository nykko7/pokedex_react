import React, { useContext } from 'react';
import CatchingContext from '../contexts/catchingContext';
import pokeball from '../img/red-pokeball.png';

const Navbar = ({ onClickPokeball }) => {
	let imgUrl = 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png';

	const { caughtPokemons } = useContext(CatchingContext);

	const onClick = () => {
		onClickPokeball();
	};
	return (
		<nav>
			<div />
			<div>
				<img src={imgUrl} alt='PokeApi Title' className='navbar-image' />
			</div>
			<div onClick={onClick} className='catching-container'>
				<img className='catching-img' src={pokeball} alt='pokeball' /> <p>{caughtPokemons.length}</p>
			</div>
		</nav>
	);
};

export default Navbar;
