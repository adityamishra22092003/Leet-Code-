1class SegmentTree {
2    constructor(arr) {
3        this.arr = arr;
4        this.n = arr.length;
5        this.seg = new Array(this.n << 2).fill(0);
6        this.build(1, 0, this.n - 1);
7    }
8
9    build(p, l, r) {
10        if (l === r) {
11            this.seg[p] = this.arr[l];
12            return;
13        }
14
15        const mid = (l + r) >> 1;
16        this.build(p << 1, l, mid);
17        this.build((p << 1) | 1, mid + 1, r);
18        this.seg[p] = Math.max(this.seg[p << 1], this.seg[(p << 1) | 1]);
19    }
20
21    _query(p, l, r, L, R) {
22        if (L <= l && r <= R) {
23            return this.seg[p];
24        }
25
26        const mid = (l + r) >> 1;
27        let res = 0;
28        if (L <= mid) {
29            res = Math.max(res, this._query(p << 1, l, mid, L, R));
30        }
31        if (R > mid) {
32            res = Math.max(res, this._query((p << 1) | 1, mid + 1, r, L, R));
33        }
34
35        return res;
36    }
37
38    query(L, R) {
39        if (L > R) {
40            return 0;
41        }
42
43        return this._query(1, 0, this.n - 1, L, R);
44    }
45}
46
47function lowerBound(list, target) {
48    let left = 0,
49        right = list.length;
50    while (left < right) {
51        const mid = left + ((right - left) >> 1);
52        if (list[mid] < target) {
53            left = mid + 1;
54        } else {
55            right = mid;
56        }
57    }
58    return left;
59}
60
61function upperBound(list, target) {
62    let left = 0,
63        right = list.length;
64    while (left < right) {
65        const mid = left + ((right - left) >> 1);
66        if (list[mid] <= target) {
67            left = mid + 1;
68        } else {
69            right = mid;
70        }
71    }
72    return left;
73}
74
75var maxActiveSectionsAfterTrade = function (s, queries) {
76    const n = s.length;
77    let cnt1 = 0;
78    for (const c of s) {
79        if (c === 1) {
80            cnt1++;
81        }
82    }
83
84    const zeroBlocks = [];
85    const blockLeft = [];
86    const blockRight = [];
87
88    let i = 0;
89    while (i < n) {
90        const st = i;
91        while (i < n && s[i] === s[st]) {
92            i += 1;
93        }
94        if (s[st] === 0) {
95            zeroBlocks.push(i - st);
96            blockLeft.push(st);
97            blockRight.push(i - 1);
98        }
99    }
100
101    const m = zeroBlocks.length;
102    if (m < 2) {
103        // continuous 0 blocks less than 2 segments, return the answer directly
104        return new Array(queries.length).fill(cnt1);
105    }
106
107    const tmpSum = new Array(m - 1);
108    for (let k = 0; k < m - 1; k++) {
109        tmpSum[k] = zeroBlocks[k] + zeroBlocks[k + 1];
110    }
111    const seg = new SegmentTree(tmpSum);
112    const ans = [];
113
114    for (const q of queries) {
115        const l = q[0],
116            r = q[1];
117        const idx = lowerBound(blockRight, l);
118        const jdx = upperBound(blockLeft, r) - 1;
119
120        // at most 1 continuous block of 0s within the substring
121        if (idx > m - 1 || jdx < 0 || idx >= jdx) {
122            ans.push(cnt1);
123            continue;
124        }
125        const firstLen = blockRight[idx] - Math.max(blockLeft[idx], l) + 1; // actual length of the first consecutive block of 0s in the substring
126        const lastLen = Math.min(blockRight[jdx], r) - blockLeft[jdx] + 1; // actual length of the last consecutive block of 0s in the substring
127
128        let bestGain;
129        // exactly 2 consecutive 0 blocks within the substring
130        if (idx + 1 === jdx) {
131            bestGain = firstLen + lastLen;
132        } else {
133            const val1 = firstLen + zeroBlocks[idx + 1];
134            const val2 = zeroBlocks[jdx - 1] + lastLen;
135            const val3 = seg.query(idx + 1, jdx - 2);
136            bestGain = Math.max(val1, val2, val3);
137        }
138        ans.push(cnt1 + bestGain);
139    }
140
141    return ans;
142};