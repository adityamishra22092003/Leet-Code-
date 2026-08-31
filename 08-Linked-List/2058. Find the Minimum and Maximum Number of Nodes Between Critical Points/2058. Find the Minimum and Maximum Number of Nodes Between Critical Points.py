1class Solution:
2    def nodesBetweenCriticalPoints(self, head: Optional[ListNode]) -> List[int]:
3        result = [-1, -1]
4
5        # Initialize minimum distance to the maximum possible value
6        min_distance = float(inf)
7
8        # Pointers to track the previous node, current node, and indices
9        previous_node = head
10        current_node = head.next
11        current_index = 1
12        previous_critical_index = 0
13        first_critical_index = 0
14
15        while current_node.next is not None:
16            # Check if the current node is a local maxima or minima
17            if (
18                current_node.val < previous_node.val
19                and current_node.val < current_node.next.val
20            ) or (
21                current_node.val > previous_node.val
22                and current_node.val > current_node.next.val
23            ):
24
25                # If this is the first critical point found
26                if previous_critical_index == 0:
27                    previous_critical_index = current_index
28                    first_critical_index = current_index
29                else:
30                    # Calculate the minimum distance between critical points
31                    min_distance = min(
32                        min_distance, current_index - previous_critical_index
33                    )
34                    previous_critical_index = current_index
35
36            # Move to the next node and update indices
37            current_index += 1
38            previous_node = current_node
39            current_node = current_node.next
40
41        # If at least two critical points were found
42        if min_distance != float(inf):
43            max_distance = previous_critical_index - first_critical_index
44            result = [min_distance, max_distance]
45
46        return result