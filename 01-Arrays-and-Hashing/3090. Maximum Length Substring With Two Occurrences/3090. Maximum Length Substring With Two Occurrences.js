1var maximumLengthSubstring = function (s) {
2    const count = new Array(26).fill(0);
3    let left = 0;
4    let res = 0;
5
6    for (let right = 0; right < s.length; right++) {
7        const ch = s.charCodeAt(right) - 97;
8        count[ch]++;
9
10        while (count[ch] > 2) {
11            const ch2 = s.charCodeAt(left) - 97;
12            count[ch2]--;
13            left++;
14        }
15
16        res = Math.max(res, right - left + 1);
17    }
18    return res;
19};