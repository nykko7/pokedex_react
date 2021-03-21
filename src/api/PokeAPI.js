export const searchPokemon = async (pokemon) => {
	try {
		let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {}
};

export const getPokemons = async (limit = 25, offset = 0) => {
	try {
		let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {}
};

export const getPokemonsName = async (limit = 898, offset = 0) => {
	try {
		let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
		const response = await fetch(url);
		const data = await response.json();
		const pokemonsName = data.results.map((pokemon) => pokemon.name);
		return pokemonsName;
	} catch (error) {
		console.log('API Problem: ', error);
	}
};

export const getPokemonData = async (name) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${name}/`;
	try {
		let response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};

export const getPokemonsData = async (pokemons) => {
	const promises = pokemons.map(async (pokemon) => {
		return await getPokemonData(pokemon);
	});

	const results = await Promise.all(promises);
	return results;
};
