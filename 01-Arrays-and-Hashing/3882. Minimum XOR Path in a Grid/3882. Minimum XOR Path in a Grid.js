1var minCost = function (grid) {
2    const m = grid.length;
3    const n = grid[0].length;
4
5    const dp = Array.from({ length: n }, () => new Uint8Array(1024));
6    const next = new Uint8Array(1024);
7
8    dp[0][grid[0][0]] = 1;
9
10    for (let i = 0; i < m; i++) {
11        for (let j = 0; j < n; j++) {
12            if (i === 0 && j === 0) {
13                continue;
14            }
15
16            const value = grid[i][j];
17            next.fill(0);
18
19            for (let k = 0; k < 1024; k++) {
20                if (dp[j][k] || (j > 0 && dp[j - 1][k])) {
21                    next[k ^ value] = 1;
22                }
23            }
24
25            dp[j].set(next);
26        }
27    }
28
29    return dp[n - 1].indexOf(1);
30};