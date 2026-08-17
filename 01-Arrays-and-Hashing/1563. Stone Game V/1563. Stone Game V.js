1var stoneGameV = function (stoneValue) {
2    const n = stoneValue.length;
3    const f = Array(n)
4        .fill()
5        .map(() => Array(n).fill(0));
6
7    const dfs = (left, right) => {
8        if (left === right) {
9            return 0;
10        }
11        if (f[left][right] !== 0) {
12            return f[left][right];
13        }
14
15        let sum = 0;
16        for (let i = left; i <= right; i++) {
17            sum += stoneValue[i];
18        }
19        let suml = 0;
20        for (let i = left; i < right; ++i) {
21            suml += stoneValue[i];
22            const sumr = sum - suml;
23            if (suml < sumr) {
24                f[left][right] = Math.max(f[left][right], dfs(left, i) + suml);
25            } else if (suml > sumr) {
26                f[left][right] = Math.max(
27                    f[left][right],
28                    dfs(i + 1, right) + sumr,
29                );
30            } else {
31                f[left][right] = Math.max(
32                    f[left][right],
33                    Math.max(dfs(left, i), dfs(i + 1, right)) + suml,
34                );
35            }
36        }
37        return f[left][right];
38    };
39
40    return dfs(0, n - 1);
41};