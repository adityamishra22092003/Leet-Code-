int minInsertions(string s) {
        /* 
        r: number of ')' currently needed
        res: number of insertions needed
        */

        int res = 0, r = 0;
        for (char c : s) {
            if (c == '(') {
                if (r & 1) res++, r--; // if r is odd (r&1), an isolated ')' before this '(' was never copmleted. We must close it immediately: res++, r--.
                r += 2; // Then add 2 to r (since '(' requires two ')').
            }
            else {
                if (--r < 0) res++, r += 2; // Decrement r. If r < 0, an upexpected ')' appeared without a '(', so insert a '(' before it: res++, and reset r += 2 (1 more ')' needed).
            }
        }
        return res + r; // insert any remaining required ')': res+r.
    }