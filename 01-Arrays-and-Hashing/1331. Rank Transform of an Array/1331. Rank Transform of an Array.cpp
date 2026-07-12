1class Solution {
2public:
3    vector<int> arrayRankTransform(vector<int>& arr) {
4        // Store the rank for each number in arr
5        map<int, int> numToRank;
6        vector<int> sortedArr(arr);
7        sort(sortedArr.begin(), sortedArr.end());
8        int rank = 1;
9        for (int i = 0; i < sortedArr.size(); i++) {
10            if (i > 0 && sortedArr[i] > sortedArr[i - 1]) {
11                rank++;
12            }
13            numToRank[sortedArr[i]] = rank;
14        }
15        for (int i = 0; i < arr.size(); i++) {
16            arr[i] = numToRank[arr[i]];
17        }
18        return arr;
19    }
20};