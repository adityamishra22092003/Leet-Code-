1var maximumSaleItems = function (items, budget) {
2    items.sort((a, b) => a[1] - b[1]);
3    let mx = 0;
4    for (const [factor] of items) {
5        mx = Math.max(mx, factor);
6    }
7    const freq = new Int32Array(mx + 1);
8    for (const [factor] of items) {
9        freq[factor]++;
10    }
11    for (let i = 1; i <= mx; i++) {
12        if (freq[i] > 0) {
13            for (let j = i * 2; j <= mx; j += i) {
14                freq[i] += freq[j];
15            }
16        }
17    }
18
19    const mn = items[0][1];
20    let ans = 0;
21    for (const [factor, price] of items) {
22        if (price > mn * 2) {
23            break;
24        }
25        const cnt = freq[factor] - 1;
26        const take = Math.min(cnt, Math.floor(budget / price));
27        ans += take * 2;
28        budget -= take * price;
29    }
30    ans += Math.floor(budget / mn);
31    return ans;
32};