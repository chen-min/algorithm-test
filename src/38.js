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


function* transverse(node) {
  yield node 
  if(node, children) {
    for(let i=0; i<node.children.length; i++){
      yield *transverse(node.children[i])
    }
  }
}

// function* tree_transverse(tree, path = []){
//   yield {tree, path}
//   if(tree.children){
//     for(let i=0; i<tree.children.length; i++){
//       yield *tree_transverse(tree.children[i],[...path, i])
//     }
//   }
// }



function select(node, path){
  if(path.length === 0 ){return [node]}  
  const p = path.shift()
  if(p.child) {
    return select(node.children[p.child], [...path])
  } else if(p.op) {
    return [...tree_transverse(node)]
      .filter(_n => p.op(_n.node))
      .map( n => n.node)
  }
}



//解析选择表达式 1 [>5] ========> [{child:1}, {op: (x) => x.v>5}]
function parse_selection_exp(expr){
  // console.log(expr.split(' '))
  return expr.split(' ').map( p => {
    if(p.match(/^\d+$/)){
      return {child: parseInt(p)}
    } else {
      return {
        op : eval(`x => x.v ${p.replace(/[\[\]]/g, '')}`)
      }
    }
  })
}

function select_easy(tree, expr) {
  return select(tree, parse_selection_exp(expr))
}

//select_easy(tree, '1 [>5]')
// [Tree(7) Tree(11)]
