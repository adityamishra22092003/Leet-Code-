1var stoneGameVIII = function (stones) {
2    const n = stones.length;
3    const pre = new Array(n);
4    pre[0] = stones[0];
5    for (let i = 1; i < n; i++) {
6        pre[i] = pre[i - 1] + stones[i];
7    }
8
9    const f = new Array(n);
10    f[n - 1] = pre[n - 1];
11    for (let i = n - 2; i >= 1; i--) {
12        f[i] = Math.max(f[i + 1], pre[i] - f[i + 1]);
13    }
14    return f[1];
15};