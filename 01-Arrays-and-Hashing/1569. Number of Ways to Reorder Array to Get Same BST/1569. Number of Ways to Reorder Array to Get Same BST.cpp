1class Solution {
2public:
3    int numOfWays(vector<int>& nums) {
4        int m = nums.size();
5        // Table of Pascal's triangle
6        table.resize(m + 1);
7        for(int i = 0; i < m + 1; ++i) {
8            table[i] = vector<long long>(i + 1, 1);
9            for(int j = 1; j < i; ++j) {
10                table[i][j] = (table[i - 1][j - 1] + table[i - 1][j]) % mod;
11            }
12        }
13        
14        return (dfs(nums) - 1) % mod;
15    }
16    
17private:
18    vector<vector<long long>> table;
19    long long mod = 1e9 + 7;
20    
21    long long dfs(vector<int> &nums){
22        int m = nums.size();
23        if(m < 3) {
24            return 1;
25        }
26
27        vector<int> leftNodes, rightNodes;
28        for(int i = 1; i < m; ++i){
29            if (nums[i] < nums[0]) {
30                leftNodes.push_back(nums[i]);
31            } else {
32                rightNodes.push_back(nums[i]);
33            }
34        }
35		
36        long long leftWays = dfs(leftNodes) % mod;
37        long long rightWays = dfs(rightNodes) % mod;
38		
39        return (((leftWays * rightWays) % mod) * table[m - 1][leftNodes.size()]) % mod;
40    }
41};