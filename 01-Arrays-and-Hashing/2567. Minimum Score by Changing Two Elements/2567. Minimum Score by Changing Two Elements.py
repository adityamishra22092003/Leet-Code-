1class Solution:
2    def minimizeSum(self, nums: List[int]) -> int:
3
4        nums.sort()
5
6        return min(nums[-1] - nums[2],  #  [a,b,c, ..., x,y,z] => [c,c,c, ..., x,y,z]
7                   nums[-2] - nums[1],  #  [a,b,c, ..., x,y,z] => [b,b,c, ..., x,y,y] 
8                   nums[-3] - nums[0])  #  [a,b,c, ..., x,y,z] => [a,b,c, ..., x,x,x]
9
10                                        #  Return  min((z-c)+(c-c), (x-a)+(x-x), (y-b)+(b-b))