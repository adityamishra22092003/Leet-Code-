1class Solution {
2public:
3    int minChanges(string s) {
4        // Initialize with first character of string
5        char currentChar = s[0];
6
7        int consecutiveCount = 0;
8        int minChangesRequired = 0;
9
10        // Iterate through each character in the string
11        for (int i = 0; i < s.length(); i++) {
12            // If current character matches the previous sequence
13            if (s[i] == currentChar) {
14                consecutiveCount++;
15                continue;
16            }
17
18            // If we have even count of characters, start new sequence
19            if (consecutiveCount % 2 == 0) {
20                consecutiveCount = 1;
21            }
22            // If odd count, we need to change current character
23            // to match previous sequence
24            else {
25                consecutiveCount = 0;
26                minChangesRequired++;
27            }
28
29            // Update current character for next iteration
30            currentChar = s[i];
31        }
32
33        return minChangesRequired;
34    }
35};