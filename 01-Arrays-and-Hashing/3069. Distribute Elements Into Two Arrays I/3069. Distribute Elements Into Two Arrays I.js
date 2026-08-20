1var resultArray = function (nums) {
2    const arr1 = [nums[0]];
3    const arr2 = [nums[1]];
4    for (let i = 2; i < nums.length; i++) {
5        if (arr1[arr1.length - 1] > arr2[arr2.length - 1]) {
6            arr1.push(nums[i]);
7        } else {
8            arr2.push(nums[i]);
9        }
10    }
11    return arr1.concat(arr2);
12};