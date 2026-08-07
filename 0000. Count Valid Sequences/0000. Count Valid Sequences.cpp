1class Solution {
2    const int mod = 1e9 + 7;
3    
4    long long power(long long a, long long b) {
5        long long ans = 1;
6        while(b > 0) {
7            if(b & 1) ans = (a * ans) % mod;
8            a = (a * a) % mod;
9            b >>= 1;
10        }
11        return ans;
12    }
13
14    long long nCr(int n , int r, vector<long long>& fact, vector<long long>& invfact) {
15        if(r < 0 || r > n) return 0;
16        return fact[n] * invfact[r] % mod * invfact[n - r] % mod;
17    }
18    
19public:
20    int countValidSequences(int n, int k) {
21        vector<long long> fact(n + 1);
22        fact[0] = 1;
23        for(int i = 1; i <= n; i++) {
24            fact[i] = (fact[i - 1] * i) % mod;
25        }
26        vector<long long> invfact(n + 1);
27        invfact[n] = power(fact[n], mod - 2);
28        for(int i = n ; i >= 1; i--) {
29            invfact[i - 1] = (invfact[i] * i) % mod;
30        }
31        long long total = nCr(n - 1, k - 1, fact, invfact);
32        long long odd = 0;
33        if((n - k) % 2 == 0) {
34            int m = (n - k) / 2;
35            odd = nCr(m + k - 1, k - 1, fact, invfact);
36        }
37        return (total - odd + mod) % mod;
38    }
39};