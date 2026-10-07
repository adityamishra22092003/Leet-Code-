1const removeInvalidParentheses = s => {
2    const res = [];
3
4    const fwd = (s, li, lj) => {
5        let bal = 0;
6
7        for (let i = li; i < s.length; i++) {
8            bal += (s[i] === '(') - (s[i] === ')');
9            if (bal >= 0) continue;
10
11            for (let j = lj; j <= i; j++) 
12                if (s[j] === ')' && (j === lj || s[j - 1] !== ')'))
13                    fwd(s.slice(0, j) + s.slice(j + 1), i, j);
14            
15            return;
16        }
17
18        bwd(s, s.length - 1, s.length - 1);
19    };
20
21    const bwd = (s, ri, rj) => {
22        let bal = 0;
23
24        for (let i = ri; i > -1; i--) {
25            bal += (s[i] === ')') - (s[i] === '('); 
26            if (bal >= 0) continue;
27
28            for (let j = rj; j >= i; j--) 
29                if (s[j] === '(' && (j === rj || s[j + 1] !== '('))
30                    bwd(s.slice(0, j) + s.slice(j + 1), i - 1, j - 1);
31
32            return;
33        }
34
35        res.push(s);
36    };
37
38    fwd(s, 0, 0);
39
40    return res;
41};