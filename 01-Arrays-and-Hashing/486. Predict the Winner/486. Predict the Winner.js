1const predictTheWinner = A => {
2    const n = A.length;
3    if (!(n & 1)) return true;
4
5    const maxDiff = _.memoize(
6        (i, j) => {
7            if (i === j) return A[i];
8            return Math.max(A[i] - maxDiff(i + 1, j),
9                            A[j] - maxDiff(i, j - 1));
10        },
11        (i, j) => (i << 16) | j
12    );
13
14    return maxDiff(0, n - 1) >= 0;
15};