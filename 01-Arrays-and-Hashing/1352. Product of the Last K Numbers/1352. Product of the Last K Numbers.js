class ProductOfNumbers:

    def __init__(self):
        self.size = 0  # how many numbers were added
        self.zero = -1  # the position of the last zero
        self.where, self.factor = [], []  # the numbers above 1 after it: positions and values

    def add(self, num: int) -> None:
        if num == 0:
            self.zero, self.where, self.factor = self.size, [], []
        elif num > 1:
            self.where.append(self.size)
            self.factor.append(num)
        self.size += 1

    def getProduct(self, k: int) -> int:
        start = self.size - k  # the window is positions start .. size - 1
        if self.zero >= start:
            return 0
        return prod(self.factor[bisect_left(self.where, start):])