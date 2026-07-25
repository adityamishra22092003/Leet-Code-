1var maxProduct = function (n) {
2    let first = 0,
3        second = 0;
4    while (n > 0) {
5        let x = n % 10;
6        if (x > first) {
7            second = first;
8            first = x;
9        } else if (x > second) {
10            second = x;
11        }
12        n = Math.floor(n / 10);
13    }
14    return first * second;
15};