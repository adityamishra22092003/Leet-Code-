1const MOD = 1000000007;
2const MAX_N = 100001;
3const pow10 = new Array(MAX_N);
4
5pow10[0] = 1n;
6for (let i = 1; i < MAX_N; ++i) {
7    pow10[i] = (pow10[i - 1] * 10n) % BigInt(MOD);
8}
9
10var sumAndMultiply = function (s, queries) {
11    const n = s.length;
12    const sum = new Array(n + 1).fill(0);
13    const x = new Array(n + 1).fill(0n);
14    const cnt = new Array(n + 1).fill(0);
15    for (let i = 0; i < n; ++i) {
16        const d = s.charCodeAt(i) - 48;
17        sum[i + 1] = sum[i] + d;
18        x[i + 1] = d > 0 ? (x[i] * 10n + BigInt(d)) % BigInt(MOD) : x[i];
19        cnt[i + 1] = cnt[i] + (d > 0 ? 1 : 0);
20    }
21    const m = queries.length;
22    const res = new Array(m);
23    for (let i = 0; i < m; ++i) {
24        const l = queries[i][0];
25        const r = queries[i][1] + 1;
26        const length = cnt[r] - cnt[l];
27        const val_x =
28            (x[r] - ((x[l] * pow10[length]) % BigInt(MOD)) + BigInt(MOD)) %
29            BigInt(MOD);
30        const val_sum = BigInt(sum[r] - sum[l]);
31        res[i] = Number((val_x * val_sum) % BigInt(MOD));
32    }
33    return res;
34};