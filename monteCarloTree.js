function UTCSearch(root) {
  let current = root;
  let reward;
  while (resourcesAvailable) {
    current = treePolicy(current);
    reward = defaultPolicy(current);
    backup(current, reward);
  }
}

function defaultPolicy(node) {
  let random = Math.floor(Math.random() * node.children.length);
  let a;
  while (!node.isTerminal) {
    a = node.children[random];
  }
  return a.reward;
}

function treePolicy() {
  while (!node.isTerminal) {
    if (!isExpanded) {
      return expanded(node);
    } else node = bestChild(node);
  }
}

function bestChild(node) {
  let value = -Infinity;
  let c = 1;
  node.children.forEach((child) => {
    childValue = node.v / node.n + c * Math.sqrt(Math.LN10(node) / node.n);
    if (childValue > value) {
      let best = child;
      value = childValue;
    }
  });
  return node;
}

function expand(node) {
  let notExpanded = [];
  node.children.forEach((child) => {
    if (!child.isExpanded) {
      notExpanded.push(child);
    }
  });
}

function backup(node, reward) {
  while (node != null) {
    node.n += 1;
    node.v += reward;
    node = node.parent;
  }
}
