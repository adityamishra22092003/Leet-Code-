1var longestMonotonicSubarray = function(nums) {
2    let best = 1, up = 1, down = 1;
3    for (let i = 1; i < nums.length; i++) {
4        up = nums[i - 1] < nums[i] ? up + 1 : 1;  // increasing streak ending at nums[i]
5        down = nums[i - 1] > nums[i] ? down + 1 : 1;  // decreasing streak ending at nums[i]
6        best = Math.max(best, up, down);
7    }
8    return best;
9};