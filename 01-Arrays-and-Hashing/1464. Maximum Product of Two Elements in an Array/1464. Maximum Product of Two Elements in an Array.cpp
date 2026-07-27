1class Solution {
2public:
3    int maxProduct(vector<int>& nums) {
4        int n = nums.size();
5        int ans = 0;
6        int curMax = nums[0];
7
8        for (int i = 1; i < n; i++) {
9            ans = max(ans, (curMax - 1) * (nums[i] - 1));
10            curMax = max(curMax, nums[i]);
11        }
12
13        return ans;
14    }
15};