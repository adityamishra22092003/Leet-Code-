1class UnionFind:
2    def __init__(self, n):
3        self.parent = [-1] * n
4        self.size = [1] * n
5
6    def _find(self, node):
7        # Find root of component with path compression
8        if self.parent[node] == -1:
9            return node
10        self.parent[node] = self._find(self.parent[node])
11        return self.parent[node]
12
13    def _union(self, node_1, node_2):
14        # Union by size
15        root_1 = self._find(node_1)
16        root_2 = self._find(node_2)
17
18        if root_1 == root_2:
19            return
20
21        # Merge smaller component into larger one
22        if self.size[root_1] > self.size[root_2]:
23            self.parent[root_2] = root_1
24            self.size[root_1] += self.size[root_2]
25        else:
26            self.parent[root_1] = root_2
27            self.size[root_2] += self.size[root_1]
28
29
30class Solution:
31    def countCompleteComponents(self, n: int, edges: List[List[int]]) -> int:
32        # Initialize Union Find and edge counter
33        dsu = UnionFind(n)
34        edge_count = {}
35
36        # Connect components using edges
37        for edge in edges:
38            dsu._union(edge[0], edge[1])
39
40        # Count edges in each component
41        for edge in edges:
42            root = dsu._find(edge[0])
43            edge_count[root] = edge_count.get(root, 0) + 1
44
45        # Check if each component is complete
46        complete_count = 0
47        for vertex in range(n):
48            if dsu._find(vertex) == vertex:  # If vertex is root
49                node_count = dsu.size[vertex]
50                expected_edges = (node_count * (node_count - 1)) // 2
51                if edge_count.get(vertex, 0) == expected_edges:
52                    complete_count += 1
53
54        return complete_count