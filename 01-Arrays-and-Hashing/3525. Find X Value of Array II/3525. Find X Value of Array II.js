1class SegmentTree {
2    constructor(nums, k) {
3        this.k = k;
4        const n = nums.length;
5        const size = 2 << n.toString(2).length;
6        this.tree = Array.from({ length: size }, () =>
7            new Array(k + 1).fill(0),
8        );
9        this.build(nums, 1, 0, n - 1);
10    }
11
12    makeLeaf(o, value) {
13        const info = new Array(this.k + 1).fill(0);
14        const r = value % this.k;
15        info[r] = 1;
16        info[this.k] = r;
17        this.tree[o] = info;
18    }
19
20    mergePre(left, right) {
21        const pre = new Array(this.k + 1).fill(0);
22        const mulL = left[this.k];
23        const mulR = right[this.k];
24        pre[this.k] = (mulL * mulR) % this.k;
25
26        for (let x = 0; x < this.k; x++) pre[x] = left[x];
27        for (let x = 0; x < this.k; x++) {
28            pre[(mulL * x) % this.k] += right[x];
29        }
30        return pre;
31    }
32
33    maintain(o) {
34        this.tree[o] = this.mergePre(this.tree[o * 2], this.tree[o * 2 + 1]);
35    }
36
37    build(nums, o, l, r) {
38        if (l === r) {
39            this.makeLeaf(o, nums[l]);
40            return;
41        }
42        const m = Math.floor((l + r) / 2);
43        this.build(nums, o * 2, l, m);
44        this.build(nums, o * 2 + 1, m + 1, r);
45        this.maintain(o);
46    }
47
48    update(o, l, r, index, value) {
49        if (l === r) {
50            this.makeLeaf(o, value);
51            return;
52        }
53        const m = Math.floor((l + r) / 2);
54        if (index <= m) this.update(o * 2, l, m, index, value);
55        else this.update(o * 2 + 1, m + 1, r, index, value);
56        this.maintain(o);
57    }
58
59    query(o, l, r, L, R) {
60        if (L <= l && r <= R) return this.tree[o];
61        const m = Math.floor((l + r) / 2);
62        if (R <= m) return this.query(o * 2, l, m, L, R);
63        if (L > m) return this.query(o * 2 + 1, m + 1, r, L, R);
64        const left = this.query(o * 2, l, m, L, R);
65        const right = this.query(o * 2 + 1, m + 1, r, L, R);
66        return this.mergePre(left, right);
67    }
68}
69
70var resultArray = function (nums, k, queries) {
71    const n = nums.length;
72    const seg = new SegmentTree(nums, k);
73    const ans = [];
74
75    for (const [index, value, start, x] of queries) {
76        seg.update(1, 0, n - 1, index, value);
77        const pre = seg.query(1, 0, n - 1, start, n - 1);
78        ans.push(pre[x]);
79    }
80    return ans;
81};