1class Solution {
2public:
3    vector<int> pathExistenceQueries(int n, vector<int>& nums, int maxDiff, vector<vector<int>>& queries) {
4         vector<pair<int,int>> sortedNums;
5        for(int i = 0 ; i < n; i++ )
6        {
7            sortedNums.push_back({nums[i],i});
8        }
9        sort(sortedNums.begin() , sortedNums.end());
10
11        unordered_map<int,int>  point ;
12
13        for(int i = 0 ; i< n; i++ )
14        {
15            point[sortedNums[i].second] = i ; // points[old] = sorted_one
16        }
17
18        vector<int> up(n+1,0); // parent
19        int j =0;
20        for(int i = 0 ; i< n ;i++ ){
21            while(j+1 <n && (sortedNums[j+1].first - sortedNums[i].first)<= maxDiff){
22                j++;
23            }
24            if( j<i)j =i;
25            up[i] = j;
26        }
27        int temp = n;
28
29        int k = 0 ; // log(n)
30        while(temp!=0){
31            k++;
32            temp/=2;
33        }
34
35        vector<vector<int>> dp(n+1 , vector<int>(k+1,0));
36
37        for(int i = 0 ; i< n; i++ ){
38            dp[i][0] = up[i];
39        }
40
41        for(int j = 1 ; j < k ; j++ ){
42            for(int i =0 ; i <n ;i++ )
43            {
44                dp[i][j] = dp[ dp[i][j-1] ][j-1];
45            }
46        }
47
48        vector<int> res;
49
50        for(vector<int>& q : queries )
51        {
52            int u = q[0] , v = q[1];
53
54            if(u==v)
55            {
56                res.push_back(0);
57                continue;
58            }
59
60            int st = min(point[u],point[v]) , en = max(point[u],point[v]);
61
62            if(up[st]==st){
63                res.push_back(-1);
64                continue;
65            }
66            int node = st;
67            int step = 0;
68            for(int i = k-1 ; i>=0 ; i--){
69                if(dp[node][i] < en ){
70                    node = dp[node][i];
71                    step += 1<<i;
72                }
73            }
74            if(up[node] < en )res.push_back(-1);
75            else res.push_back(step+1);
76
77        }
78        return res;
79    }
80};