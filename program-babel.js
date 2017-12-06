import fetch from 'node-fetch';

import battle from './lib/battle';

function fetchPokemon(identifier) {
  return fetch(`http://pokeapi.co/api/v2/pokemon/${identifier}`).then((res) => res.json());
}

(async () => {
  try {
    const [ firstInput, secondInput ] = process.argv.slice(2);

    if (!(firstInput && secondInput)) {
      throw new Error('Two pokemon are required to battle');
    }

    const [ firstPokemon, secondPokemon ] = await Promise.all([
      fetchPokemon(firstInput),
      fetchPokemon(secondInput)
    ]);

    if (firstPokemon.detail === 'Not found.' || secondPokemon.detail === 'Not found.') {
      throw new Error('Pokemon not found');
    }

    const winner = battle(firstPokemon, secondPokemon);

    console.log(winner);

    process.exit();
  } catch (error) {
    switch (error.message) {
      case 'Two pokemon are required to battle':
      case 'Pokemon not found':
        console.log(error.message);
        break;
      default:
        console.log('Unexpected error');
        break;
    }

    process.exit();
  }
})();