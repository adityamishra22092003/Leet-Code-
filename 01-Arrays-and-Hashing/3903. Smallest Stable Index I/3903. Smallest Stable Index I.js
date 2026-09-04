1var firstStableIndex = function (nums, k) {
2    const n = nums.length;
3    for (let i = 0; i < n; i++) {
4        let maxValue = nums[i];
5        let minValue = nums[i];
6        for (let j = 0; j < i; j++) {
7            maxValue = Math.max(maxValue, nums[j]);
8        }
9        for (let j = i + 1; j < n; j++) {
10            minValue = Math.min(minValue, nums[j]);
11        }
12        if (maxValue - minValue <= k) {
13            return i;
14        }
15    }
16    return -1;
17};