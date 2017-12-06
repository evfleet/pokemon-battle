# Pokemon Battle

## Description
A command line JavaScript tool for determining which Pokemon would win in an ideal setting. It uses [PokeAPI](http://pokeapi.co/) to pull down the latest types and base stats from current generation. 

This tool makes a few assumptions to determine the winner
- The Pokemon will attack knowing type advantages/disadvantages.
- The Pokemon will attack using an attack from one of their listed types.
- Base attack is 100% and will do 50% damage if the defending type is strong against attacking type. It will do 25% damage if both of the Pokemons types are strong vs attacking type
- The reverse is true for attacks. It will do 200% damage if defending type is weak versus attacking type and 400% damage if both of the defending types are weak.
- If there is no type advantage for one Pokemon, the winner will be decided to the sum of their base stats.

## Usage 
```
node program.js charmander bulbasaur
```
