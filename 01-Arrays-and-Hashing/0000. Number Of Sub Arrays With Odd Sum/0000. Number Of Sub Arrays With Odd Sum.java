1class Solution {
2    public int numOfSubarrays(int[] arr) {
3        int mod=1000000007;
4        int e=1;
5        int o=0;
6        int res=0;
7        long sum=0;
8        for(int i=0;i<arr.length;i++){
9            sum+=arr[i];
10            if(sum%2==0){
11                res=(res+o)%mod;
12                e++;
13            }
14            else{
15                res=(res+e)%mod;
16                o++;
17            }
18        }
19        return res;
20    }
21}