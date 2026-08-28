class Solution:
   def lexPalindromicPermutation(self, s: str, target: str) -> str:
       # check if character counter of s satisfies a palindrome (at most 1 odd frequency character)
       n = len(s)
       alphabet = string.ascii_lowercase
       counter = collections.Counter(s)
       counter_copy = counter.copy()

       odd_freq = 0
       odd_freq_item = None
       for k, v in counter.items():
           if v % 2 == 1:
               odd_freq += 1
               odd_freq_item = k
       if odd_freq > 1:
           return 
       # we can only choose the first n // 2 characters. the middle character, if it exists, is fixed. the remaining characters on the right side mirrors the left.
       # we need to choose position i in the first n // 2 characters, such that all characters left of i is equal to target, and i is the smallest character greater than target.
       # take the rightmost position i, amongst all valid candidates

       # there is a special case. if the entirety of the left was equal to the target, this creates one special string, and if said special string has one position in the middle or right that is greater than the target, and the first occurence of such a positoin occurs before said special string has a position that is lower, than we can use this special string instead.
       target_left_counter = collections.Counter(target[:n // 2])
       if all(counter[k] >= v * 2 for k, v in target_left_counter.items()):
           left = target[:n // 2]
           mid = odd_freq_item if odd_freq_item else 
           right = left[::-1]
           special_str = left + mid + right
           if special_str > target:
               return special_str

       # find best candidate
       counter = counter_copy.copy()
       best_candidate = None
       for i in range(n // 2):
           for char in alphabet:
               if counter[char] >= 2 and char > target[i]:
                   best_candidate = i
           if counter[target[i]] < 2:
               break
           counter[target[i]] -= 2

       # construct the candidate answer
       if best_candidate != None:
           counter = counter_copy.copy()
           left_side = []
           for i in range(n // 2):
               if i < best_candidate:
                   left_side.append(target[i])
                   counter[target[i]] -= 2
               elif i == best_candidate:
                   for char in alphabet:
                       if char > target[i] and counter[char] >= 2:
                           left_side.append(char)
                           counter[char] -= 2 
                           break
               else:
                   for char in alphabet:
                       if counter[char] >= 2:
                           left_side.append(char)
                           counter[char] -= 2 
                           break
           
           right_side = left_side.copy()
           right_side.reverse()
           if odd_freq_item:
               left_side.append(odd_freq_item)
           left_side += right_side
           return .join(left_side)
       else:
           return 