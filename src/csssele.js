class Tree {
  constructor(v, children) {
    this.v = v
    this.children = children || null
  }
}
  
const tree = new Tree(10, [
  new Tree(5),
  new Tree(3, [new Tree(7), new Tree(11)]),
  new Tree(2)
])
  



function* tree_transverse(tree, path = []){
  yield {tree, path}
  if(tree.children){
    for(let i=0; i<tree.children.length; i++){
      yield *tree_transverse(tree.children[i],[...path, i])
    }
  }
}

function find_path(tree, v){
  for(let item of tree_transverse(tree)){
    if(item.tree.v === v){
      return item.path
    }
  }
}
// find_path(tree, 11)
//[1,1]




// console.log(a,'a')
// let b = find_path(tree,2)
// console.log(a, b, 'a', 'b')

function find_by_path(tree, path) {
  return path.length === 0 ? tree : find_by_path(tree.children[path[0]], path.slice(1))
}

console.log(find_by_path(tree, [1,1]))
//Tree { v: 11, children: null }

