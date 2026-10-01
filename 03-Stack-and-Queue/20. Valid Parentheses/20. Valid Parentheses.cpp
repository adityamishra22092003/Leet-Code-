class Solution {
    public boolean isValid(String s) {
        Stack<Character> st = new Stack<>();

        for (int i = 0; i < s.length(); i++) {
            char val = s.charAt(i);
            if (st.isEmpty()) {
                st.push(val);                
            }else{
                if (st.peek() == '[') {
                    if (val == ']') {
                        st.pop();
                    } else {
                        st.push(val);
                    }
                }
                
                else if (st.peek() == '(') {
                    if (val == ')') {
                        st.pop();
                    } else {
                        st.push(val);
                    }
                }
                
                else if (st.peek() == '{') {
                    if (val == '}') {
                        st.pop();
                    } else {
                        st.push(val);
                    }
                }
                
            }
        }

        return st.isEmpty();
    }
}