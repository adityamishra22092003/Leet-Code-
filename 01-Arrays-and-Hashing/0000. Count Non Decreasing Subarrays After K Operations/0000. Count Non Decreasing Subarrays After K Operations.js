1var countNonDecreasingSubarrays = function (nums, k) {
2    const n = nums.length;
3    let ans = 0;
4    let operations = 0;
5    // Maintain the window maximum with a priority queue of { val, idx }
6    const q = new MaxPriorityQueue((item) => item.val);
7    // Record the set of elements covered by this index
8    const cnt = Array.from({ length: n }, () => []);
9    // Index of the first greater-or-equal element to the right
10    const pos = new Array(n).fill(n);
11    // Decreasing monotonic stack
12    const st = [];
13
14    let left = 0;
15    for (let right = 0; right < n; right++) {
16        // Maintain the monotonic stack
17        while (st.length > 0 && nums[right] >= nums[st[st.length - 1]]) {
18            pos[st[st.length - 1]] = right;
19            st.pop();
20        }
21        // The stack top is the nearest greater element to the left of nums[right]
22        if (st.length > 0) {
23            cnt[st[st.length - 1]].push(right);
24        }
25        st.push(right);
26
27        // The priority queue front is the window maximum
28        q.enqueue({ val: nums[right], idx: right });
29        // Adding nums[right] increases the operation count
30        operations += Math.max(0, q.front().val - nums[right]);
31
32        // The minimum operation count exceeds k; shrink the window
33        while (operations > k) {
34            // Removing nums[left] from the window decreases the operation count
35            for (const i of cnt[left]) {
36                // Subtract the contribution
37                operations -=
38                    (nums[left] - nums[i]) * (Math.min(pos[i], right + 1) - i);
39            }
40            left++;
41        }
42
43        // Remove elements with indices less than left from the priority queue
44        while (!q.isEmpty() && q.front().idx < left) {
45            q.dequeue();
46        }
47
48        // There are right - left + 1 valid contiguous subarrays ending at right
49        ans += right - left + 1;
50    }
51
52    return ans;
53};