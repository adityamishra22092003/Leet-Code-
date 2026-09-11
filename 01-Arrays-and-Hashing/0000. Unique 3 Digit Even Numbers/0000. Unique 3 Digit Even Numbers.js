1var totalNumbers = function (digits) {
2    const n = digits.length;
3    const vis = new Array(1000).fill(false);
4    let ans = 0;
5
6    for (let i = 0; i < n; ++i) {
7        if (digits[i] === 0) {
8            continue;
9        }
10        for (let j = 0; j < n; ++j) {
11            if (j === i) {
12                continue;
13            }
14            for (let k = 0; k < n; ++k) {
15                if (k === i || k === j || digits[k] % 2 !== 0) {
16                    continue;
17                }
18                const x = digits[i] * 100 + digits[j] * 10 + digits[k];
19                if (!vis[x]) {
20                    vis[x] = true;
21                    ++ans;
22                }
23            }
24        }
25    }
26
27    return ans;
28};