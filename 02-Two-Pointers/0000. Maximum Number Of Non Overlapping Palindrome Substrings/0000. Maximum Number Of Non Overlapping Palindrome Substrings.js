class Solution:
    def maxPalindromes(self, s: str, k: int) -> int:
        # Standard Manacher's algorithm template.
        # Tweak 's' into 'text' so we avoid dealing with even/odd length edge cases.
        # Now, every palindrome in 'text' has an odd length and a clear center.
        
        # Index mapping between 's' and 'text':
        # (s_idx + 1) * 2 = t_idx
        # t_idx / 2 - 1 = s_idx
        # Even t_idx means an odd-length palindrome, odd t_idx means even-length.
        text = #.join(^ + s + $)

        # We define the radius as (length + 1) / 2.
        # hlen[i] holds the radius of the longest palindrome centered at text[i].
        # This makes [i - hlen[i] + 1, i + hlen[i] - 1] a valid palindrome in 'text'.
        hlen = [0] * (len(text) - 2)
        hlen[1] = 1

        # 'brgt' is the furthest right boundary (exclusive) we have reached so far.
        # 'bmid' is the center of that specific palindrome.
        # They relate as follows: brgt = bmid + hlen[bmid].
        bmid = brgt = 0
        for i in range(2, len(hlen)):
            rad = 1
            if i < brgt:
                # Look at the mirror index of 'i' around 'bmid'.
                # If the mirrored palindrome stretches beyond our current right boundary,
                # we cap the initial radius at brgt - i and manually expand from there.
                rad = min(brgt - i, hlen[bmid * 2 - i])

            # Time to manually expand.
            # We only do this when pushing the right boundary further out,
            # which guarantees a smooth O(N) time complexity.
            while text[i - rad] == text[i + rad]:
                rad += 1
                bmid, brgt = i, i + rad

            hlen[i] = rad

        # Quick check to see if s[left:rght] is a valid palindrome.
        def ispal(left: int, rght: int) -> bool:
            # Using our index map, the center in 'text' lands at left + rght + 1.
            # Since 'text' includes '#' separators, we just verify if the recorded
            # radius is large enough to cover the target substring length.
            return hlen[left + rght + 1] > rght - left

        size = len(s)
        res = i = 0
        while i <= size - k:
            if ispal(i, i + k):
                res += 1
                i += k  # Lock this in and jump forward by k.
            elif i < size - k and ispal(i, i + k + 1):
                # There is no real benefit in skipping this frame to grab a shifted palindrome 
                # of length k, since it leaves us with the exact same remaining string anyway.
                res += 1
                i += k + 1  # Lock it in and jump forward by k + 1.
            else:
                i += 1  # No valid match here, just step forward.
        
        return res