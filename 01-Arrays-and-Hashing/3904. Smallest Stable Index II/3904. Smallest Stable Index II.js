    public int firstStableIndex(int[] nums, int k) {
        int n = nums.length;
        int ans = 0;
        int maxSoFar = Integer.MIN_VALUE;
        int maxAtAns = Integer.MIN_VALUE;

        for (int i = 0; i < n; i++) {
            maxSoFar = Math.max(maxSoFar, nums[i]);
            if (i == ans) {
                maxAtAns = Math.max(maxAtAns, nums[i]);
            }
            if (nums[i] < maxAtAns - k) {
                ans = i + 1;
                maxAtAns = maxSoFar;
            }
        }
        return ans < n ? ans : -1;
    }