class Solution {
public:
    int maximumSaleItems(vector<vector<int>>& items, int budget) {
        int n = items.size();
        vector<pair<int, int>> nums(n);
        for (int i = 0; i < n; i++) {
            int cnt = 1;
            for (int j = 0; j < n; j++) {
                if (i == j)
                    continue;
                if (items[j][0] % items[i][0] == 0)
                    cnt++;
            }
            nums[i] = {cnt, items[i][1]};
        }
        vector<int> dp(budget + 1, 0);
        for (int i = 0; i < n; i++) {
            for (int j = budget; j >= nums[i].second; j--) {
                dp[j] = max(dp[j], dp[j - nums[i].second] + nums[i].first);
            }
        }
        for (int i = 0; i < n; i++) {
            for (int j = nums[i].second; j <= budget; j++) {
                dp[j] = max(dp[j], dp[j - nums[i].second] + 1);
            }
        }
        return dp[budget];
    }
};