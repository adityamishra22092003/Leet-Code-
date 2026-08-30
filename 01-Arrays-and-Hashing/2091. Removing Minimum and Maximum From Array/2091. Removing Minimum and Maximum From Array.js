1var minimumDeletions = function (nums) {
2    const n = nums.length;
3
4    // Find the indices of the minimum and maximum values
5    let minidx = 0,
6        maxidx = 0;
7    for (let i = 0; i < n; i++) {
8        if (nums[i] < nums[minidx]) {
9            minidx = i;
10        }
11        if (nums[i] > nums[maxidx]) {
12            maxidx = i;
13        }
14    }
15    const l = Math.min(minidx, maxidx); // The smaller value in the most valuable index
16    const r = Math.max(minidx, maxidx); // The bigger value in the most valuable index
17
18    // Calculate the minimum number of deletions in three cases
19    return Math.min(r + 1, n - l, l + 1 + n - r);
20};