1class Solution:
2    def minMoves2(self, nums: List[int]) -> int:
3        l=len(nums)
4        if l==1:
5            return 0
6        nums.sort()
7        mid=nums[l//2]
8        res=0
9        for i in nums:
10            res+=abs(i-mid)
11        return res