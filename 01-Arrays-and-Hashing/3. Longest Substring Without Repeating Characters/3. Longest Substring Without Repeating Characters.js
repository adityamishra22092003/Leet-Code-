1var lengthOfLongestSubstring = function(s) {
2    let left = 0;
3    let maxLength = 0;
4    let charSet = new Set();
5
6    for (let right = 0; right < s.length; right++) {
7        while (charSet.has(s[right])) {
8            charSet.delete(s[left]);
9            left++;
10        }
11
12        charSet.add(s[right]);
13        maxLength = Math.max(maxLength, right - left + 1);
14    }
15
16    return maxLength;    
17};