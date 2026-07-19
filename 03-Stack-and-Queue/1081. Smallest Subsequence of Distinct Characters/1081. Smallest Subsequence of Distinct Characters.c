1var smallestSubsequence = function (s) {
2    const vis = new Array(26).fill(0);
3    const num = _.countBy(s);
4
5    const sb = new Array();
6    for (let i = 0; i < s.length; i++) {
7        const ch = s[i];
8        if (!vis[ch.charCodeAt() - a.charCodeAt()]) {
9            while (sb.length > 0 && sb[sb.length - 1] > ch) {
10                if (num[sb[sb.length - 1]] > 0) {
11                    vis[sb[sb.length - 1].charCodeAt() - a.charCodeAt()] = 0;
12                    sb.pop();
13                } else {
14                    break;
15                }
16            }
17            vis[ch.charCodeAt() - a.charCodeAt()] = 1;
18            sb.push(ch);
19        }
20        num[ch]--;
21    }
22    return sb.join();
23};