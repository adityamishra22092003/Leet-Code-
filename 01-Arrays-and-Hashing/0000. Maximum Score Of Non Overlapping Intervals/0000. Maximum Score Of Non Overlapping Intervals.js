1var maximumWeight = function (intervals) {
2    const n = intervals.length;
3    const arr = intervals.map((interval, i) => ({
4        l: interval[0],
5        r: interval[1],
6        weight: interval[2],
7        idx: i,
8    }));
9    // Sort by right endpoint.
10    arr.sort((a, b) => a.r - b.r);
11
12    const dp = Array.from({ length: n + 1 }, () => Array(5).fill(0));
13    const indices = Array.from({ length: n + 1 }, () =>
14        Array.from({ length: 5 }, () => []),
15    );
16
17    for (let i = 0; i < n; i++) {
18        const { l, r, weight, idx } = arr[i];
19        // Use binary search to find intervals whose right endpoints are smaller than l.
20        let left = 0,
21            right = i;
22        while (left < right) {
23            const mid = Math.floor((left + right) / 2);
24            if (arr[mid].r < l) {
25                left = mid + 1;
26            } else {
27                right = mid;
28            }
29        }
30        const k = left;
31
32        for (let j = 1; j < 5; j++) {
33            const s1 = dp[i][j];
34            const s2 = dp[k][j - 1] + weight;
35            if (s1 > s2) {
36                dp[i + 1][j] = dp[i][j];
37                indices[i + 1][j] = [...indices[i][j]];
38                continue;
39            }
40
41            const newIndex = [...indices[k][j - 1], idx].sort((a, b) => a - b);
42            if (s1 === s2 && compareArrays(indices[i][j], newIndex) < 0) {
43                dp[i + 1][j] = s2;
44                indices[i + 1][j] = [...indices[i][j]];
45            } else {
46                dp[i + 1][j] = s2;
47                indices[i + 1][j] = newIndex;
48            }
49        }
50    }
51
52    return indices[n][4];
53};
54
55function compareArrays(a, b) {
56    const minLen = Math.min(a.length, b.length);
57    for (let i = 0; i < minLen; i++) {
58        if (a[i] !== b[i]) {
59            return a[i] - b[i];
60        }
61    }
62    return a.length - b.length;
63}