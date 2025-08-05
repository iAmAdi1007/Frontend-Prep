/* A Tree DS is a data structure which can be used to store data which have a heirarchy to it.
 * There is a parent-child relationship in a tree data structure.
 * Each element inside a Tree DS is called as node.
 * Each node has a parent and a child except - root(no parent) & leaf(no child)
 * Internal Node - A node which has at least one child
 * External Node - A node which has 0 children - Leaf Node
 * Depth of any node - The total number od ancestors the tree has
 * Height of the Tree - The maximum depth of the ancestors from the 0th or root level
 */

class Node {
  constructor(data) {
    this.left = null;
    this.right = null;
    this.data = data;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  #insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.#insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.#insertNode(node.right, newNode);
      }
    }
  }

  insert(data) {
    const newNode = new Node(data);

    if (!this.root) {
      this.root = newNode;
    } else {
      this.#insertNode(this.root, newNode);
    }
  }

  search(key, node = this.root) {
    if (!node) {
      return false;
    } else {
      if (node.data == key) {
        return true;
      } else if (key < node.data) {
        return this.search(key, node.left);
      } else {
        return this.search(key, node.right);
      }
    }
  }

  findMin(node = this.root){
    if(!node){
        return null;
    }
    if(!node.left){
        return node
    } else{
        return this.findMin(node.left);
    }
  }

  findMax(node = this.root){
    if(!node){
        return null;
    }
    if(!node.right){
        return node.data
    } else{
        return this.findMax(node.right);
    }
  }

  remove(key, node = this.root){
    if(!node) return null;
    if(key < node.data){
        node.left = this.remove(key, node.left);
        console.log('Inside Left Subtree...', node);
        return node;
    }else if(key > node.data){
        node.right = this.remove(key, node.right);
        console.log('Inside Right Subtree...', node);
        return node;
    }else{
        // Leaf Node Case
        if(node.left == null && node.right == null){
            node = null;
            return node;
        }

        // Node with 1 child
        if(node.left == null){
            node = node.right;
            return node;
        }

        if(node.right == null){
            node = node.left;
            return node;
        }

        // Node with 2 children
        let minNodeFromRightSubTree = this.findMin(node.right);
        node.data = minNodeFromRightSubTree.data;
        node.right = this.remove(minNodeFromRightSubTree.data, node.right);
        return node;

    }
  }
}

const bstObj = new BinaryTree();

bstObj.insert(5);
bstObj.insert(6);
bstObj.insert(7);
bstObj.insert(1);


if (bstObj.search(7)) {
  console.log("Found");
} else {
  console.log("Node not found");
}

console.log(bstObj.findMin());
console.log(bstObj.findMax());
