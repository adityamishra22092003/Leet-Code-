1class Solution {
2public:
3    int largestInteger(int n, int s) {
4        int ans = 0;
5        while(n--) {
6            ans = ans * 10 + min(9, s);
7            s -= min(9, s);
8        }
9        if(s) return -1;
10        return ans;
11    }
12};