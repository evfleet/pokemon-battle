import fetch from 'node-fetch';

import battle from './lib/battle';

function fetchPokemon(identifier) {
  return fetch(`http://pokeapi.co/api/v2/pokemon/${identifier}`).then((res) => res.json());
}

(async () => {
  try {
    const [ firstInput, secondInput ] = process.argv.slice(2);

    if (!(firstInput && secondInput)) {

    }

    const [ firstPokemon, secondPokemon ] = await Promise.all([
      fetchPokemon(firstInput),
      fetchPokemon(secondInput)
    ]);

    const winner = battle(firstPokemon, secondPokemon);

    console.log(winner);

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit();
  }
})();