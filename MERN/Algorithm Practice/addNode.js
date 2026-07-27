class Node {
    constructor(val){
        this.left = null;
        this.right = null;
        this.val =val;
    }
}



class BST{
    constructor(){
        
        this.root = null;
    }
    addValue(val){
        if(root===null){
            root=new Node(val)
        }
        else{
            this.insert(this.root, new Node(val))
        }
    }
    insert(root, newNode){
        if(newNode.val<root.val){
            if(root.left==null){
                root.left=newNode
            }
            else{
                this.insert(root.left,newNode)
            }
        }
        else{
            if(root.right==null){
                root.right=newNode
            }
            else{
                this.insert(root.right,newNode)
            }
        }
    }



































        
    }
}

