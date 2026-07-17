1var gcdValues = function (nums, queries) {
2    const m = Math.max(...nums);
3    const cnt = new Array(m + 1).fill(0);
4    for (const num of nums) {
5        cnt[num]++;
6    }
7    for (let i = 1; i <= m; i++) {
8        for (let j = i * 2; j <= m; j += i) {
9            cnt[i] += cnt[j];
10        }
11    }
12    for (let i = 1; i <= m; i++) {
13        cnt[i] = Math.floor((cnt[i] * (cnt[i] - 1)) / 2);
14    }
15    for (let i = m; i >= 1; i--) {
16        for (let j = i * 2; j <= m; j += i) {
17            cnt[i] -= cnt[j];
18        }
19    }
20    for (let i = 1; i <= m; i++) {
21        cnt[i] += cnt[i - 1];
22    }
23    const ans = [];
24    for (let q of queries) {
25        q++;
26        let left = 1,
27            right = m;
28        while (left < right) {
29            const mid = Math.floor((left + right) / 2);
30            if (cnt[mid] >= q) {
31                right = mid;
32            } else {
33                left = mid + 1;
34            }
35        }
36        ans.push(left);
37    }
38    return ans;
39};