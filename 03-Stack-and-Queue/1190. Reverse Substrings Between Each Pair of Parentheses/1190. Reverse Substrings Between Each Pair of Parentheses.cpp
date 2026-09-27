1class Solution {
2public:
3    string reverseParentheses(string s) {
4        stack<int> openParenthesesIndices;
5        string result;
6        for (char currentChar : s) {
7            if (currentChar == '(') {
8                // Store the current length as the start index for future
9                // reversal
10                openParenthesesIndices.push(result.length());
11            } else if (currentChar == ')') {
12                int start = openParenthesesIndices.top();
13                openParenthesesIndices.pop();
14                // Reverse the substring between the matching parentheses
15                reverse(result.begin() + start, result.end());
16            } else {
17                // Append non-parenthesis characters to the processed string
18                result += currentChar;
19            }
20        }
21        return result;
22    }
23};