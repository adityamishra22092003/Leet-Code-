class Solution {
    public List<Integer> targetIndices(int[] nums, int target) {
        int i,j,temp;
        int n=nums.length;
        for(i=0;i<n;i++)
        {
            for(j=i+1;j<n;j++)
            {
                if(nums[i]>nums[j])
                {
                    temp=nums[i];
                    nums[i]=nums[j];
                    nums[j]=temp;
                }
            }
        }
        List<Integer> result=new ArrayList<>();
        for(i=0;i<n;i++)
        {
            if(nums[i]==target)
            {
               result.add(i);
            }
        }
        return result;
    }
}