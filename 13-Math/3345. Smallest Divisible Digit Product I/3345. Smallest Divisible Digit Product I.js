1function smallestNumber(n, t) {
2    const check = (num) => {
3        let product = 1;
4        while (num > 0) {
5            product *= num % 10;
6            num = Math.floor(num / 10);
7            if (product === 0) {
8                break;
9            }
10        }
11        return product % t === 0;
12    };
13
14    while (!check(n)) {
15        n++;
16    }
17    return n;
18}