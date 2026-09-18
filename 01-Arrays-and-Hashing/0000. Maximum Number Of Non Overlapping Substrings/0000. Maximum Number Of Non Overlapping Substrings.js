1class Seg {
2    constructor(left = -1, right = -1) {
3        this.left = left;
4        this.right = right;
5    }
6}
7
8var maxNumOfSubstrings = function (s) {
9    const seg = Array.from({ length: 26 }, () => new Seg());
10
11    // Preprocess the left and right endpoints.
12    for (let i = 0; i < s.length; i++) {
13        const charIdx = s.charCodeAt(i) - a.charCodeAt(0);
14
15        if (seg[charIdx].left === -1) {
16            seg[charIdx].left = seg[charIdx].right = i;
17        } else {
18            seg[charIdx].right = i;
19        }
20    }
21
22    for (let i = 0; i < 26; i++) {
23        if (seg[i].left !== -1) {
24            let j = seg[i].left;
25
26            while (j <= seg[i].right) {
27                const charIdx = s.charCodeAt(j) - a.charCodeAt(0);
28
29                if (
30                    seg[i].left <= seg[charIdx].left &&
31                    seg[charIdx].right <= seg[i].right
32                ) {
33                } else {
34                    seg[i].left = Math.min(seg[i].left, seg[charIdx].left);
35                    seg[i].right = Math.max(seg[i].right, seg[charIdx].right);
36                    j = seg[i].left;
37                }
38
39                j++;
40            }
41        }
42    }
43
44    // Greedily select intervals.
45    seg.sort((a, b) => {
46        if (a.right === b.right) {
47            return b.left - a.left;
48        }
49        return a.right - b.right;
50    });
51
52    const ans = [];
53    let end = -1;
54
55    for (const segment of seg) {
56        const { left, right } = segment;
57
58        if (left === -1) {
59            continue;
60        }
61
62        if (end === -1 || left > end) {
63            end = right;
64            ans.push(s.slice(left, right + 1));
65        }
66    }
67
68    return ans;
69};