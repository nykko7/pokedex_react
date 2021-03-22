import React, { useContext } from 'react';
import emptyPokeball from '../img/black-pokeball.png';
import redPokeball from '../img/red-pokeball.png';
import CatchingContext from '../contexts/catchingContext';

const Pokemon = ({ pokemon }) => {
	const { caughtPokemons, updateCatching } = useContext(CatchingContext);
	const pokeball = caughtPokemons.includes(pokemon.name) ? redPokeball : emptyPokeball;

	const clickPokeball = (e) => {
		e.preventDefault();
		updateCatching(pokemon.name);
	};

	const zeroFilled = (x) => ('000' + x).substr(-3);
	const urlImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${zeroFilled(pokemon.id)}.png`;

	return (
		<div className='pokemon-card' onClick={clickPokeball}>
			<div className='pokemon-img-container'>
				<img className='pokemon-img' src={urlImg} alt={`${pokemon.name}`} />
			</div>
			<h3 className='card-id'># {('000' + pokemon.id).substr(-3)}</h3>
			<h3 className='card-name'>{pokemon.name}</h3>
			<div className='pokemon-types'>
				{pokemon.types.map((type, idx) => {
					return (
						<div key={idx} className={`pokemon-types-text ${type.type.name}`}>
							{type.type.name}
						</div>
					);
				})}
			</div>
			<div className='pokemon-caught'>
				<img src={pokeball} alt='Pokeball' />
			</div>
		</div>
	);
};

export default Pokemon;
