1function segmentCost(s, l, m, factors) {
2    let best = m;
3    for (const d of factors[m]) {
4        const groups = Math.floor(m / d); // Each group contains groups characters
5        let changes = 0;
6        for (let offset = 0; offset < d; offset++) {
7            for (let t = 0; t < Math.floor(groups / 2); t++) {
8                // Pair characters from opposite ends of the group
9                if (
10                    s[l + offset + t * d] !==
11                    s[l + offset + (groups - 1 - t) * d]
12                ) {
13                    changes++;
14                }
15            }
16        }
17        best = Math.min(best, changes);
18    }
19    return best;
20}
21
22var minimumChanges = function (s, k) {
23    const n = s.length;
24    const factors = Array.from({ length: n + 1 }, () => []);
25    // Precompute the proper divisors of each number
26    for (let d = 1; d <= Math.floor(n / 2); d++) {
27        for (let m = d * 2; m <= n; m += d) {
28            factors[m].push(d);
29        }
30    }
31    const cost = Array.from({ length: n }, () => new Array(n).fill(0));
32    for (let l = 0; l + 1 < n; l++) {
33        for (let r = l + 1; r < n; r++) {
34            // Each substring must have length at least 2
35            cost[l][r] = segmentCost(s, l, r - l + 1, factors);
36        }
37    }
38
39    const memo = Array.from({ length: k + 1 }, () => new Array(n).fill(-1));
40    const solve = (seg, start) => {
41        if (seg === 1) {
42            // Only one segment remains
43            return cost[start][n - 1];
44        }
45        if (memo[seg][start] !== -1) {
46            // Already computed
47            return memo[seg][start];
48        }
49        let best = n;
50        const limit = n - 1 - 2 * (seg - 1); // Leave room for seg-1 segments after the first segment
51        for (let e = start + 1; e <= limit; e++) {
52            best = Math.min(best, cost[start][e] + solve(seg - 1, e + 1));
53        }
54        memo[seg][start] = best;
55        return best;
56    };
57    return solve(k, 0);
58};