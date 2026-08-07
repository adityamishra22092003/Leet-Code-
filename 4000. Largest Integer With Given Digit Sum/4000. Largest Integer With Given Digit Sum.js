1const largestInteger = (n, s) => {
2    if (s > n * 9) return -1;
3    const q = (s / 9) | 0;
4
5    return 10 ** n - 10 ** (n - q) + (s % 9) * 10 ** (n - q - 1);
6};