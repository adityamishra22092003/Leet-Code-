1function minMoves(classroom, energy) {
2    const dx = [0, 1, 0, -1];
3    const dy = [1, 0, -1, 0];
4    const m = classroom.length;
5    const n = classroom[0].length;
6    const id = Array.from({ length: m }, () => Array(n).fill(0));
7    let sx = 0,
8        sy = 0,
9        cnt = 0;
10    for (let i = 0; i < m; i++) {
11        for (let j = 0; j < n; j++) {
12            const c = classroom[i][j];
13            if (c === S) {
14                sx = i;
15                sy = j;
16            } else if (c === L) {
17                id[i][j] = 1 << cnt;
18                cnt++;
19            }
20        }
21    }
22    const full = 1 << cnt;
23    const bestEnergy = Array.from({ length: m }, () =>
24        Array.from({ length: n }, () => Array(full).fill(-1)),
25    );
26    bestEnergy[sx][sy][0] = energy;
27    const q = [];
28    q.push({ x: sx, y: sy, mask: 0, e: energy, steps: 0 });
29    let head = 0;
30    while (head < q.length) {
31        const t = q[head++];
32        if (t.mask === full - 1) {
33            return t.steps;
34        }
35        if (t.e === 0) {
36            continue;
37        }
38        for (let d = 0; d < 4; d++) {
39            const nx = t.x + dx[d];
40            const ny = t.y + dy[d];
41            if (nx < 0 || nx >= m || ny < 0 || ny >= n) {
42                continue;
43            }
44            const c = classroom[nx][ny];
45            if (c === X) {
46                continue;
47            }
48            const ne = c === R ? energy : t.e - 1;
49            const nmask = t.mask | id[nx][ny];
50            if (ne > bestEnergy[nx][ny][nmask]) {
51                bestEnergy[nx][ny][nmask] = ne;
52                q.push({
53                    x: nx,
54                    y: ny,
55                    mask: nmask,
56                    e: ne,
57                    steps: t.steps + 1,
58                });
59            }
60        }
61    }
62    return -1;
63}