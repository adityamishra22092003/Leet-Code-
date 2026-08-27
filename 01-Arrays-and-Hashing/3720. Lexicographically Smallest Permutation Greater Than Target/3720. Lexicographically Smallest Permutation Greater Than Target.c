1var lexGreaterPermutation = function (s, target) {
2    const cnt = new Array(26).fill(0);
3    for (const c of s) {
4        cnt[c.charCodeAt(0) - 97]++;
5    }
6
7    let res = ;
8    const n = target.length;
9
10    for (let i = 0; i < n; i++) {
11        const targetChar = target.charCodeAt(i) - 97;
12
13        // Case 1: First try to place the same character as target[i] at the current position
14        if (cnt[targetChar] > 0) {
15            cnt[targetChar]--;
16            // Check if the remaining characters can form a string greater than target[i+1:]
17            if (canFormGreater(cnt, target, i + 1)) {
18                res += target[i];
19                continue;
20            }
21            // Cannot form a larger string, backtrack
22            cnt[targetChar]++;
23        }
24
25        // Case 2: Place a character greater than target[i] at the current position
26        for (let j = targetChar + 1; j < 26; j++) {
27            if (cnt[j] > 0) {
28                cnt[j]--;
29                res += String.fromCharCode(97 + j);
30                // Fill remaining positions with the smallest lexicographical order
31                res += getMinString(cnt);
32                return res;
33            }
34        }
35
36        // No feasible solution found, return directly
37        return ;
38    }
39
40    return ;
41};
42
43// Check if the remaining characters can form a string greater than the suffix.
44function canFormGreater(cnt, target, start) {
45    const maxStr = getMaxString(cnt);
46    const suffix = target.substring(start);
47    return maxStr > suffix;
48}
49
50// Get the maximum lexicographical string (in descending order)
51function getMaxString(cnt) {
52    let res = ;
53    for (let i = 25; i >= 0; i--) {
54        res += String.fromCharCode(97 + i).repeat(cnt[i]);
55    }
56    return res;
57}
58
59// Get the lexicographically smallest string (in ascending order)
60function getMinString(cnt) {
61    let res = ;
62    for (let i = 0; i < 26; i++) {
63        res += String.fromCharCode(97 + i).repeat(cnt[i]);
64    }
65    return res;
66}