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

// function tree_transverse(tree) {
//   console.log(tree.v)
//   tree.children && tree.children.forEach(tree_transverse)
// }

// function tree_transverse_1(tree) {
//   tree.children && tree.children.forEach(tree_transverse)
//   console.log(tree.v)
// }



// function tree_transverse(tree, ord, callback) {
//   let transversed = false 
//   if(!tree.children) {
//     callback(tree.v)
//     return
//   }
//   tree.children.forEach( (child,i) => {
//     if(i === ord) {
//       transversed = true
//       callback(tree.v)
//     }
//     tree_transverse(child, ord, callback)
//   })
//   !transversed && callback(tree.v)
// }


// const newTree  = tree_transverse_1(tree)
// console.log(newTree, 'newTree')

// const node = [...tree_transverse(tree)]
// //或者
// for(let node of tree){
//   //....
// }

function* tree_transverse(tree, ord=0){
  let transversed = false
  if(!tree.children){
    yield tree
    return
  }
  for(let i = 0; i < tree.children.length; i++){
    if( i === ord ) {
      transversed = true
      yield tree
    }
    yield *tree_transverse(tree.children[i], ord)
  }
  if(!transversed){
    yield tree
  }
}

function find(tree, prediction){
  return [...tree_transverse(tree)].find(prediction)
}

// function find(tree, prediction){
//   for(let node of tree_transverse(tree)){
//     if(prediction(node)){
//       return node
//     }
//   }
// }
//使用*************************
find(tree, node => node.v == 2)








