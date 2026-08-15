class Solution {
public:
    int longestSubsequence(vector<int>& nums) {
        int n = nums.size();

        int total_xor = 0;

        for (int i = 0; i < n; i++) {
            total_xor ^= nums[i];
        }

        if (total_xor > 0)
            return n;

        if (*max_element(nums.begin(), nums.end()) == 0)
            return 0;

        return n - 1;
    }
};