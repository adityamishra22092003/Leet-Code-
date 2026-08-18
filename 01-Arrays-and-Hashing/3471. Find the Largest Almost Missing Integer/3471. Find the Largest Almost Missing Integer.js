1var largestInteger = function (nums, k) {
2    let n = nums.length;
3    if (n === k) {
4        return Math.max(...nums);
5    }
6    let count = new Array(51).fill(0);
7    for (let x of nums) {
8        count[x]++;
9    }
10    if (k === 1) {
11        for (let i = 50; i >= 0; --i) {
12            if (count[i] === 1) {
13                return i;
14            }
15        }
16        return -1;
17    }
18    let res = -1;
19    if (count[nums[0]] === 1) {
20        res = Math.max(res, nums[0]);
21    }
22    if (count[nums[n - 1]] === 1) {
23        res = Math.max(res, nums[n - 1]);
24    }
25    return res;
26};