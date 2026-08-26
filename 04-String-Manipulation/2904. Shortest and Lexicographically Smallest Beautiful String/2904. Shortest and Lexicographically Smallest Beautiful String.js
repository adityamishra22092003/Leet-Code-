1var shortestBeautifulSubstring = function (s, k) {
2    for (let m = k; m <= s.length; m++) {
3        let ans = ;
4        for (let i = m; i <= s.length; i++) {
5            const t = s.slice(i - m, i);
6            if (
7                (!ans || t < ans) &&
8                [...t].filter((c) => c === 1).length === k
9            ) {
10                ans = t;
11            }
12        }
13        if (ans) return ans;
14    }
15    return ;
16};