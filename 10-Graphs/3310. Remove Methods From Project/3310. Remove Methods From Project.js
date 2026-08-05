1var remainingMethods = function (n, k, invocations) {
2    const edges = Array.from({ length: n }, () => []);
3    const inDegree = new Array(n).fill(0);
4
5    for (const [u, v] of invocations) {
6        edges[u].push(v);
7        inDegree[v]++;
8    }
9
10    const queue = new Queue([k]);
11    const suspicious = new Uint8Array(n);
12    suspicious[k] = 1;
13
14    while (!queue.isEmpty()) {
15        const u = queue.pop();
16        for (let i = 0; i < edges[u].length; i++) {
17            const v = edges[u][i];
18            inDegree[v]--;
19
20            if (suspicious[v] === 0) {
21                queue.push(v);
22                suspicious[v] = 1;
23            }
24        }
25    }
26
27    let canRemoveAll = true;
28    const remaining = [];
29
30    for (let i = 0; i < n; i++) {
31        if (suspicious[i] === 1 && inDegree[i] > 0) {
32            canRemoveAll = false;
33            break;
34        } else if (suspicious[i] === 0) {
35            remaining.push(i);
36        }
37    }
38
39    if (!canRemoveAll) {
40        return Array.from({ length: n }, (_, i) => i);
41    }
42
43    return remaining;
44};