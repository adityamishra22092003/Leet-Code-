1var assignTasks = function (servers, tasks) {
2    // Busy servers: store [completion time, server index]
3    const busy = new MinPriorityQueue({
4        compare: (a, b) => {
5            if (a[0] !== b[0]) return a[0] - b[0];
6            return a[1] - b[1];
7        },
8    });
9
10    // Idle servers: store [weight, index]
11    const idle = new MinPriorityQueue({
12        compare: (a, b) => {
13            if (a[0] !== b[0]) return a[0] - b[0];
14            return a[1] - b[1];
15        },
16    });
17
18    for (let i = 0; i < servers.length; i++) {
19        idle.enqueue([servers[i], i]);
20    }
21    let currentTime = 0;
22    const ans = [];
23
24    // Move servers with t<=ts from priority queue busy to priority queue idle one by one
25    const release = () => {
26        while (!busy.isEmpty() && busy.front()[0] <= currentTime) {
27            const [, idx] = busy.dequeue();
28            idle.enqueue([servers[idx], idx]);
29        }
30    };
31
32    for (let i = 0; i < tasks.length; i++) {
33        currentTime = Math.max(currentTime, i);
34        release();
35        if (idle.isEmpty()) {
36            currentTime = busy.front()[0];
37            release();
38        }
39
40        const [, idx] = idle.dequeue();
41        ans.push(idx);
42        busy.enqueue([currentTime + tasks[i], idx]);
43    }
44
45    return ans;
46};