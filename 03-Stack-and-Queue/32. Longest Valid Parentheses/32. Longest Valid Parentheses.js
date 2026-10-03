1var longestValidParentheses = function(s) {
2    const st = [-1];
3    let res = 0;
4
5    for (let i = 0; i < s.length; i++) {
6        if (s[i] === '(') {
7            st.push(i);
8        } else {
9            st.pop();
10            if (st.length === 0)
11                st.push(i);
12            else
13                res = Math.max(res, i - st[st.length - 1]);
14        }
15    }
16    return res;
17};