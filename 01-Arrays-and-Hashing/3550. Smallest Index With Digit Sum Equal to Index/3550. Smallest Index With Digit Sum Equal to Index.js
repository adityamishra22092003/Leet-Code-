class Solution {
    static int[] precomp;
    static final int max_val = 1000;
    static{
        precomp = new int[max_val+1];
        for (int i = 1; i <= max_val; i++){
            precomp[i] = precomp[i/10] + (i % 10);
        }
    }
    public int smallestIndex(int[] nums) {
        for (int i = 0; i < nums.length; i++){
           if (precomp[nums[i]] == i) return i;
        }
        return -1;
    }
}