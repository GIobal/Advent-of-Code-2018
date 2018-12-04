## Day 02: Inventory Management System

#### Challenge description - https://adventofcode.com/2018/day/2

#### Part 1 description

You stop falling through time, catch your breath, and check the screen on
the device. "Destination reached. Current year: 1518. Current Location:
North Pole Utility Closet 83N10." You made it! Now, to find those
anomalies.

Outside the utility closet, you hear footsteps and a voice. "...I'm not
sure either. But now that so many people have chimneys, maybe he could
sneak in that way?" Another voice responds, "Actually, we've been working
on a new kind of **suit** that would let him fit through tight spaces like
that. But, I head that a few days ago, they lost the prototype fabric, the
design plans, everything! Nobody on the team can even seem to remember
important details about the project!"

"Wouldn't they have had enough fabric to fill several boxes in the
warehous? They'd be stored together, so the box IDs would be similar. Too
bad it would take forever to search the warehouse for **two similar box
IDs**..." They walk too far away to hear any more.

Late at night, you sneak to the warehouse - who knows what kinds of
paradoxes you could cause if you were discovered - and use your fancy wrist
device to quickly scan every box and produce a list of the likely
candidates (your puzzle input)

To make sure you didn't miss any, you scan the likely candidate boxes
again, counting the number that have an ID containing **exactly two of any
letter** and then seperately counting those with **exactly three of any letter**.
You can multiply those two counts together to get a rudimentary checksum
and compare it to what your device predicts.

For example, if you see the following box IDs:

  - `abcdef` contains no letters that appear exactly two or three times.
  - `bababc` contains two `a` and three `b`, so it counts for both.
  - `abbcde` contains two `b`, but no letter appears exactly three times.
  - `abcccd` contains three `c`, but no letter appears exactly two times.
  - `aabcdd` contains two `a` and two `d`, but it only counts once.
  - `abcdee` contains two `e`.
  - `ababab` contains three `a` and three `b`, but it only counts once.
  
  Of these box IDs, four of them contain a letter which appears exactly
  twice, and three of them contain a letter which appears exactly thee
  times. Multiplying these together produces a checksum of `4 * 3 = 12`.
  
  **What is the checksum** for your list of box IDs?

#### Part 1 answer

The first part of the challenge is done by looping through each line of the input
file, and looping through every single character. If that character hasn't already
been mapped in a temporary count object, it will add it as a single occurence,
every other occurence simply adds 1. For example `bababc` results in an object
that looks like this `{'b': 3, 'a': 2', c:'1'}`.

Filtering through the map and looking for values that include `2` and `3`. We find
both the values we need to evaluate the answer.

My puzzle answer was `7904`.

#### Part 2 description

Confident that your list of box IDs is complete, you're ready to find the
boxes full of prototype fabric.

The boxes will have IDs which differ by exactly one character at the same
position in both strings. For example, given the following box IDs:

`abcde`<br/>
`fghij`<br/>
`klmno`<br/>
`pqrst`<br/>
`fguij`<br/>
`axcye`<br/>
`wvxyz`

The IDs `abcde` and `axcye` are close, but they differ by two characters (the
second and fourth). However the IDs `fghij` and `fguij` differ by exactly one
character, the third (`h` and `u`). Those must be the correct boxes.

**What letters are common between the two correct box IDs?** (In the example
above, this is found by removing the different character from either ID,
producing `fgij`.)

#### Part 2 answer

The second part of this challenge is done by looping trough each line of the input file,
and looping it again in each iteration. Per iteration, it tracks the amount of differences
by checking the characters in both the lines at the same position. If the difference is 1
after both words are fully checked, that means we have found the answer.

To extract the answer from the 'words', we slice the character at the position it differs.

My puzzle answer was `wugbihckpoymcpaxefotvdzns`.
