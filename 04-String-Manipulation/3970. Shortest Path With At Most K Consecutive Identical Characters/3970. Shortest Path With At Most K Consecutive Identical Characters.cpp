1class Solution {
2public:
3    int shortestPath(int n, vector<vector<int>>& edges, string labels, int k) {
4        vector<vector<pair<int, int>>> g(n);
5        for (auto& e : edges) {
6            g[e[0]].emplace_back(e[1], e[2]);
7        }
8
9        vector dis(n, vector<long long>(k + 1, INT_MAX));
10        // {shortest path length, node index, number of consecutive identical
11        // letters at the end}
12        priority_queue<tuple<long long, int, int>,
13                       vector<tuple<long long, int, int>>, greater<>>
14            pq;
15
16        dis[0][1] = 0;
17        pq.emplace(0, 0, 1);
18
19        while (!pq.empty()) {
20            auto [d, x, cnt] = pq.top();
21            pq.pop();
22
23            if (d > dis[x][cnt]) {
24                continue;
25            }
26            if (x == n - 1) {
27                return d;
28            }
29
30            for (auto [y, w] : g[x]) {
31                int new_cnt = labels[x] == labels[y] ? cnt + 1 : 1;
32                if (new_cnt > k) {
33                    continue;
34                }
35
36                long long nd = d + w;
37                if (nd < dis[y][new_cnt]) {
38                    dis[y][new_cnt] = nd;
39                    pq.emplace(nd, y, new_cnt);
40                }
41            }
42        }
43
44        return -1;
45    }
46};