1class Solution {
2public:
3    vector<string> createGrid(int m, int n) {
4        vector<string>grid(m,string(n,'#'));
5
6        for(int i=0;i<n;i++){
7            grid[0][i]='.';
8        }
9        for(int j=0;j<m;j++){
10            grid[j][n-1]='.';
11        }
12        return grid;
13    }
14};