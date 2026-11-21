1var findSubtreeSizes = function(parent, s) {
2    const n = parent.length;
3    const children = Array.from({ length: n }, () => []);
4    for (let x = 1; x < n; x++) children[parent[x]].push(x);
5    const size = new Array(n).fill(1), above = new Array(n), last = new Array(26).fill(-1);  // last[c]: the deepest node with letter c on the path from the root
6    const stack = [0];  // x enters x, ~x leaves it: no recursion, so no stack overflow on a deep tree
7    while (stack.length) {
8        let x = stack.pop();
9        if (x >= 0) {
10            const c = s.charCodeAt(x) - 97;
11            above[x] = last[c];  // the closest ancestor with the same letter, or -1
12            last[c] = x;
13            stack.push(~x);  // leave x after all its children
14            for (const child of children[x]) stack.push(child);
15        } else {
16            x = ~x;
17            last[s.charCodeAt(x) - 97] = above[x];
18            if (x > 0) size[above[x] >= 0 ? above[x] : parent[x]] += size[x];  // the root has no parent
19        }
20    }
21    return size;
22};