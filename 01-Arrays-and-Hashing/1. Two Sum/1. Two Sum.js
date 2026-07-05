1var twoSum = function (nums, target) {
2    for (let i = 0; i < nums.length; i++) {
3        for (let j = i + 1; j < nums.length; j++) {
4            if (nums[j] === target - nums[i]) {
5                return [i, j];
6            }
7        }
8    }
9    // Return an empty array if no solution is found
10    return [];
11};