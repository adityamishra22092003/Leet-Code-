1var subsequencePairCount = function (nums) {
2    const MOD = 1000000007;
3    const m = Math.max(...nums);
4
5    const gcd = (a, b) => {
6        while (b !== 0) {
7            [a, b] = [b, a % b];
8        }
9        return a;
10    };
11
12    let dp = Array.from({ length: m + 1 }, () => new Array(m + 1).fill(0));
13    dp[0][0] = 1;
14
15    for (const num of nums) {
16        const ndp = Array.from({ length: m + 1 }, () =>
17            new Array(m + 1).fill(0),
18        );
19
20        for (let j = 0; j <= m; j++) {
21            const divisor1 = gcd(j, num);
22            const dpRow = dp[j];
23            const ndpRow = ndp[j];
24            const ndpD1Row = ndp[divisor1];
25
26            for (let k = 0; k <= m; k++) {
27                const val = dpRow[k];
28                if (val === 0) continue;
29
30                const divisor2 = gcd(k, num);
31                ndpRow[k] = (ndpRow[k] + val) % MOD;
32                ndpD1Row[k] = (ndpD1Row[k] + val) % MOD;
33                ndpRow[divisor2] = (ndpRow[divisor2] + val) % MOD;
34            }
35        }
36        dp = ndp;
37    }
38
39    let ans = 0;
40    for (let j = 1; j <= m; j++) {
41        ans = (ans + dp[j][j]) % MOD;
42    }
43
44    return ans;
45};