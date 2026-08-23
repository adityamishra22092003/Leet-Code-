1var sumGame = function (num) {
2    const n = num.length;
3
4    const get = (s) => {
5        let nn = 0,
6            qq = 0;
7        for (const ch of s) {
8            if (ch === ?) {
9                qq++;
10            } else {
11                nn += parseInt(ch);
12            }
13        }
14        return [nn, qq];
15    };
16
17    const [n0, q0] = get(num.substring(0, n / 2));
18    const [n1, q1] = get(num.substring(n / 2));
19
20    return (q0 + q1) % 2 === 1 || n0 - n1 !== ((q1 - q0) * 9) / 2;
21};