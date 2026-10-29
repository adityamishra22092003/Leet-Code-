1class Tree {  // Euler tour: the subtree of x is tin[x] .. tout[x] - 1; LCA by a sparse table over the DFS order
2    constructor(n, edges) {
3        const graph = Array.from({length: n}, () => []);
4        for (const [u, v] of edges) {
5            graph[u].push(v);
6            graph[v].push(u);
7        }
8
9        const parent = new Int32Array(n), tin = new Int32Array(n), tout = new Int32Array(n), order = [];  // the root is its own parent; order: the nodes in DFS order
10        const stack = [0];
11        while (stack.length) {  // DFS without recursion; ~x marks the moment x's subtree is done
12            const x = stack.pop();
13            if (x < 0) {
14                tout[~x] = order.length;
15                continue;
16            }
17            tin[x] = order.length;
18            order.push(x);
19            stack.push(~x);
20            for (const y of graph[x])
21                if (y !== parent[x]) {
22                    parent[y] = x;
23                    stack.push(y);
24                }
25        }
26
27        const first = [order.map(x => tin[parent[x]])];  // first[k][i]: the earliest parent among order[i .. i + 2^k - 1]
28        for (let k = 1; 1 << k <= n; k++) {
29            const prev = first[k - 1], half = 1 << (k - 1);
30            first.push(prev.slice(0, n - (1 << k) + 1).map((a, i) => Math.min(a, prev[i + half])));
31        }
32        this.parent = parent;
33        this.tin = tin;
34        this.tout = tout;
35        this.order = order;
36        this.first = first;
37    }
38
39    lca(u, v) {  // the parent that comes first in DFS order among the nodes after u up to v
40        if (u === v) return u;
41        const l = Math.min(this.tin[u], this.tin[v]), r = Math.max(this.tin[u], this.tin[v]);
42        const k = 31 - Math.clz32(r - l);
43        return this.order[Math.min(this.first[k][l + 1], this.first[k][r - (1 << k) + 1])];
44    }
45}
46
47class RootPaths {  // get(x): XOR of the letter bits from the root down to x
48    constructor(tree, bit) {
49        this.tree = tree;
50        this.start = Int32Array.from(bit);  // the masks for the initial letters: a parent comes before its children in DFS order
51        for (const x of tree.order.slice(1)) this.start[x] ^= this.start[tree.parent[x]];
52        this.fenwick = new Int32Array(bit.length + 1);  // a Fenwick tree over the Euler tour with the changes since the start
53    }
54
55    flip(x, d) {  // XOR d into the root path of every node in x's subtree
56        for (let i of [this.tree.tin[x] + 1, this.tree.tout[x] + 1])  // d starts at x's subtree and cancels out after it
57            for (; i < this.fenwick.length; i += i & -i) this.fenwick[i] ^= d;
58    }
59
60    get(x) {
61        let mask = this.start[x];
62        for (let i = this.tree.tin[x] + 1; i > 0; i -= i & -i) mask ^= this.fenwick[i];
63        return mask;
64    }
65}
66
67var palindromePath = function(n, edges, s, queries) {
68    const tree = new Tree(n, edges);
69    const bit = Array.from(s, c => 1 << (c.charCodeAt(0) - 97));  // bit[x]: the bit of x's letter
70    const paths = new RootPaths(tree, bit);
71
72    const ans = [];
73    for (const q of queries) {
74        if (q[0] === 'u') {  // update x c
75            const x = parseInt(q.slice(7)), newBit = 1 << (q.charCodeAt(q.length - 1) - 97);
76            paths.flip(x, bit[x] ^ newBit);  // the new letter changes the root path of every node in x's subtree
77            bit[x] = newBit;
78        } else {  // query u v
79            const space = q.lastIndexOf(' ');
80            const u = +q.slice(6, space), v = +q.slice(space + 1);
81            const mask = paths.get(u) ^ paths.get(v) ^ bit[tree.lca(u, v)];  // the LCA cancels out in get(u) ^ get(v), so add it back
82            ans.push((mask & (mask - 1)) === 0);  // at most one letter is odd
83        }
84    }
85    return ans;
86};