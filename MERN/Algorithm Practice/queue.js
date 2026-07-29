class Node {
    constructor(data) {
        this.data = data
        this.next = null
    }
}

class Queue {
    constructor() {
        this.head = null
        this.tail = null
    }

    isEmpty() {
        return this.head == null
    }

    getPeek() {
        return this.head.data;
    }

    enqueue(value) {
        let newnode = new Node(value)
        if (this.tail != null) {
            this.tail.next = newnode
        }
        this.tail = newnode

        if (this.head == null) {
            this.head = newnode
        }
    }

    dequeue() {
        let data = this.head.data
        this.head = this.head.next

        if (this.head == null) {
            this.tail = null
        }
        return data;
    }

    printQueue() {
        let current = this.head
        var result = ""
        while (current != null) {
            result += current.data + "->"
            //console.log(current.data + "->")
            current = current.next
        }
        console.log(result);
    }
}

let Q = new Queue();
Q.enqueue(10)
Q.enqueue(20)
Q.enqueue(30)
Q.enqueue(40)
Q.enqueue(50)

Q.printQueue()
console.log(Q.getPeek())
console.log(Q.isEmpty())
Q.dequeue()
Q.printQueue()
