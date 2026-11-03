1class Solution {
2public:
3    int minMoves(vector<int>& nums) {
4        long long int sum = 0;
5        for(auto it : nums) sum += it;
6        int mx = *max_element(nums.begin(), nums.end());
7        return nums.size() * mx - sum;
8    }
9};