1var minMoves = function(nums) {
2    const lo = Math.min(...nums);
3    let moves = 0;
4    for (let i = 0; i < nums.length; i++) moves += nums[i] - lo;
5    return moves;
6};