1var maxSum = function (nums, k) {
2    const MOD = 1000000007;
3    const cnt = new Array(30).fill(0);
4
5    // Count the number of 1 bits at each position
6    for (const num of nums) {
7        for (let i = 0; i < 30; i++) {
8            if (num & (1 << i)) {
9                cnt[i]++;
10            }
11        }
12    }
13
14    let res = 0;
15    for (let i = 0; i < k; i++) {
16        let cur = 0;
17        // Construct the current number from the most significant bit to the least significant bit
18        for (let j = 29; j >= 0; j--) {
19            if (cnt[j] > 0) {
20                cur += Math.pow(2, j);
21                cnt[j]--;
22            }
23        }
24
25        const curBigInt = BigInt(cur);
26        res = Number((BigInt(res) + curBigInt * curBigInt) % BigInt(MOD));
27    }
28
29    return res;
30};