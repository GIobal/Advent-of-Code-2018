## Day 03: No Matter How You Slice It

#### Challenge description - https://adventofcode.com/2018/day/3

#### Part 1 description

The Elves managed to locate the chimney-squeeze prototype fabric for<br/>
Santa's suit (thanks to someone who helpfully wrote its box IDs on the wall<br/>
of the warehouse in the middle of the night). Unfortunately, anomalies are<br/>
still affecting them - nobody can even agree on how to **cut** the fabric.<br/>

The whole piece of fabric they're working on is a very large square - at<br/>
least `1000` inches on each side.

Each Elf has made a **claim** about which area of fabric would be ideal for<br/>
Santa's suit. All claims have an ID and consist of a single rectangle with<br/>
edges parallel to the edges of the fabric. Each claim's rectangle is<br/>
defined as follows:

  - The number of inches between the left edge of the fabric and the left<br/>
    edge of the rectangle.
  - The number of inches between the top edge of the fabric and the top<br/>
    edge of the rectangle.
  - The width of the rectangle in inches.
  - The height of the rectangle in inches.
  
A claim like `#123 @ 3,2: 5x4` means that claim ID `123` specifies a rectangle<br/>
`3` inches from the left edge, `2` inches from the top edge, `5` inches wide, and<br/>
`4` inches tall. Visually, it claims the square inches of fabric represented<br/>
by `#` (and ignores the square inches of fabric represented by `.`) in the<br/>
diagram below:

`...........`<br/>
`...........`<br/>
`...#####...`<br/>
`...#####...`<br/>
`...#####...`<br/>
`...#####...`<br/>
`...........`<br/>
`...........`<br/>
`...........`<br/>

The problem is that many of the claims **overlap**, causing two or more claims<br/>
to cover part of the same areas. For example, consider the following<br/>
claims:

`#1 @ 1,3: 4x4`<br/>
`#2 @ 3,1: 4x4`<br/>
`#3 @ 5,5: 2x2`

Visually, these claim the following areas:

`........`<br/>
`...2222.`<br/>
`...2222.`<br/>
`.11XX22.`<br/>
`.11XX22.`<br/>
`.111133.`<br/>
`.111133.`<br/>
`........`

The four square inches marked with `X` are claimed by **both** `1` **and** `2`.(Claim `3`,<br/>
while adjacent to the others, does not overlap either of them.)

If the Elves all proceed with their own plans, none of them will have<br/>
enough fabric. **How many square inches of fabric are within two or more<br/>
claims?**

#### Part 1 answer

The first part of the challenge is done by looping through each line of the input<br/>
file, and extracting the `id`, `position` and `size` from the line using a regular<br/>
expression: `/((?<=#)[^ ]+)*(\d*,\d*)*(\d*x\d*)*/g`.<br/>

By looping the amount of the height and looping the amount of width, the claim<br/>
gets pushed into a map containing all `claims` with their corresponding id. If<br/>
the claim already contains an id, replace it with an `x` instead, indicating it<br/>
overlaps with a different fabric.

The answer is the amount of x's in the map.

My puzzle answer was `104126`.

#### Part 2 description

Amidst the chaos, you notice that exactly one claim doesn't overlap by even<br/>
a single square inch of fabric with any other claim. If you can somehow<br/>
draw attention to it, maybe the Elves will be able to make Santa's suit<br/>
after all!

For example, in the claims above, only claim `3` is intact after all claims are<br/>
made.

**What is the ID of the only claim that doesn't overlap?**

#### Part 2 answer

The second part of the challenge builds upon the first part. For each iteration<br/>
it now also tracks the size of each claim e.g. `#1 @ 1,3: 4x4` results in an<br/>
object that looks like this `{'1': 16}`.

To get to the answer, a check is performed that counts the amount of times an `id`<br/>
is present in the `claims` map. If this number equals the initial size of the claim,<br/>
it means we found the answer.

My puzzle answer was `695`.
