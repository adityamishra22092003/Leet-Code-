1var countServers = function(n, logs, x, queries) {
2    logs.sort((a, b) => a[1] - b[1]);  // by time
3    logs.push([0, Infinity]);  // sentinel: no window ever reaches it
4    const cnt = new Int32Array(n + 1);  // requests per server inside the window [q - x, q]
5    const ans = new Array(queries.length);
6    let busy = 0, lo = 0, hi = 0;  // servers with at least one request in it
7    for (const i of [...queries.keys()].sort((i, j) => queries[i] - queries[j])) {  // query positions in time order
8        const q = queries[i];
9        for (; logs[hi][1] <= q; hi++) busy += cnt[logs[hi][0]]++ === 0;  // requests up to q come in
10        for (; logs[lo][1] < q - x; lo++) busy -= --cnt[logs[lo][0]] === 0;  // requests before q - x go out
11        ans[i] = n - busy;
12    }
13    return ans;
14};