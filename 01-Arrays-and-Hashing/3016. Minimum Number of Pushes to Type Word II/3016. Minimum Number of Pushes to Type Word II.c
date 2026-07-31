class Solution {
    public int minimumPushes(String word) {
        int[] arr = new int[26];
        for (char c : word.toCharArray()) {
            arr[c-'a']++;
        }
        int res = 0;
        Arrays.sort(arr);
        for (int i=25; i>=0; i--) {
            if (i>17) res += arr[i];
            else if (i>9) res += arr[i]*2;
            else if (i>1) res += arr[i]*3;
            else res += arr[i]*4;
        }
        return res;
    }
}