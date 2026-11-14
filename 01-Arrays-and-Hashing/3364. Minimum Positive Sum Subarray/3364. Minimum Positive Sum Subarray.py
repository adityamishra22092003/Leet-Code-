1class Solution:
2    def minimumSumSubarray(self, nums: List[int], l: int, r: int) -> int:
3
4        n, mn = len(nums), inf
5        acc = list(accumulate(nums, initial = 0))
6        
7        for left in range(n):
8            for rght in range(left+1, n+1):
9                
10                sm, length = acc[rght] - acc[left], rght - left
11                if l <= length <= r and 0 < sm < mn: mn = sm 
12        
13        return -1 if mn == inf else mn