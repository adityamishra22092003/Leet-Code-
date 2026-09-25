1var braceExpansionII = function (expression) {
2    let idx = 0;
3    const n = expression.length;
4
5    // Check whether it is a letter
6    const isLetter = (c) => {
7        return c >= a && c <= z;
8    };
9
10    // item -> letter | { expr }
11    const item = () => {
12        let ret = new Set();
13        if (expression[idx] === {) {
14            idx++;
15            ret = expr();
16        } else {
17            ret = new Set([expression[idx]]);
18        }
19        idx++;
20        return ret;
21    };
22
23    // term -> item | item term
24    const term = () => {
25        // Initialize an empty set and take its Cartesian product with subsequent results
26        let ret = new Set([]);
27        // An item starts with { or a lowercase letter; continue matching only when this condition is met
28        while (
29            idx < n &&
30            (expression[idx] === { || isLetter(expression[idx]))
31        ) {
32            const sub = item();
33            const tmp = new Set();
34            for (const left of ret) {
35                for (const right of sub) {
36                    tmp.add(left + right);
37                }
38            }
39            ret = tmp;
40        }
41        return ret;
42    };
43
44    // expr -> term | term, expr
45    const expr = () => {
46        const ret = new Set();
47        while (true) {
48            // Take the union with the result of term()
49            for (const item of term()) {
50                ret.add(item);
51            }
52            // Continue if a comma is matched; otherwise, stop matching
53            if (idx < n && expression[idx] === ,) {
54                idx++;
55                continue;
56            } else {
57                break;
58            }
59        }
60        return ret;
61    };
62
63    const result = Array.from(expr());
64    return result.sort();
65};