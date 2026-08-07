1class Solution {
2public:
3    using ll = long long;
4
5    long long minCost(int m, int n, vector<vector<int>>& penalty) {
6        int total = m * n * 2;
7        vector<ll> d(total, 1e18);
8
9        priority_queue<
10            tuple<ll, int, int, int>,
11            vector<tuple<ll, int, int, int>>,
12            greater<tuple<ll, int, int, int>>
13        > pq;
14
15        auto id = [&](int r, int c, int p) {
16            return (r * n + c) * 2 + p;
17        };
18
19        d[id(0, 0, 1)] = 1;
20        pq.push({1, 0, 0, 1});
21
22        int dr[] = {0, 1, 0, -1};
23        int dc[] = {1, 0, -1, 0};
24
25        while (!pq.empty()) {
26            auto [cost, r, c, p] = pq.top();
27            pq.pop();
28
29            if (cost != d[id(r, c, p)])
30                continue;
31
32            if (r == m - 1 && c == n - 1)
33                return cost;
34
35            int nextP = 1 - p;
36
37            // Stay and switch phase
38            ll newCost = cost + penalty[r][c];
39            if (newCost < d[id(r, c, nextP)]) {
40                d[id(r, c, nextP)] = newCost;
41                pq.push({newCost, r, c, nextP});
42            }
43
44            // Move to neighbours
45            for (int dir = 0; dir < 4; dir++) {
46                int nr = r + dr[dir];
47                int nc = c + dc[dir];
48
49                if (nr < 0 || nr >= m || nc < 0 || nc >= n)
50                    continue;
51
52                ll moveCost = 1LL * (nr + 1) * (nc + 1);
53
54                bool allowed = false;
55                if (p) {
56                    if (dir == 0 || dir == 1)
57                        allowed = true;
58                } else {
59                    if (dir == 2 || dir == 3)
60                        allowed = true;
61                }
62
63                if (!allowed)
64                    moveCost += penalty[r][c];
65
66                newCost = cost + moveCost;
67
68                if (newCost < d[id(nr, nc, nextP)]) {
69                    d[id(nr, nc, nextP)] = newCost;
70                    pq.push({newCost, nr, nc, nextP});
71                }
72            }
73        }
74
75        return -1;
76    }
77};