class Solution {
public:
    int maxSelectedElements(vector<int>& nums) {
        ranges::sort(nums);
        int prv0 = 1, prv1 = 1, res = 1;
        for(int i = 1; i < (int)nums.size(); i++) {
            int cur0 = 1, cur1 = 1;
            if(nums[i] == nums[i-1] + 2) {
                cur0 = prv1 + 1;
            } else if(nums[i] == nums[i-1] + 1) {
                cur0 = max(prv0+1, prv1);
                cur1 = prv1 + 1;
            } else if(nums[i] == nums[i-1]) {
                cur0 = prv0;
                cur1 = max(prv0+1, prv1);
            }

            prv0 = cur0, prv1 = cur1;
            res = max({res, prv0, prv1});
        }

        return res;
    }
};