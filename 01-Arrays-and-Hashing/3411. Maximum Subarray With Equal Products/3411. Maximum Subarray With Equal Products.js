1var maxLength = function (nums) {
2    let res = 0;
3    const gcd = (a, b) => {
4        while (b !== 0) {
5            [a, b] = [b, a % b];
6        }
7        return a;
8    };
9
10    for (let i = 0; i < nums.length; i++) {
11        let prodVal = nums[i];
12        let gcdVal = nums[i];
13        let lcmVal = nums[i];
14        for (let j = i + 1; j < nums.length; j++) {
15            prodVal = prodVal * nums[j];
16            gcdVal = gcd(gcdVal, nums[j]);
17            lcmVal = (lcmVal * nums[j]) / gcd(lcmVal, nums[j]);
18            if (prodVal > gcdVal * lcmVal) {
19                break;
20            }
21            if (prodVal === gcdVal * lcmVal) {
22                res = Math.max(res, j - i + 1);
23            }
24        }
25    }
26    return res;
27};