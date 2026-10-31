1class Solution {
2public:
3    int n, m;
4    long long int mod = 1e9 + 7;
5    vector<vector<int>> nums;
6    vector<vector<vector<long long int>>> dp;
7    long long int dfs(int i, int j, int dir) {
8        if(i >= n || j >= m){
9            return 0;
10        }
11        if(i == n-1 && j == m-1){
12            return 1;
13        }
14        if(dp[i][j][dir] != -1){
15            return dp[i][j][dir];
16        }
17        if(nums[i][j] == 1){
18            if(dir == 0){
19                dp[i][j][dir] = dfs(i+1, j, 1);
20            }else{
21                dp[i][j][dir] = dfs(i, j+1, 0);
22            }
23        }else{
24            dp[i][j][dir] = (dfs(i, j+1, 0) + dfs(i+1, j, 1)) % mod;
25        }
26        return dp[i][j][dir];
27    }
28
29    int uniquePaths(vector<vector<int>>& nums) {
30        this->nums = nums;
31        n = nums.size(), m = nums[0].size();
32        dp.assign(n, vector<vector<long long int>>(m, {-1, -1}));
33        return dfs(0, 0, 0);
34    }
35};