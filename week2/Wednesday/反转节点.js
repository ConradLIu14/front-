/**
 * leetcode: https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/submissions/
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var reverseList = function(head) {
    let pre = null
    let curr = head
    while(curr){
        let temp = curr.next
        curr.next = pre
        pre = curr
        curr = temp
    }
    return pre
};