1var maxDepthAfterSplit = function (seq) {
2    let dep = 0;
3    return seq.split().map((value, index) => {
4        if (value === () {
5            ++dep;
6            return dep % 2;
7        } else {
8            let ans = dep % 2;
9            --dep;
10            return ans;
11        }
12    });
13};