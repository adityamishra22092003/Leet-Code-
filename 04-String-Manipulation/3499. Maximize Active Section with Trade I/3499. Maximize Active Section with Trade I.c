1var maxActiveSectionsAfterTrade = function (s) {
2    const n = s.length;
3    let cnt1 = 0;
4    for (let c of s) {
5        if (c === 1) cnt1++;
6    }
7
8    const zeroBlocks = [];
9    let i = 0;
10    while (i < n) {
11        const start = i;
12        while (i < n && s[i] === s[start]) {
13            i++;
14        }
15        if (s[start] === 0) {
16            zeroBlocks.push(i - start);
17        }
18    }
19
20    const m = zeroBlocks.length;
21    if (m < 2) {
22        return cnt1;
23    }
24
25    let bestGain = 0; // Optimal Increment
26    for (let j = 0; j < m - 1; j++) {
27        bestGain = Math.max(bestGain, zeroBlocks[j] + zeroBlocks[j + 1]);
28    }
29
30    return cnt1 + bestGain;
31};