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

function select(node, path){
  if(path.length === 0 ){return [node]}  
}


//解析选择表达式 1 [>5] ========> [{child:1}, {op: (x) => x.v>5}]
function parse_selection_exp(expr){
  console.log(expr.split(''))
  return expr.split('').map( p => {
    if(p.match(/^\d+$/)){
      console.log('1111')
      return {child: parseInt(p)}
    } else {
      console.log('222')
      return {
        op : eval(`x => x.v ${p.replace(/\[\]/g, '')}`)
      }
    }
  })
}

// console.log(parse_selection_exp('1 [<5]'))

console.log('1 [<5]'.split(''))

