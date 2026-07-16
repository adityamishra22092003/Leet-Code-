1var gcdSum = function (nums) {
2    const gcd = (a, b) => {
3        while (b !== 0) {
4            [a, b] = [b, a % b];
5        }
6        return a;
7    };
8
9    const n = nums.length;
10    const mx = new Array(n);
11    let prefixMax = -Infinity;
12    for (let i = 0; i < n; i++) {
13        prefixMax = Math.max(prefixMax, nums[i]);
14        mx[i] = prefixMax;
15    }
16
17    const prefixGcd = new Array(n);
18    for (let i = 0; i < n; i++) {
19        prefixGcd[i] = gcd(nums[i], mx[i]);
20    }
21
22    prefixGcd.sort((a, b) => a - b);
23    let ans = 0;
24    let left = 0,
25        right = n - 1;
26    while (left < right) {
27        ans += gcd(prefixGcd[left], prefixGcd[right]);
28        left++;
29        right--;
30    }
31    return ans;
32};