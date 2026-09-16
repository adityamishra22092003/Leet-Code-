1var numberOfSets = function (n, k) {
2    const MOD = 1000000007;
3    const dp = Array(n).fill(1);
4    const prefixSums = Array(n + 1).fill(0);
5    for (let j = 0; j < n; j++) {
6        prefixSums[j + 1] = (prefixSums[j] + dp[j]) % MOD;
7    }
8    for (let i = 1; i <= k; i++) {
9        dp[0] = 0;
10        for (let j = 1; j < n; j++) {
11            dp[j] = (dp[j - 1] + prefixSums[j]) % MOD;
12        }
13        for (let j = 0; j < n; j++) {
14            prefixSums[j + 1] = (prefixSums[j] + dp[j]) % MOD;
15        }
16    }
17    return dp[n - 1];
18};