1var maxSumOfSquares = function (num, sum) {
2    if (sum > 9 * num) {
3        return ;
4    }
5    let r = sum % 9;
6    let ans = 9.repeat(Math.floor(sum / 9));
7    if (r > 0) {
8        ans += String.fromCharCode(0.charCodeAt(0) + r);
9    }
10    ans += 0.repeat(num - ans.length);
11    return ans;
12};