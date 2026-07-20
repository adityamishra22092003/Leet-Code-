1const shiftGrid = (grid, k) => {
2    const r = grid.length, c = grid[0].length;
3    const n = r * c;
4    k = k % n;
5
6    if (!k) return grid;
7
8    const shift = (i, j) => {
9        while (i < j) {
10            [grid[(i / c) | 0][i % c], grid[(j / c) | 0][j % c]] = [grid[(j / c) | 0][j % c], grid[(i / c) | 0][i % c]];
11            i++;
12            j--;
13        }
14    };
15
16    shift(0, n - 1);
17    shift(0, k - 1);
18    shift(k, n - 1);
19    return grid;
20};