class Solution {
    public int minOperations(String s) {
        var cs = s.toCharArray();
        var min = cs[0];
        var max = cs[0];
        var mini = 0;
        var maxi = 0;
        var sorted = true;
        for (var i = 1; i < cs.length; i ++) {
            var c = cs[i];
            if (c < min) {
                mini = i;
                min = c;
            }
            if (c >= max) {
                maxi = i;
                max = c;
            }
            if (sorted && c < cs[i - 1])
                sorted = false;
        }
        if (sorted)
            return 0;
        else if (s.length() == 2)
            return -1;
        else if (mini == 0 || maxi == cs.length - 1)
            return 1;
        else if (mini == cs.length - 1 && maxi == 0)
            return 3;
        return 2;
    }
}