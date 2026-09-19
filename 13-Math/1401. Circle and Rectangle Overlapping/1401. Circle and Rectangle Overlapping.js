1function distance(ux, uy, vx, vy) {
2    return (ux - vx) ** 2 + (uy - vy) ** 2;
3}
4
5var checkOverlap = function (radius, xCenter, yCenter, x1, y1, x2, y2) {
6    /* The center of the circle is inside the rectangle */
7    if (x1 <= xCenter && xCenter <= x2 && y1 <= yCenter && yCenter <= y2) {
8        return true;
9    }
10    /* The center of the circle is above the rectangle */
11    if (
12        x1 <= xCenter &&
13        xCenter <= x2 &&
14        y2 <= yCenter &&
15        yCenter <= y2 + radius
16    ) {
17        return true;
18    }
19    /* The center of the circle is below the rectangle */
20    if (
21        x1 <= xCenter &&
22        xCenter <= x2 &&
23        y1 - radius <= yCenter &&
24        yCenter <= y1
25    ) {
26        return true;
27    }
28    /* The center of the circle is to the left of the rectangle */
29    if (
30        x1 - radius <= xCenter &&
31        xCenter <= x1 &&
32        y1 <= yCenter &&
33        yCenter <= y2
34    ) {
35        return true;
36    }
37    /* The center of the circle is to the right of the rectangle */
38    if (
39        x2 <= xCenter &&
40        xCenter <= x2 + radius &&
41        y1 <= yCenter &&
42        yCenter <= y2
43    ) {
44        return true;
45    }
46    /* The upper-left corner of the rectangle */
47    if (distance(xCenter, yCenter, x1, y2) <= radius * radius) {
48        return true;
49    }
50    /* The lower-left corner of the rectangle */
51    if (distance(xCenter, yCenter, x1, y1) <= radius * radius) {
52        return true;
53    }
54    /* The upper-right corner of the rectangle */
55    if (distance(xCenter, yCenter, x2, y2) <= radius * radius) {
56        return true;
57    }
58    /* The lower-right corner of the rectangle */
59    if (distance(xCenter, yCenter, x2, y1) <= radius * radius) {
60        return true;
61    }
62    /* No intersection */
63    return false;
64};