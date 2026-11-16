1class Solution:
2    def digitSum(self, s: str, k: int) -> str:
3        while len(s) > k:
4            s = ''.join(str(sum(map(int, g))) for g in batched(s, k))
5        return s