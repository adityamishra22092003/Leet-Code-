1var hasValidPath = function (grid) {
2    const n = grid.length;
3    const m = grid[0].length;
4    const pathLen = n + m - 1;
5
6    if (pathLen % 2 === 1) {
7        return false;
8    }
9    if (grid[0][0] !== ( || grid[n - 1][m - 1] !== )) {
10        return false;
11    }
12
13    const dp = Array.from({ length: n }, () => new Array(m).fill(0n));
14
15    dp[0][0] = 1n << 1n;
16
17    for (let i = 0; i < n; ++i) {
18        for (let j = 0; j < m; ++j) {
19            const change = grid[i][j] === ( ? 1 : -1;
20
21            if (i > 0) {
22                if (change === 1) {
23                    dp[i][j] |= dp[i - 1][j] << 1n;
24                } else {
25                    dp[i][j] |= dp[i - 1][j] >> 1n;
26                }
27            }
28
29            if (j > 0) {
30                if (change === 1) {
31                    dp[i][j] |= dp[i][j - 1] << 1n;
32                } else {
33                    dp[i][j] |= dp[i][j - 1] >> 1n;
34                }
35            }
36        }
37    }
38
39    return (dp[n - 1][m - 1] & 1n) !== 0n;
40};