1const dfs = _.memoize(i => {
2    if (!i) return 0;
3    for (let j = 1; (j ** 2) <= i; j++)
4        if (!dfs(i - j ** 2))
5            return 1;
6
7    return 0;
8});
9
10const winnerSquareGame = n => dfs(n);