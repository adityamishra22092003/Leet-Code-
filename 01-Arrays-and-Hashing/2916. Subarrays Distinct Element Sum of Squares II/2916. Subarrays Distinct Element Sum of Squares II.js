1class BIT {
2    constructor(n) {
3        this.size = n;
4        this._tree1 = new Float64Array(n + 2);
5        this._tree2 = new Float64Array(n + 2);
6    }
7
8    _lowbit(index) {
9        return index & -index;
10    }
11
12    add(left, right, delta) {
13        this._add(left, delta);
14        this._add(right + 1, -delta);
15    }
16
17    query(left, right) {
18        return this._query(right) - this._query(left - 1);
19    }
20
21    _add(index, delta) {
22        index += 1;
23        let rawIndex = index;
24        while (index <= this.size) {
25            this._tree1[index] += delta;
26            this._tree2[index] += rawIndex * delta;
27            index += this._lowbit(index);
28        }
29    }
30
31    _query(index) {
32        index += 1;
33        let rawIndex = index + 1;
34        if (index > this.size) {
35            index = this.size;
36        }
37        let res = 0;
38        while (index > 0) {
39            res += rawIndex * this._tree1[index] - this._tree2[index];
40            index -= this._lowbit(index);
41        }
42        return res;
43    }
44}
45
46var sumCounts = function (A) {
47    let n = A.length;
48    let res = 0n,
49        cur = 0n;
50    let bit = new BIT(n + 10);
51    let seen = new Map();
52    let mod = 1000000007n;
53    for (let i = 0; i < n; i++) {
54        let a = A[i];
55        let j = (seen.has(a) ? seen.get(a) : -1) + 1;
56        let q = BigInt(bit.query(j, i));
57        cur = (cur + q * 2n + BigInt(i - j + 1)) % mod;
58        res = (res + cur) % mod;
59        bit.add(j, i, 1);
60        seen.set(a, i);
61    }
62    return Number(res);
63};