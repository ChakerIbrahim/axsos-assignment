class Node:
    def __init__(self,value):
        self.value = value
        self.next = None

class Stack:
    def __init__(self):
        self.head = None

    def push(self,value):
        new_node = Node(value)
        new_node.next = self.head
        self.head = new_node

        return self
    
    def pop(self):
        if self.head is None:
            print("stack is empty")
            return None
        
        current = self.head
        self.head = self.head.next
        return current.value
    
    def display(self):
        current = self.head
        while current:
            print(current.value,end="=>")
            current = current.next
        print("Null")

stack = Stack()
stack.push(10).push(20).push(30).display()
stack.pop()
stack.display()