class Solution {  //O(N + K)
    static constexpr uint64_t m[6] = {
        0x5555555555555555ULL, 0x3333333333333333ULL, 0x0F0F0F0F0F0F0F0FULL,
        0x00FF00FF00FF00FFULL, 0x0000FFFF0000FFFFULL, 0x00000000FFFFFFFFULL};

    static constexpr uint64_t shift(uint64_t w, int r) {
        for (int i = 0; i < 6; i++) {
            uint64_t b = -((r >> i) & 1ULL);
            uint64_t s =
                ((w & m[i]) << (1ULL << i)) | ((w & ~m[i]) >> (1ULL << i));
            w = (s & b) | (w & ~b);
        }
        return w;
    }

public:
    int uniqueXorTriplets(vector<int>& nums) {
        uint64_t dp1[1 << 5] = {0};
        for (auto& n : nums)
            dp1[n >> 6] |= (1ULL << (n & 63));

        int A[1 << 11];
        int sz = 0;

        for (int i = 0; i < 1 << 5; i++)
            for (int j = 0; j < 1 << 6; j++) {
                A[sz] = (i << 6) | j;
                sz += (dp1[i] >> j) & 1;
            }

        uint64_t dp2[1 << 5] = {0};
        for (int i = 0; i < sz; i++)
            for (int j = 0; j < 1 << 5; j++)
                dp2[j] |= shift(dp1[j ^ (A[i] >> 6)], A[i] & 63);

        uint64_t dp3[1 << 5] = {0};
        for (int i = 0; i < sz; i++)
            for (int j = 0; j < 1 << 5; j++)
                dp3[j] |= shift(dp2[j ^ (A[i] >> 6)], A[i] & 63);

        int res = 0;
        for (int i = 0; i < 1 << 5; i++)
            res += __builtin_popcountll(dp3[i]);

        return res;
    }
};