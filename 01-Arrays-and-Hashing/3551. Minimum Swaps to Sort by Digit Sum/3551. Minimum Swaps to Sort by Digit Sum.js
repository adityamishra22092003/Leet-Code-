1var minSwaps = function (nums) {
2    const n = nums.length;
3    const digitSum = new Array(n);
4    for (let i = 0; i < n; i++) {
5        let x = nums[i],
6            sum = 0;
7        while (x > 0) {
8            sum += x % 10;
9            x = Math.floor(x / 10);
10        }
11        digitSum[i] = sum;
12    }
13
14    const indices = Array.from({ length: n }, (_, i) => i);
15    indices.sort((a, b) => {
16        if (digitSum[a] !== digitSum[b]) {
17            return digitSum[a] - digitSum[b];
18        }
19        return nums[a] - nums[b];
20    });
21
22    const targetPos = new Array(n);
23    for (let pos = 0; pos < n; pos++) {
24        targetPos[indices[pos]] = pos;
25    }
26
27    const visited = new Array(n).fill(false);
28    let cycles = 0;
29    for (let i = 0; i < n; i++) {
30        if (!visited[i]) {
31            cycles++;
32            let j = i;
33            while (!visited[j]) {
34                visited[j] = true;
35                j = targetPos[j];
36            }
37        }
38    }
39
40    return n - cycles;
41};