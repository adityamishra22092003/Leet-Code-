1const lexicographicallySmallestArray = (A, limit) => {
2    const sort = A.slice().sort((a, b) => a - b);
3    const B = [];
4    const map = new Map();
5    let id = -1;
6
7    for (let i = 0; i < sort.length; i++) {
8        if (i === 0 || sort[i] - sort[i - 1] > limit) {
9            B.push([]);
10            id++;
11        }
12
13        B[id].push(sort[i]);
14        map.set(sort[i], id);
15    }
16
17    const idx = new Int32Array(B.length);
18
19    for (let i = 0; i < A.length; i++) {
20        const cur = map.get(A[i]);
21        A[i] = B[cur][idx[cur]];
22        idx[cur]++;
23    }
24
25    return A;
26};