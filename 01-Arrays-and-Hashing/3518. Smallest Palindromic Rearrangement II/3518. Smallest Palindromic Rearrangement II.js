1/**
2 * @param {string} s
3 * @param {number} k
4 * @return {string}
5 */
6var smallestPalindrome = function(s, k) {
7    const freq = new Array(26).fill(0);
8    for (let i = 0; i < s.length; i++) {
9        freq[s.charCodeAt(i) - 97]++;
10    }
11    
12    const half = new Array(26).fill(0);
13    let mid = ;
14    let m = 0;
15    
16    for (let i = 0; i < 26; i++) {
17        if (freq[i] % 2 !== 0) {
18            mid += String.fromCharCode(i + 97);
19        }
20        half[i] = Math.floor(freq[i] / 2);
21        m += half[i];
22    }
23    
24    const getWays = (f, targetK) => {
25        let ways = 1;
26        let currLen = 0;
27        for (let i = 0; i < 26; i++) {
28            const count = f[i];
29            if (count > 0) {
30                currLen += count;
31                let n = currLen;
32                let r = count;
33                
34                if (r > n - r) r = n - r;
35                let curNCr = 1;
36                
37                for (let j = 1; j <= r; j++) {
38                    curNCr = Math.floor(curNCr * (n - j + 1) / j);
39                    if (curNCr > targetK) {
40                        curNCr = targetK + 1;
41                        break;
42                    }
43                }
44                ways *= curNCr;
45                if (ways > targetK) return targetK + 1;
46            }
47        }
48        return ways;
49    };
50    
51    if (getWays(half, k) < k) {
52        return ;
53    }
54    
55    let firstHalf = ;
56    for (let i = 0; i < m; i++) {
57        for (let c = 0; c < 26; c++) {
58            if (half[c] > 0) {
59                half[c]--;
60                const ways = getWays(half, k);
61                
62                if (ways >= k) {
63                    firstHalf += String.fromCharCode(c + 97);
64                    break;
65                } else {
66                    k -= ways;
67                    half[c]++;
68                }
69            }
70        }
71    }
72    
73    return firstHalf + mid + firstHalf.split().reverse().join();
74};