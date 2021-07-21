# leetcode: https://leetcode-cn.com/problems/kth-largest-element-in-an-array/submissions/

from typing import List
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        def insert(arr,in_for_insert):
            arr.append(in_for_insert)
            i = len(arr) -1
            T=True
            # p_index=0
            p_index = ((i + 1) >> 1) - 1
            while arr[p_index] > arr[i] and p_index>=0:
                helper = arr[p_index]
                arr[p_index] = arr[i]
                arr[i] = helper
                i = p_index
                p_index = ((i + 1) >> 1) - 1
            return arr

        def swap(a,b):
            return b,a

        def remove_head(arr):
            i = 0
            butt = arr.pop()
            
            if arr:arr[i]=butt
            else: arr = [butt]
            while 2*(i+1)<k:
                left_index = 2 * (i + 1) - 1
                right_index = 2 * (i + 1)
                if left_index == len(arr)-1:
                    arr.append(butt)
                    break
                elif left_index >len(arr)-1:
                    break
                elif arr[i]<arr[left_index] and arr[i]<arr[right_index]:
                    break
                else:
                    if arr[i]<arr[left_index] and arr[i]>arr[right_index]:
                        arr[i],arr[right_index]=swap(arr[i],arr[right_index])
                        i = right_index
                        continue
                    elif arr[i]>arr[left_index] and arr[i]<arr[right_index]:
                        arr[i],arr[left_index]=swap(arr[i],arr[left_index])
                        i = left_index
                        continue
                    else:
                        if arr[right_index]>arr[left_index]:
                            arr[i],arr[left_index]=swap(arr[i],arr[left_index])
                            i = left_index
                        else:
                            arr[i],arr[right_index]=swap(arr[i],arr[right_index])
                            i=right_index
            return arr

        heap = [nums[0]]
        for i in range(1,k):
            insert(heap,nums[i])
        for i in range(k,len(nums)):
            if nums[i]<=heap[0]:
                continue
            else:
                remove_head(heap)
                insert(heap,nums[i])
        # print(is_heap(heap),heap)
        return heap[0]