/* A Treap is a DS which combines the best of both worlds i.e. its a combination of BST and a Heap DS. It primarily has 2 values as part of the node:
1. key -> similar to the key/data in BST (smaller key/data goes left, larger goes right)
2. number -> random numeric value which follows maxHeap
*/

const generateRandomWithinRange = (max, min = 1) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class Node{
    constructor(data){
        this.data = data;
        this.priority = generateRandomWithinRange(100, 50);
        this.right = this.left = null;
    }
}

class Treap {
    constructor() {
        this.root = null;
    }

    rotateLeft(node){
        const rightNode = node.right;
        node.right = rightNode.left;
        rightNode.left = node;

        return rightNode;
    }

    rotateRight(node){
        const leftNode = node.left;
        node.left = leftNode.right;
        leftNode.right = node;

        return leftNode;
    }

    insertNode(data){

        const insertNodeHelper = (data, root) => {
            if(!root){
                return new Node(data);
            }

            if(data < root.data){
                root.left = insertNodeHelper(data, root.left);

                if(root.left !== null && root.priority < root.left.priority){
                    root = this.rotateRight(root);
                }
            }else{
                root.right = insertNodeHelper(data, root.right);

                if(root.right !== null && root.priority < root.right.priority){
                    root = this.rotateLeft(root);
                }
            }
        }

        const root = insertNodeHelper(data, this.root);
    }

    
}