1var countDaysTogether = function (
2    arriveAlice,
3    leaveAlice,
4    arriveBob,
5    leaveBob,
6) {
7    let datesOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
8    let prefixSum = [0];
9    for (let i = 0; i < datesOfMonths.length; i++) {
10        prefixSum.push(prefixSum[i] + datesOfMonths[i]);
11    }
12
13    let arriveAliceDay = calculateDayOfYear(arriveAlice, prefixSum);
14    let leaveAliceDay = calculateDayOfYear(leaveAlice, prefixSum);
15    let arriveBobDay = calculateDayOfYear(arriveBob, prefixSum);
16    let leaveBobDay = calculateDayOfYear(leaveBob, prefixSum);
17
18    return Math.max(
19        0,
20        Math.min(leaveAliceDay, leaveBobDay) -
21            Math.max(arriveAliceDay, arriveBobDay) +
22            1,
23    );
24};
25
26function calculateDayOfYear(day, prefixSum) {
27    let month = parseInt(day.substring(0, 2));
28    let date = parseInt(day.substring(3));
29    return prefixSum[month - 1] + date;
30}