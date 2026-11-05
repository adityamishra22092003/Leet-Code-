1class Solution {
2public:
3    int findTheDistanceValue(vector<int>& arr1, vector<int>& arr2, int d) {
4        ranges::sort(arr2);
5        arr2.push_back(INT_MAX);
6        int cnt = 0;
7        for(int a : arr1){
8            if(*ranges::lower_bound(arr2, a - d) > a + d){
9                cnt++;
10            }
11        }
12        return cnt;
13    }
14};