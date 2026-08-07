1var smallestNumber = function (num, t) {
2    let temp = t;
3    for (let i = 2; i <= 9; i++) {
4        while (temp % i === 0) {
5            temp /= i;
6        }
7    }
8    if (temp > 1) {
9        return -1;
10    }
11
12    const n = num.length;
13    const rem = new Array(n + 1);
14    rem[0] = t;
15    let pos = n - 1;
16
17    const numArr = num.split();
18    for (let i = 0; i < n; i++) {
19        if (numArr[i] === 0) {
20            pos = i;
21            break;
22        }
23        rem[i + 1] = Math.floor(rem[i] / gcd(rem[i], parseInt(numArr[i])));
24    }
25
26    if (rem[n] === 1) {
27        return num;
28    }
29
30    for (let i = pos; i >= 0; i--) {
31        while (true) {
32            numArr[i] = String.fromCharCode(numArr[i].charCodeAt(0) + 1);
33            if (numArr[i] > 9) {
34                break;
35            }
36
37            let tNow = Math.floor(rem[i] / gcd(rem[i], parseInt(numArr[i])));
38            let k = 9;
39
40            for (let j = n - 1; j > i; j--) {
41                while (tNow % k !== 0) {
42                    k--;
43                }
44                tNow = Math.floor(tNow / k);
45                numArr[j] = String.fromCharCode(0.charCodeAt(0) + k);
46            }
47
48            if (tNow === 1) {
49                return numArr.join();
50            }
51        }
52    }
53
54    let ans = [];
55    let originalT = t;
56    for (let i = 9; i > 1; i--) {
57        while (originalT % i === 0) {
58            ans.push(String.fromCharCode(0.charCodeAt(0) + i));
59            originalT = Math.floor(originalT / i);
60        }
61    }
62
63    const padding = Math.max(n + 1 - ans.length, 0);
64    for (let i = 0; i < padding; i++) {
65        ans.push(1);
66    }
67
68    return ans.reverse().join();
69};
70
71function gcd(a, b) {
72    while (b !== 0) {
73        const temp = b;
74        b = a % b;
75        a = temp;
76    }
77    return a;
78}