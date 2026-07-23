class Solution {
    public int uniqueXorTriplets(int[] nums) {
        int n = nums.length;

        if (n <= 2) return n;

        int ans = 2;
        while (ans <= n) ans <<= 1;

        return ans;
    }
}