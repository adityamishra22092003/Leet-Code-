1class Solution {
2public: 
3    bool checkValidString(string s) {
4        vector<vector<int>> memo(s.size(), vector<int>(s.size(), -1));
5        return isValidString(0, 0, s, memo);
6    }
7private: 
8    bool isValidString(int index, int openCount,
9        const string & str, vector < vector < int >> & memo) {
10        // If reached end of the string, check if all brackets are balanced
11        if (index == str.size()) {
12            return (openCount == 0);
13        }
14
15        // If already computed, return memoized result
16        if (memo[index][openCount] != -1) {
17            return memo[index][openCount];
18        }
19
20        bool isValid = false;
21        // If encountering '*', try all possibilities
22        if (str[index] == '*') {
23            isValid |= isValidString(index + 1, openCount + 1, str, memo); // Treat '*' as '('
24            if (openCount) {
25                isValid |= isValidString(index + 1, openCount - 1, str, memo); // Treat '*' as ')'
26            }
27            isValid |= isValidString(index + 1, openCount, str, memo); // Treat '*' as empty
28        } else {
29            // Handle '(' and ')'
30            if (str[index] == '(') {
31                isValid = isValidString(index + 1, openCount + 1, str, memo); // Increment count for '('
32            } else if (openCount) {
33                isValid = isValidString(index + 1, openCount - 1, str, memo); // Decrement count for ')'
34            }
35        }
36
37        // Memoize and return the result
38        return memo[index][openCount] = isValid;
39    }
40};