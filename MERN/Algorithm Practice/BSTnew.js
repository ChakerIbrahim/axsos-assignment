class Node {

    constructor(data) {
        this.data = data;
        this.left = null
        this.right = null
    }
}

class BST {

    constructor() {
        this.root = null
    }

    insert(val) {
        var newNode = new Node(val)
        if (this.root === null) {
            this.root = newNode;
        }
        else {
            this.insertNode(this.root, newNode)
        }

    }

    insertNode(root, newNode) {
        if (newNode.data < root.data) {
            if (root.left === null) {
                root.left = newNode;
            }
            else {
                this.insertNode(root.left, newNode)
            }
        }
        else {
            if (root.right === null) {
                root.right = newNode
            }
            else {
                this.insertNode(root.right, newNode)
            }
        }
    }

    getRootNode() {
        return this.root;
    }

    preorder(root) {
        if (root !== null) {
            console.log(root.data);
            this.preorder(root.left)
            this.preorder(root.right)
        }
    }

    inorder(root) {
        if (root !== null) {
            this.inorder(root.left)
            console.log(root.data);
            this.inorder(root.right)
        }
    }

    postorder(root) {
        if (root !== null) {
            this.postorder(root.left)
            this.postorder(root.right)
            console.log(root.data);
        }
    }

    //Breadth First Search
    BFS(root) {
      if(root == null){
        return;
      }

      var queue = new Queue()
      queue.enqueue(root)

      while(!queue.isEmpty()){
        var currentNode = queue.dequeue();
        console.log("Node" + currentNode.data);

        if(currentNode.left != null) {
          queue.enqueue(currentNode.left)

        }
        if(currentNode.right != null){
          queue.enqueue(currentNode.right)
        }
      }
    }

    getMinValue() {
        if (this.root === null) {
            return null;
        }
        else {
            return this.getminValueNode(this.root);
        }
    }

    getminValueNode(node) {
        if (node.left === null) {
            return node;
        }
        else {
            return this.getminValueNode(node.left);
        }
    }

    find(value) {
        return this.findNode(this.root, value);
    }


    findNode(root, value) {
        if (root === null) return null;
        if (root.data === value) return root;


        if (value < root.data) {
            return this.findNode(root.left, value);
        } else {
            return this.findNode(root.right, value);
        }
    }


}


var BinarySearchTree = new BST();

BinarySearchTree.insert(100);
BinarySearchTree.insert(200);
BinarySearchTree.insert(30);
BinarySearchTree.insert(10);
BinarySearchTree.insert(35);
BinarySearchTree.insert(150);
BinarySearchTree.insert(300);
var rootvalue = BinarySearchTree.getRootNode();
console.log("-------" + JSON.stringify(rootvalue));


//BinarySearchTree.preorder(BinarySearchTree.getRootNode())
//BinarySearchTree.inorder(BinarySearchTree.getRootNode())

BinarySearchTree.BFS(BinarySearchTree.getRootNode());

//console.log(BinarySearchTree.getMinValue().data);

//console.log(BinarySearchTree.find(2222));