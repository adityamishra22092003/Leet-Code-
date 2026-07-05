1/**
2 * @param {string[]} board
3 * @return {number[]}
4 */
5var pathsWithMaxScore = function(board) {
6    const MOD = 1000000007;
7    const n = board.length;
8
9    let nextScore = new Array(n + 1).fill(-1);
10    let nextWays = new Array(n + 1).fill(0);
11
12    for (let i = n - 1; i >= 0; i--) {
13        const currScore = new Array(n + 1).fill(-1);
14        const currWays = new Array(n + 1).fill(0);
15
16        for (let j = n - 1; j >= 0; j--) {
17            const cell = board[i][j];
18
19            if (cell === 'X') {
20                continue;
21            }
22
23            if (cell === 'S') {
24                currScore[j] = 0;
25                currWays[j] = 1;
26                continue;
27            }
28
29            const best = Math.max(
30                nextScore[j],
31                currScore[j + 1],
32                nextScore[j + 1]
33            );
34
35            if (best === -1) {
36                continue;
37            }
38
39            let ways = 0;
40
41            if (nextScore[j] === best) {
42                ways = (ways + nextWays[j]) % MOD;
43            }
44            if (currScore[j + 1] === best) {
45                ways = (ways + currWays[j + 1]) % MOD;
46            }
47            if (nextScore[j + 1] === best) {
48                ways = (ways + nextWays[j + 1]) % MOD;
49            }
50
51            const value = cell === 'E' ? 0 : Number(cell);
52
53            currScore[j] = best + value;
54            currWays[j] = ways;
55        }
56
57        nextScore = currScore;
58        nextWays = currWays;
59    }
60
61    if (nextScore[0] === -1) {
62        return [0, 0];
63    }
64
65    return [nextScore[0], nextWays[0]];
66};