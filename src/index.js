import "./style.css";

class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    // Remove duplicates and sort the array
    const uniqueSortedArray = Array.from(new Set(array)).sort((a, b) => a - b);
    // Recursive function to build balanced BST
    const buildBST = (arr, start, end) => {
      if (start > end) return null;
      // Get the middle element and make it the root
      const mid = Math.floor((start + end) / 2);
      const rootNode = new Node(arr[mid]);
      // Recursively construct left and right subtrees
      rootNode.left = buildBST(arr, start, mid - 1);
      rootNode.right = buildBST(arr, mid + 1, end);
      return rootNode;
    };
    return buildBST(uniqueSortedArray, 0, uniqueSortedArray.length - 1);
  }

  insert(value) {
    const newNode = new Node(value);
    console.log("New Node:", newNode.data);
    // Helper function: Recursively inserts the value
    const insertNode = (node, newNodeToInsert) => {
      // Base case: Check if the current node is null or undefined
      if (node === null || node === undefined) {
        return newNodeToInsert;
      }
      console.log("Current Node:", node.data);
      // Recursive cases
      if (newNodeToInsert.data < node.data) {
        console.log("Inserting into the left subtree...");
        node.left = insertNode(node.left, newNodeToInsert);
      } else if (newNodeToInsert.data > node.data) {
        console.log("Inserting into the right subtree...");
        node.right = insertNode(node.right, newNodeToInsert);
      } else {
        // Duplicate value found, do not insert
        console.log("Duplicate value found. Ignoring insertion.");
      }
      // Return the modified node
      return node;
    };

    // Changes this.root to include the new value in the tree
    this.root = insertNode(this.root, newNode);
    console.log("Root Node:", this.root.data);
}

  delete(value) {
    // Helper function: Recursively deletes the value
    const deleteNode = (node, value) => {
      // Base case: Check if the current node is equal to the value
      if (node === null) {
        return null;
      }
      // Search for the node to delete
      if (value < node.data) {
        node.left = deleteNode(node.left, value);
      } else if (value > node.data) {
        node.right = deleteNode(node.right, value);
      } else {
        // Node found, now handling deletion
        // Case 1: Node has no children
        if (node.left === null && node.right === null) {
          return null;
        }
        // Case 2: Node has one child
        if (node.left === null) {
          return node.right;
        }
        if (node.right === null) {
          return node.left;
        }
        // Case 3: Node has two children
        // Find min. value in right subtree or max. value in left subtree
        // Copy the value to the current node
        // Delete the duplicate value from the right subtree
        let minRight = node.right;
        while (minRight.left !== null) {
          minRight = minRight.left;
        }
        node.data = minRight.data;
        node.right = deleteNode(node.right, minRight.data);
      }
      return node;
    };
    this.root = deleteNode(this.root, value);
  }

  find(value) {
    const findNode = (node, value) => {
      // Base cases
      if (node === null) {
        return false;
      }
      if (node.data === value) {
        return true;
      }
      // Recursive cases
      if (value < node.data) {
        // Search left subtree
        return findNode(node.left, value);
      } else if (value > node.data) {
        // Search right subtee
        return findNode(node.right, value);
      } else {
        // Value not found
        return false;
      }
    };
    return findNode(this.root, value);
  }

  levelOrder(callback) {
    // Breadth-first traversal
    // First-In-First-Out(FIFO)
    const result = [];
    if (!this.root) return result;
    // Initialize queue with the root node
    const queue = [this.root];
    while (queue.length > 0) {
      // Remove the first node from the queue
      const current = queue.shift();
      if (callback) {
        // Invoke the callback with the current node's data
        callback(current.data);
      } else {
        // Push the current node's data into the result array
        result.push(current.data);
      }
      if (current.left) {
        // Add the left child to the queue
        queue.push(current.left);
      }
      if (current.right) {
        // Add the right child to the queue
        queue.push(current.right);
      }
    }
    return result;
  }

  inOrder(callback) {
    // Depth-first traversal
    // Left - Root - Right : Tree Traversal
    // Last-In-First-Out(LIFO)
    const result = [];
    if (!this.root) return result;
    const traverse = (node) => {
      if (node === null || node === undefined) {
        return;
      }
      // Left
      traverse(node.left);
      // Root
      if (callback) {
        // Invoke the callback with the current node's data;
        callback(node.data);
      } else {
        // Push the current node's data into the result array
        result.push(node.data);
      }
      // Right
      traverse(node.right);
    };
    // Start the recursive traversal from the root node
    traverse(this.root);
    return result;
  }

  preOrder(callback) {
    // Depth-first traversal
    // Root - Left - Right : Tree Traversal
    // Last-In-First-Out(LIFO)
    const result = [];
    if (!this.root) return result;
    const traverse = (node) => {
      if (node === null || node === undefined) {
        return;
      }
      // Root
      if (callback) {
        // Invoke the callback with the current node's data;
        callback(node.data);
      } else {
        // Push the current node's data into the result array
        result.push(node.data);
      }
      // Left
      traverse(node.left);
      // Right
      traverse(node.right);
    };
    traverse(this.root);
    return result;
  }

  postOrder(callback) {
    // Depth-first traversal
    // Left - Right - Root : Tree Traversal
    // Last-In-First-Out(LIFO)
    const result = [];
    if (!this.root) return result;
    const traverse = (node) => {
      if (node === null || node === undefined) {
        return;
      }
      // Left
      traverse(node.left);
      // Right
      traverse(node.right);
      // Root
      if (callback) {
        // Invoke the callback with the current node's data;
        callback(node.data);
      } else {
        // Push the current node's data into the result array
        result.push(node.data);
      }
    };
    traverse(this.root);
    return result;
  }

  height(node) {
    if (node === null || node === undefined) {
      // Height of an empty subtree is -1
      return -1;
    }
    // Recursively compute the height
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    // Return the maximum height of the left & right subtree plus 1
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    const calculateDepth = (currentNode, currentDepth) => {
      if (currentNode === null) {
        // Depth of an empty node is -1
        return currentDepth - 1;
      }
      // Recursively calculate the depth of the parent node
      return calculateDepth(currentNode.parent, currentDepth + 1);
    };
    // Start calculating depth from 0
    return calculateDepth(node, 0);
  }

  isBalanced() {
    const checkBalanced = (node) => {
      if (node === null) {
        return true; // An empty subtree is balance
      }

      // Calculate the height of the left and right subtrees
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);

      // Check if the difference in heights is greater than 1
      if (Math.abs(leftHeight - rightHeight) > 1) {
        // Tree is unbalanced
        return false;
      }
      // Recursively check if both left and right subtrees are balanced
      return checkBalanced(node.left) && checkBalanced(node.right);
    };
    // Start checking tree balance from the root node
    return checkBalanced(this.root);
  }

  rebalance() {
    // Get the values of the tree sorted using inOrder()
    const values = this.inOrder();
    // Rebuild the tree from sorted values
    console.log(tree.root);
    this.root = this.buildTree(values);
    console.log(tree.root);
  }
}

// Function to display tree to console in a structured format
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Example usage:
// Create a binary search tree from an array of random numbers < 100.
const randomArray = () => {
  let array = [];
  while (array.length < 20) {
    const randomNumber = Math.round(Math.random() * 98) + 1;
    array.push(randomNumber);
  }
  return array;
};

const array = randomArray();
const tree = new Tree(array);
console.log(tree.root);
console.log(prettyPrint(tree.root));

// Confirm that the tree is balanced by calling isBalanced.
console.log(`Balanced: ${tree.isBalanced(tree.root)}`);

// Print out all elements in level, pre, post, and in order.
console.log(`Balanced: levelOrder ${tree.levelOrder()}`);
console.log(`Balanced: inOrder ${tree.inOrder()}`);
console.log(`Balanced: preOrder ${tree.preOrder()}`);
console.log(`Balanced: postOrder ${tree.postOrder()}`);

// Unbalance the tree by adding several numbers > 100.
tree.insert(123);
tree.insert(155);
tree.insert(188);
tree.insert(145);
tree.insert(120);
tree.insert(111);

// Confirm that the tree is unbalanced by calling isBalanced.
console.log(`Unbalanced: ${tree.isBalanced(tree.root)}`);

// Balance the tree by calling rebalance.
tree.rebalance();
console.log(`Rebalanced.`);

// Confirm that the tree is balanced by calling isBalanced.
console.log(`Balanced: ${tree.isBalanced(tree.root)}`);

// Print out all elements in level, pre, post, and in order.
console.log(`Balanced: levelOrder ${tree.levelOrder()}`);
console.log(`Balanced: inOrder ${tree.inOrder()}`);
console.log(`Balanced: preOrder ${tree.preOrder()}`);
console.log(`Balanced: postOrder ${tree.postOrder()}`);

console.log(prettyPrint(tree.root));
