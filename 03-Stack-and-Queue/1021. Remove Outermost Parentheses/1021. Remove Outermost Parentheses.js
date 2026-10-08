class Solution {
    public String removeOuterParentheses(String s) {
        char[] array = s.toCharArray();
        int size = 0;
        int depth = 0;
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == '(') {
                if (depth > 0) {
                    array[size++] = ch;
                }
                depth++;
            } else {
                depth--;
                if (depth > 0) {
                    array[size++] = ch;
                }
            }
        }

        return new String(array, 0, size);
    }
}