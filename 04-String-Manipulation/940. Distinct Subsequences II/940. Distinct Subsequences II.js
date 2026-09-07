1const MOD = 1e9 + 7;
2
3const distinctSubseqII = s => {
4    let dp = new Int32Array(26), tot = 0;
5
6    for (let i = 0; i < s.length; i++) {
7        const c = s.charCodeAt(i) - 97;
8        const add = (tot - dp[c] + MOD) % MOD;
9
10        dp[c] = 1 + tot;
11        tot = (dp[c] + add) % MOD;
12    }
13
14    return tot;
15};