1var validSequence = function (word1, word2) {
2    let n = word1.length,
3        m = word2.length;
4    let last = new Array(m).fill(-1);
5    let j = m - 1;
6    for (let i = n - 1; i >= 0; --i) {
7        if (j >= 0 && word1[i] === word2[j]) {
8            last[j] = i;
9            j -= 1;
10        }
11    }
12    let res = [];
13    let skip = 0;
14    j = 0;
15    for (let i = 0; i < n; ++i) {
16        if (j === m) break;
17        if (
18            word1[i] === word2[j] ||
19            (skip === 0 && (j === m - 1 || i < last[j + 1]))
20        ) {
21            skip += word1[i] !== word2[j] ? 1 : 0;
22            res.push(i);
23            j += 1;
24        }
25    }
26    return j === m ? res : [];
27};