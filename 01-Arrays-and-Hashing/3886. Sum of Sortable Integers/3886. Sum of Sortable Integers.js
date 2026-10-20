1var sortableIntegers = function (nums) {
2    const n = nums.length;
3    const fac = [];
4
5    for (let x = 1; x * x <= n; x++) {
6        if (n % x === 0) {
7            fac.push(x);
8            if (n / x !== x) {
9                fac.push(n / x);
10            }
11        }
12    }
13
14    const target = [...nums].sort((a, b) => a - b);
15
16    const kmp = (nums1, nums2) => {
17        const n = nums1.length,
18            m = nums2.length;
19        const pi = new Array(m).fill(0);
20        let j = 0;
21
22        for (let i = 1; i < m; i++) {
23            while (j > 0 && nums2[i] !== nums2[j]) {
24                j = pi[j - 1];
25            }
26            if (nums2[i] === nums2[j]) {
27                j++;
28            }
29            pi[i] = j;
30        }
31
32        j = 0;
33        for (let i = 0; i < n; i++) {
34            while (j > 0 && nums1[i] !== nums2[j]) {
35                j = pi[j - 1];
36            }
37            if (nums1[i] === nums2[j]) {
38                j++;
39            }
40            if (j === m) {
41                return true;
42            }
43        }
44        return false;
45    };
46
47    const check = (nums1, nums2) => {
48        // Check whether cyclic rotations of nums1 can produce nums2
49        return kmp([...nums1, ...nums1], nums2);
50    };
51
52    let ans = 0;
53
54    for (const d of fac) {
55        let allGood = true;
56        for (let left = 0; left < n; left += d) {
57            const right = left + d - 1;
58
59            if (
60                !check(
61                    nums.slice(left, right + 1),
62                    target.slice(left, right + 1),
63                )
64            ) {
65                allGood = false;
66                break;
67            }
68        }
69        if (allGood) {
70            ans += d;
71        }
72    }
73
74    return ans;
75};