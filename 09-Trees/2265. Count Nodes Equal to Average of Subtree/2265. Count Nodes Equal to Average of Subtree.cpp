1class Solution {
2public:
3    int count = 0;
4    
5    pair<int, int> postOrder(TreeNode* root) {
6        if (root == NULL) {
7            return {0, 0};
8        }
9        
10        // First iterate over left and right subtrees.
11        pair<int, int> left = postOrder(root->left);
12        pair<int, int> right = postOrder(root->right);
13        
14        int nodeSum = left.first + right.first + root->val;
15        int nodeCount = left.second + right.second + 1;
16
17        // Check if the average of the subtree is equal to the node value.
18        if (root->val == nodeSum / (nodeCount)) {
19            count++;
20        }
21        
22        // Return the sum of nodes and the count in the subtree.
23        return {nodeSum, nodeCount};
24    }
25    
26    int averageOfSubtree(TreeNode* root) {
27        postOrder(root);
28        return count;
29    }
30};