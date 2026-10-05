1/**
2 * @param {string} s
3 * @return {number}
4 */
5var scoreOfParentheses = function(s) {
6    let score = 0, depth = 0;
7    for (let i = 0; i < s.length; ++i) {
8        if (s[i] === '(') {
9            ++depth;
10        } else {
11            --depth;
12            if (s[i - 1] === '(') {
13                score += 1 << depth;
14            }
15        }
16    }
17    return score;
18};