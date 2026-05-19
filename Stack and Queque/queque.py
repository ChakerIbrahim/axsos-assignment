class Node:
    def __init__(self,data):
        self.data = data
        self.next= None

class Queue:
    def __int__(self):
        self.head = None
        self.tail = None

    def enqueue(self,data):
        newNode=Node(data)
        if self.head is None:
            self.head=newNode
            self.tail

        self.tail.next=newNode
        self.tail=newNode

    def dequeue(self):
        if self.head is None:
            return None
        
        data=self.head.data
        self.head=self.head.next
        return data
    def isempty(self):
        return self.head is None