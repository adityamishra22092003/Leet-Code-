1var maxAlternatingSum = function (nums) {
2    const n = nums.length;
3    for (let i = 0; i < n; i++) {
4        nums[i] *= nums[i];
5    }
6    nums.sort((a, b) => a - b);
7
8    let ans = 0;
9    for (let i = 0; i < Math.floor(n / 2); i++) {
10        ans -= nums[i];
11    }
12    for (let i = Math.floor(n / 2); i < n; i++) {
13        ans += nums[i];
14    }
15    return ans;
16};