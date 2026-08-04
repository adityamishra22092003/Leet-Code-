1var findMissingElements = function (nums) {
2    nums.sort((a, b) => a - b);
3    const ans = [];
4    for (let i = 0; i < nums.length - 1; i++) {
5        for (let j = nums[i] + 1; j < nums[i + 1]; j++) {
6            ans.push(j);
7        }
8    }
9    return ans;
10};