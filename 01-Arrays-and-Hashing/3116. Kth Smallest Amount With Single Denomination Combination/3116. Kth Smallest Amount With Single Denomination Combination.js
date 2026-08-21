1var findKthSmallest = function (coins, k) {
2    coins.sort((a, b) => a - b);
3    const n = coins.length;
4    const m = 1 << n;
5
6    let l = BigInt(k);
7    let r = BigInt(coins[0]) * BigInt(k) + 1n;
8
9    const bitCount = new Array(m).fill(0);
10    const lcm = new Array(m).fill(0n);
11
12    const gcd = (a, b) => {
13        a = a < 0n ? -a : a;
14        b = b < 0n ? -b : b;
15        while (b !== 0n) {
16            [a, b] = [b, a % b];
17        }
18        return a;
19    };
20
21    for (let mask = 1; mask < m; mask++) {
22        let curLcm = 1n;
23        for (let i = 0; i < n; i++) {
24            if ((mask >> i) & 1) {
25                const coin = BigInt(coins[i]);
26                const g = gcd(curLcm, coin);
27                const tmp = curLcm / g;
28
29                if (tmp <= r / coin) {
30                    curLcm = tmp * coin;
31                } else {
32                    curLcm = r + 1n;
33                    break;
34                }
35                bitCount[mask]++;
36            }
37        }
38        lcm[mask] = curLcm;
39    }
40
41    const count = (x) => {
42        let res = 0n;
43        for (let mask = 1; mask < m; mask++) {
44            if (lcm[mask] > x) continue;
45
46            if (bitCount[mask] & 1) {
47                res += x / lcm[mask];
48            } else {
49                res -= x / lcm[mask];
50            }
51        }
52        return res;
53    };
54
55    while (l < r) {
56        const mid = (l + r) / 2n;
57        if (count(mid) >= BigInt(k)) {
58            r = mid;
59        } else {
60            l = mid + 1n;
61        }
62    }
63
64    return Number(l);
65};