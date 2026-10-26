1class Solution:
2    def countIslands(self, grid: List[List[int]], k: int) -> int:
3        m, n = len(grid), len(grid[0])
4        ans = 0
5        def dfs(i: int, j: int) -> int:
6            if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] == 0:
7                return 0
8            s = grid[i][j]
9            grid[i][j] = 0
10            s += dfs(i + 1, j)
11            s += dfs(i - 1, j)
12            s += dfs(i, j + 1)
13            s += dfs(i, j - 1)
14            return s
15        for i in range(m):
16            for j in range(n):
17                if grid[i][j] > 0:
18                    if dfs(i, j) % k == 0:
19                        ans += 1
20        return ans