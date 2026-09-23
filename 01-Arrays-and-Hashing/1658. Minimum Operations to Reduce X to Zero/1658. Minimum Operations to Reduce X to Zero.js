1const minOperations = (A, x) => {
2    const k = A.reduce((a, c) => a + c, 0) - x;
3    if (k < 0) return -1;
4
5    let best = -1, i = 0, s = 0, n = A.length;
6    for (let j = 0; j < n; j++) {
7        s += A[j];
8        while (s > k)
9            s -= A[i++];
10
11        if (s === k)
12            best = Math.max(best, j - i + 1);
13    }
14
15    return best + 1 ? n - best : -1;
16};