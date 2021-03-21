import React from 'react';

const CatchingContext = React.createContext({
	caughtPokemons: [],
	updateCatching: (id) => null,
});

export const CatchingProvider = CatchingContext.Provider;

export default CatchingContext;
