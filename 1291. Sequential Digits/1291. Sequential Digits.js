class Solution {
    // All sequential-digit numbers in ascending order. 12, 23, ... 123456789
    private static final int[] SEQUENTIAL_NUMBERS = new int[36];
    static {
        int size = 0;

        // Start with all two-digit numbers.
        for (int firstDigit = 1; firstDigit <= 8; firstDigit++) {
            SEQUENTIAL_NUMBERS[size++] = firstDigit * 10 + firstDigit + 1;
        }

        // Generate longer numbers by appending the next digit.
        for (int index = 0; index < size; index++) {
            int lastDigit = SEQUENTIAL_NUMBERS[index] % 10;

            if (lastDigit < 9) {
                SEQUENTIAL_NUMBERS[size++] =
                        SEQUENTIAL_NUMBERS[index] * 10 + lastDigit + 1;
            }
        }
    }

    public List<Integer> sequentialDigits(int low, int high) {
        List<Integer> result = new ArrayList<>();

        for (int number : SEQUENTIAL_NUMBERS) {
            if (number < low) continue;

            if (number > high) break;

            result.add(number);
        }

        return result;
    }
}