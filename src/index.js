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
    // Helper function: Recursively inserts the value
    const insertNode = (node, value) => {
      // Base case: Check if the current node is null
      if (node === null) {
        return new Node(value);
      }
      // Recursive cases
      if (value < node.data) {
        node.left = insertNode(node.left, value);
      } else if (value > node.data) {
        node.right = insertNode(node.right, value);
      } else {
        // Duplicate value found, do not insert
        console.log("Duplicate value found. Insertion rejected.");
      }
      // Return the modified node
      return node;
    };
    // Changes this.root to include the new value in the tree
    this.root = insertNode(this.root, value);
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
      } else if (value > node.date) {
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
      if (node === null) {
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
      if (node === null) {
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
      if (node === null) {
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

  height(node) {}

  depth(node) {}

  isBalanced() {}

  rebalance() {}
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
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);
prettyPrint(tree.root);
