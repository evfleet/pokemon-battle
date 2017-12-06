import types from './types.json';

function calculateAttackStrength({ types: attackingTypes }, { types: defendingTypes }) {
  const findType = (type, typeset) => typeset.find((t) => t.toLowerCase() === type);

  const attackStrengths = attackingTypes.map(({ type: { name: attackingType } }) => {
    let attackFactor = 1;

    defendingTypes.forEach(({ type: { name: defendingType } }) => {
      const { immunes, weaknesses, strengths } = types.find((t) => t.name.toLowerCase() === attackingType);

      if (findType(defendingType, immunes)) {
        return 0;
      }

      if (findType(defendingType, weaknesses)) {
        attackFactor *= 0.5;
      }

      if (findType(defendingType, strengths)) {
        attackFactor *= 2;
      }
    });

    return attackFactor;
  });

  return Math.max(...attackStrengths);
}

export function calculateBaseStats({ stats }) {
  return stats.reduce((total, curr) => total + curr.base_stat, 0);
}

export default (firstPokemon, secondPokemon) => {
  let winner;

  const firstPokemonStrongestAttack = calculateAttackStrength(firstPokemon, secondPokemon);
  const secondPokemonStrongestAttack = calculateAttackStrength(secondPokemon, firstPokemon);

  if (firstPokemonStrongestAttack !== secondPokemonStrongestAttack) {
    if (firstPokemonStrongestAttack > secondPokemonStrongestAttack) {
      winner = firstPokemon.name;
    } else {
      winner = secondPokemon.name;
    }
  } else {
    const firstPokemonStatTotal = calculateBaseStats(firstPokemon);
    const secondPokemonStatTotal = calculateBaseStats(secondPokemon);

    if (firstPokemonStatTotal === secondPokemonStatTotal) {
      winner = 'tie';
    } else if (firstPokemonStatTotal > secondPokemonStatTotal) {
      winner = firstPokemon.name;
    } else if (firstPokemonStatTotal < secondPokemonStatTotal) {
      winner = secondPokemon.name;
    }
  }

  return winner;
};