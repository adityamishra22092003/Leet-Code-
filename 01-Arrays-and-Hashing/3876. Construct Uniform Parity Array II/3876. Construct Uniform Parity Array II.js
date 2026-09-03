1var uniformArray = function (nums1) {
2    let mn = nums1[0];
3    let hasOdd = false;
4    for (const v of nums1) {
5        if (v < mn) {
6            mn = v;
7        }
8        if (v & 1) {
9            hasOdd = true;
10        }
11    }
12    if (mn & 1) {
13        return true;
14    }
15    return !hasOdd;
16};