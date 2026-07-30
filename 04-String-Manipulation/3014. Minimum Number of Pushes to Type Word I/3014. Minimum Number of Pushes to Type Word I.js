1var minimumPushes = function (word) {
2    const n = word.length;
3    let ans = 0;
4    for (let i = 0; i < n; i++) {
5        ans += Math.floor(i / 8) + 1;
6    }
7    return ans;
8};