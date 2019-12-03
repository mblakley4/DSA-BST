class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }

    else if (key < this.key) {
      if (this.left == null) {
          this.left = new BinarySearchTree(key, value, this)
      }
      else {
          this.left.insert(key, value);
      }
    }
    else {
      if (this.right == null) {
          this.right = new BinarySearchTree(key, value, this);
      } else {
          this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key == key) {
        return this.value;
    } else if (key < this.key && this.left) {
        return this.left.find(key)
    } else if (key > this.key && this.right) {
        return this.right.find(key);
    } else {
        throw new Error('Key error');
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
          const successor = this.right._findMin();
          this.key = successor.key;
          this.value = successor.value;
          successor.remove(successor.key);
      }
      else if (this.left) {
          this._replaceWith(this.left);
      }
      else if (this.right) {
          this._replaceWith(this.right);
      }
      else {
          this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
        this.left.remove(key);
    }
    else if (key > this.key && this.right) {
        this.right.remove(key);
    }
    else {
        throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
          this.parent.left = node;
      }
      else if (this == this.parent.right) {
          this.parent.right = node;
      }
      if (node) {
          node.parent = this.parent;
      }
    } else {
      if (node) {
          this.key = node.key;
          this.value = node.value;
          this.left = node.left;
          this.right = node.right;
      } else {
          this.key = null;
          this.value = null;
          this.left = null;
          this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
        return this;
    }
    return this.left._findMin();
  }
}

function main() {
  const bst1 = new BinarySearchTree()
  const bst2 = new BinarySearchTree()
  const bst3 = new BinarySearchTree()

  bst1.insert(3, 3);
  bst1.insert(1, 1);
  bst1.insert(4, 4);
  bst1.insert(6, 6);
  bst1.insert(9, 9);
  bst1.insert(2, 2);
  bst1.insert(5, 5);
  bst1.insert(7, 7);

  bst2.insert('E');
  bst2.insert('A');
  bst2.insert('S');
  bst2.insert('Y');
  bst2.insert('Q');
  bst2.insert('U');
  bst2.insert('E');
  bst2.insert('S');
  bst2.insert('T');
  bst2.insert('I');
  bst2.insert('O');
  bst2.insert('N');

  console.log(bst1)
  console.log(bst2)
}

main();

//#5 Height of BST
function bstHeight(bst, left = 0, right = 0) {
  if (bst.key === null) {
    return 0;
  }

  if (!bst.left && !bst.right) {
    return 1;
  }
  if (bst.left) {
    left = 1 + bstHeight(bst.left, left, right);
  }
  if (bst.right) {
    right = 1 + bstHeight(bst.right, left, right);
  }
  return left > right ? left : right;
}

//#6 Is it a BST?
function checkIsBST(bst) {
  if (bst.key === null) {
    throw new Error('Invalid data');
  }

  if (!bst.left && !bst.right) {
    return true;
  }

  if (bst.left && bst.right) {
    if (bst.key < bst.left.key || bst.key > bst.right.key) {
      return false;
    }
    return true && checkIsBST(bst.left) && checkIsBST(bst.right);
  }

  if (bst.left) {
    if (bst.key < bst.left.key) {
      return false;
    }
    return true && checkIsBST(bst.left);
  }

  if (bst.right) {
    if (bst.key > bst.right.key) {
      return false;
    }
    return true && checkIsBST(bst.right);
  }
}

//#7 3rd largest node
