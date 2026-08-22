class Solution {
public:
    static inline int dp[1001][2] = {{0, 1}};

    bool init = [] {
        for (int i = 1; i <= 1000; i++) {
            dp[i][0] = dp[i / 10][0] + i % 10;
            dp[i][1] = dp[i / 10][1] * (i % 10);
        }
        return 0;
    }();

    bool checkDivisibility(int n) {
        auto [a, b] = div(n, 1000);
        return n % (dp[a][0] + dp[b][0] + dp[a][1] * dp[b][1]) == 0;
    }
};