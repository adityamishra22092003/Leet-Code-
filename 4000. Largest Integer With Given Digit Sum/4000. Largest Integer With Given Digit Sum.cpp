1class Solution {
2public:
3    int largestInteger(int n, int s) {
4        if(s>9*n)return -1;
5        if(s==0)return 0;
6        int ans=0;
7        while(n--){
8            if(s>=9){
9                ans+=9;
10                s-=9;
11            }
12            else{
13                ans+=s;
14                s=0;
15            }
16            
17            ans*=10;
18        }
19        return ans/10;
20    }
21};