# PokéType Dojo

PokéType Dojo is a mini learning app for adults who want to relearn Pokémon type matchups, especially after the addition of the Fairy type.

## Language

**Type Matchup**:
The damage relationship from a move's type to the attacked Pokémon's type or types.
_Avoid_: Compatibility, weakness chart

**Move Type**:
The type of the move being used to attack.
_Avoid_: Attacking Pokémon type, attack type

**Defending Type**:
One of the attacked Pokémon's types used to determine the matchup multiplier.
_Avoid_: Defense type, target type

**Type Matchup Checker**:
A mode where the user selects a move type and one or two defending types to inspect the final multiplier and its breakdown.
_Avoid_: Calculator, simulator

**Type Matchup Quiz**:
A quiz mode where the user answers the final multiplier for a given move type and defending type combination.
_Avoid_: Compatibility quiz

**Defending Type Combination**:
One or two defending types used in a type matchup question. It does not need to correspond to an existing Pokémon.
_Avoid_: Defending Pokémon, target Pokémon

**Defending Type Slot**:
One of the two editable positions in the type matchup checker used to hold a defending type. Slots make it possible to keep one defending type fixed while changing the other.
_Avoid_: Selected type list, second type toggle

**Type Matchup Quiz Mode**:
The quiz setting that controls whether questions use only one defending type, only two defending types, or a mixed distribution.
_Avoid_: Difficulty, filter

**Pokemon Quiz Dataset**:
The prebuilt Pokémon records used for quiz modes, including names, current types, generation metadata, and display images.
_Avoid_: PokeAPI cache, seed data

**Event Dataset Scope**:
The Pokémon included for the 2-hour event build. The initial scope is the first 151 Pokémon, while the dataset shape allows later generations to be added.
_Avoid_: Fixed Pokédex, final dataset

**Pokemon Form**:
A variant tied to a base Pokémon, such as a regional form or Mega Evolution, that may have different types or display data.
_Avoid_: Separate Pokémon, skin

**Type Combination**:
The unordered set of one or two types a Pokémon has. Quiz answers are judged by the combination, not by the displayed type order.
_Avoid_: Type order, type pair
