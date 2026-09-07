class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        m, n = len(s), len(t)
        if m < n:
            return 0
        
        # We only need a 1D array of size n + 1
        dp = [0] * (n + 1)
        dp[n] = 1
        
        for i in range(m - 1, -1, -1):
            # We iterate j forwards (from 0 to n - 1) instead of backwards.
            # This ensures dp[j + 1] holds the value from the previous row (i + 1) 
            # and hasn't been overwritten yet by the current row's updates.
            for j in range(n):
                if s[i] == t[j]:
                    dp[j] = dp[j + 1] + dp[j]
                # If they don't match, dp[j] = dp[j] implicitly, 
                # so we can completely omit the else block.
        
        return dp[0]