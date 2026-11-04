import numpy as np

class Windows:
    Every window of size x at once, through a wavelet matrix over the ranks of the values.

    def __init__(self, nums, x):
        a = np.array(nums, dtype=np.int64)
        rank = np.empty(len(a), dtype=np.int64)
        rank[np.argsort(a, kind='stable')] = np.arange(len(a))  # ties broken by index: ranks 0..n-1
        self.levels = []  # top bit first: (zeros before each position, sum of 0-bit values before it, total zeros)
        for b in reversed(range(max(1, (len(a) - 1).bit_length()))):
            zero = (rank >> b) & 1 == 0
            self.levels.append((np.r_[0, np.cumsum(zero)], np.r_[0, np.cumsum(np.where(zero, a, 0))], zero.sum()))
            order = np.argsort(~zero, kind='stable')  # 0-bit values first, order kept
            rank, a = rank[order], a[order]
        self.sorted = a  # after the last level the values are in rank order
        s = np.cumsum([0] + nums)
        self.x, self.total = x, s[x:] - s[:-x]

    @property
    def cost(self):  # larger half minus smaller half, for every window at once
        lo = np.arange(len(self.total))
        hi, need, low = lo + self.x, np.full(len(lo), self.x // 2), np.zeros(len(lo), dtype=np.int64)
        for zeros, sums, z in self.levels:  # walk every window down to its (h+1)-th smallest value
            zl, zh = zeros[lo], zeros[hi]
            left = need < zh - zl  # the value we want has this bit 0
            low += np.where(left, 0, sums[hi] - sums[lo])  # otherwise every 0-bit value is smaller
            need -= np.where(left, 0, zh - zl)
            lo, hi = np.where(left, zl, z + lo - zl), np.where(left, zh, z + hi - zh)
        return self.total - 2 * low - (self.x & 1) * self.sorted[lo]


class Solution:
    def minOperations(self, nums: List[int], x: int, k: int) -> int:
        cost = Windows(nums, x).cost
        best = np.zeros(len(nums) + 1)  # best[i]: min ops for the windows placed so far inside nums[:i]
        for _ in range(k):
            best = np.minimum.accumulate(np.r_[np.full(x, np.inf), best[:len(cost)] + cost])
        return int(best[-1])