1var longestRepeating = function (s, queryCharacters, queryIndices) {
2    const n = s.length;
3    const pre = new Array(4 * n).fill(0);
4    const suf = new Array(4 * n).fill(0);
5    const maxLen = new Array(4 * n).fill(0);
6    const leftChar = new Array(4 * n).fill();
7    const rightChar = new Array(4 * n).fill();
8
9    const pushUp = (u, l, r) => {
10        const mid = (l + r) >> 1;
11        const leftLen = mid - l + 1,
12            rightLen = r - mid;
13        const left = u << 1,
14            right = (u << 1) | 1;
15        leftChar[u] = leftChar[left];
16        rightChar[u] = rightChar[right];
17        pre[u] = pre[left];
18        if (pre[left] === leftLen && rightChar[left] === leftChar[right]) {
19            pre[u] = pre[left] + pre[right];
20        }
21        suf[u] = suf[right];
22        if (suf[right] === rightLen && rightChar[left] === leftChar[right]) {
23            suf[u] = suf[right] + suf[left];
24        }
25        maxLen[u] = Math.max(maxLen[left], maxLen[right]);
26        if (rightChar[left] === leftChar[right]) {
27            maxLen[u] = Math.max(maxLen[u], suf[left] + pre[right]);
28        }
29    };
30
31    const build = (u, l, r) => {
32        if (l === r) {
33            pre[u] = 1;
34            suf[u] = 1;
35            maxLen[u] = 1;
36            leftChar[u] = s[l];
37            rightChar[u] = s[l];
38            return;
39        }
40        const mid = (l + r) >> 1;
41        build(u << 1, l, mid);
42        build((u << 1) | 1, mid + 1, r);
43        pushUp(u, l, r);
44    };
45
46    const update = (u, l, r, pos, ch) => {
47        if (l === r) {
48            leftChar[u] = ch;
49            rightChar[u] = ch;
50            return;
51        }
52        const mid = (l + r) >> 1;
53        if (pos <= mid) {
54            update(u << 1, l, mid, pos, ch);
55        } else {
56            update((u << 1) | 1, mid + 1, r, pos, ch);
57        }
58        pushUp(u, l, r);
59    };
60
61    build(1, 0, n - 1);
62    const k = queryIndices.length;
63    const ans = new Array(k);
64    for (let i = 0; i < k; i++) {
65        update(1, 0, n - 1, queryIndices[i], queryCharacters[i]);
66        ans[i] = maxLen[1];
67    }
68    return ans;
69};