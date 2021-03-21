import './styles.css';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Pokedex from './components/Pokedex';
import { getPokemonData, getPokemons, searchPokemon } from './api/PokeAPI';

import React, { useState, useEffect } from 'react';
import { CatchingProvider } from './contexts/catchingContext';

const localStorageKey = 'caught_pokemons';

function App() {
	const [pokemons, setPokemons] = useState([]);
	const [page, setPage] = useState(0);
	const [lastPage, setLastPage] = useState(0);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(true);
	const [caughtPokemons, setCaughtPokemons] = useState([]);
	const [searching, setSearching] = useState(false);
	const [viewCaught, setViewCaught] = useState(false);

	const [notFound, setNotFound] = useState(false);

	const fetchPokemons = async () => {
		try {
			setLoading(true);
			const data = await getPokemons(page === 35 ? 23 : 25, 25 * page);
			const promises = data.results.map(async (pokemon) => {
				return await getPokemonData(pokemon.name);
			});
			const results = await Promise.all(promises);
			setPokemons(results);
			setLoading(false);
			setTotal(Math.ceil(898 / 25));
			setNotFound(false);
		} catch (err) {}
	};

	const loadCaughtPokemons = () => {
		const pokemons = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];

		setCaughtPokemons(pokemons);
	};

	useEffect(() => {
		loadCaughtPokemons();
	}, []);

	useEffect(() => {
		if (!searching && !viewCaught) {
			fetchPokemons();
		}
	}, [page]); // eslint-disable-line react-hooks/exhaustive-deps

	const updateCatching = (name) => {
		const updated = [...caughtPokemons];
		const isFavorite = updated.indexOf(name);
		if (isFavorite >= 0) {
			updated.splice(isFavorite, 1);
		} else {
			updated.push(name);
		}
		setCaughtPokemons(updated);
		window.localStorage.setItem(localStorageKey, JSON.stringify(updated));
	};

	const onSearch = async (pokemon) => {
		if (!pokemon) {
			return fetchPokemons();
		}
		setLoading(true);
		setNotFound(false);
		setSearching(true);
		const result = await searchPokemon(pokemon);
		if (!result) {
			setNotFound(true);
			setLoading(false);
		} else {
			setPokemons([result]);
			setPage(0);
			setTotal(1);
		}
		setLoading(false);
		setSearching(false);
	};

	const renderCaught = async () => {
		console.log('Pokeball button pressed !');
		if (!viewCaught) {
			try {
				setViewCaught(true);
				setLoading(true);
				const promises = caughtPokemons.map(async (pokemonName) => {
					return await getPokemonData(pokemonName);
				});
				const results = await Promise.all(promises);
				setPokemons(results);
				setLoading(false);
				setLastPage(page);
				setPage(0);
				setTotal(1);
			} catch (err) {}
		} else {
			setViewCaught(false);
			setPage(lastPage);
			fetchPokemons();
		}
	};

	return (
		<CatchingProvider value={{ caughtPokemons: caughtPokemons, updateCatching: updateCatching }}>
			<div>
				<Navbar onClickPokeball={renderCaught} />
				<div className='App'>
					<SearchBar onSearch={onSearch} />
					{notFound ? <div className='not-found-text'>Pokemon not found 😭</div> : <Pokedex loading={loading} pokemons={pokemons} page={page} setPage={setPage} total={total} />}
				</div>
			</div>
		</CatchingProvider>
	);
}

export default App;
