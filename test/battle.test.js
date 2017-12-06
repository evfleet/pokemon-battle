/* eslint-disable no-undef */
import { expect } from 'chai';

import battle, { calculateBaseStats } from '../lib/battle';

import bulbasaur from './data/bulbasaur.json';
import charmander from './data/charmander.json';
import squirtle from './data/squirtle.json';
import pikachu from './data/pikachu.json';

const pikachuStats = calculateBaseStats(pikachu);
const bulbasaurStats = calculateBaseStats(bulbasaur);

describe('pokemon battler', () => {
  it('should return a winner', () => {
    expect(battle(bulbasaur, charmander)).to.not.equal(undefined);
  });

  it('should return charmander from charmander vs bulbasaur', () => {
    expect(battle(bulbasaur, charmander)).to.equal('charmander');
  });

  it('should return squirtle from charmander vs squirtle', () => {
    expect(battle(squirtle, charmander)).to.equal('squirtle');
  });

  it('should return bulbasaur from bulbasaur vs squirtle', () => {
    expect(battle(squirtle, bulbasaur)).to.equal('bulbasaur');
  });

  it(`should return bulbasaur from bulbasaur vs pikachu due to total base stats (Bulbasaur: ${bulbasaurStats} vs Pikachu: ${pikachuStats})`, () => {
    expect(battle(pikachu, bulbasaur)).to.equal('bulbasaur');
  });
});