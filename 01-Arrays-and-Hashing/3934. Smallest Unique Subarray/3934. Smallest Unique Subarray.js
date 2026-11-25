1var smallestUniqueSubarray = function (nums) {
2    const BASE = 911382323;
3
4    const n = nums.length;
5    const hash = new Uint32Array(n + 1);
6    const powers = new Uint32Array(n + 1);
7    powers[0] = 1;
8
9    // Compute prefix hashes and powers of BASE
10    for (let i = 0; i < n; ++i) {
11        hash[i + 1] = (Math.imul(hash[i], BASE) + nums[i]) >>> 0;
12        powers[i + 1] = Math.imul(powers[i], BASE) >>> 0;
13    }
14
15    const check = (length) => {
16        const counts = new Map();
17
18        for (let left = 0; left + length <= n; ++left) {
19            const right = left + length;
20
21            const key =
22                (hash[right] - Math.imul(hash[left], powers[length])) >>> 0;
23            counts.set(key, (counts.get(key) ?? 0) + 1);
24        }
25
26        for (const times of counts.values()) {
27            if (times === 1) {
28                return true;
29            }
30        }
31        return false;
32    };
33
34    let lo = 1,
35        hi = n;
36    while (lo < hi) {
37        const mid = lo + Math.floor((hi - lo) / 2);
38
39        if (check(mid)) {
40            hi = mid;
41        } else {
42            lo = mid + 1;
43        }
44    }
45
46    return lo;
47};