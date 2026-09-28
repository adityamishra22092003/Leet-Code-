1class Solution {
2public:
3    int maxDepth(string s) {
4        int ans = 0;
5
6        stack<char> st;
7        for (char c : s) {
8            if (c == '(') {
9                st.push(c);
10            } else if (c == ')') {
11                st.pop();
12            }
13            
14            ans = max(ans, (int)st.size());
15        }
16        
17        return ans;
18    }
19};