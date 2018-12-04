## Day 01: Chronal Calibration

#### Challenge description - https://adventofcode.com/2018/day/1

#### Part 1 description
After feeling like you've been falling for a few minutes, you look at the
device's tiny screen. "Error: Device must be calibrated before first use.
Frequency drift detected. Cannot maintain destination lock." Below the
message, the device shows a sequence of changes in frequency (your puzzle
input). A value like `+6` means the current frequency increases by `6`; a value
like `-3` means the current frequency decreases by `3`.

For example, if the device displays frequency changes of `+1, -2, +3, +1`,
then starting from a frequency of zero, the following changes would occur:

  - Current frequency <code>&nbsp;0</code>, change of `+1`; resulting frequency <code>&nbsp;1</code>.
  - Current frequency <code>&nbsp;1</code>, change of `-2`; resulting frequency `-1`.
  - Current frequency `-1`, change of `+3`; resulting frequency <code>&nbsp;2</code>.
  - Current frequency <code>&nbsp;2</code>, change of `+1`; resulting frequency <code>&nbsp;3</code>.
  
In this example, the resulting frequency is `3`.

Here are other example situations:
 
  - `+1, +1, +1` results in <code>&nsbp;3</code>
  - `+1, +1, -2` results in <code>&nbsp;0</code>
  - `-1, -2, -3` results in `-6`
  
Starting with a frequency of zero, **what is the resulting frequency** after
all of the changes in frequency have been applied?

#### Part 1 answer

The first part of this challenge can be done by reading the input file, and simply
evaluating its contents. The contents of the file is basically one large expression 
separated by newlines (which do not have to be removed in order to evaluate it).

My puzzle answer was `599`.

#### Part 2 description

You notice that the device repeats the same frequency change list over and
over. To calibrate the device, you need to find the first frequency it
reaches twice.

For example, using the same list of changes above, the device would loop as
follows:

  - Current frequency <code>&nbsp;0</code>, change of `+1`; resulting in frequency <code>&nbsp;1</code>.
  - Current frequency <code>&nbsp;1</code>, change of `-2`; resulting in frequency `-1`.
  - Current frequency `-1`, change of `+3`; resulting in frequency <code>&nbsp;2</code>.
  - Current frequency <code>&nbsp;2</code>, change of `+1`; resulting in frequency <code>&nbsp;3</code>.
  - (At this point, the device continues from the start of the list.)
  - Current frequency <code>&nbsp;3</code>, change of `+1`; resulting in frequency <code>&nbsp;4</code>.
  - Current frequency <code>&nbsp;4</code>, change of `-2`; resulting in frequency <code>&nbsp;2</code>, which has
    already been seen.

In this example, the first frequency reached twice is 2. Note that your
device might need to repeat its list of frequency changes many times before
a duplicate frequency is found, and that duplicates might be found while in
the middle of processing the list.

Here are other examples:

  - `+1, -1` first reaches `0` twice.
  - `+3, +3, +4, -2, -4` first reaches `10` twice.
  - `-6, +3, +8, +5, -6` first reaches `5` twice.
  - `+7, +7, -2, -7, -4` first reaches `14` twice.
  
**What is the first frequency your device reaches twice?**

#### Part 2 answer

The second part of this challenge didn't build well upon my first answer, so I had to start 
from scratch. I first read the input file and loop through its contents line by line.
This is a function, to accomodate for the possibility that we have to loop the list multiple
times before a duplicate frequency is found.

In each iteration, I add or subtract the frequency to/from a `currentFrequency` variable.
I then check if this current frequency has already been reached before. If so, this means
this is the duplicate frequency we're looking for and it logs the answer in the console.
In order to stop the loop we also set a `doubleFrequencyReached` flag to `true`.
If it hasn't been reached before, it will push it in a `reachedFrequencies` list and
move on to the next iteration.

My puzzle answer was `81204`.


