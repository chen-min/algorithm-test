//树的抽象和表示
class DOMTree{
  constructor(tag, className, children = [], value){
    this.tag = tag
    this.className = className
    this.children = children
    this.value = value
  }
}

const tree =  new DOMTree('div', '', [
  new DOMTree('div', 'content', [
    new DOMTree('table', '', [
      new DOMTree('tr', 'a', [
        new DOMTree('td', 'b', [
          new DOMTree('text', '', null, '1')
        ]),
        new DOMTree('td', '', [
          new DOMTree('text', 'a', null, '2')
        ]),
        new DOMTree('td', '', [
          new DOMTree('text', '', null, '3')
        ])
      ])
    ])
  ])
])
// 节点的遍历/查找方法
function* transverse(node) {
  yield node 
  if(node.children) {
    for(let i=0; i<node.children.length; i++){
      yield *transverse(node.children[i])
    }
  }
}

function index(tree){
  const classes = {}
  const nodes = [...transverse(tree)]
  nodes.forEach(node  => {
    if(node.className) {
      if(!classes[node.className]) {
        classes[node.className] = []
      }
      classes[node.className].push(node)
    }
  })
  return classes
}

function findByClassName(node, className){
  return [...transverse(node)].filter(node => node.className === className)
}
function findByTagName(node, tagName) {
  return [...transverse(node)].filter(node  => node.tagName = tagName)
}

//表达式解析
function selection_expr_parse(expr) {
  return expr.split('').map( x => {
    if(x[0] === '.'){
      return {className: x.substr(1)}
    } else {
      return {tageName: x}
    }
  })
}
// '.content tr td'  => 
// [
//   { className: 'content'},
//   { tagName: 'tr'},
//   { tagName: 'td'}
// ]
function select(node, path) {
  if(path.length ===0 ) {return [node]}
  const p = path.shift()
  let nodes = []
  if(p.className){
    nodes = findByClassName(node, p.className)
  } else {
    nodes = findByTagName(node, p.tagName)
  }
  return [].concat(...nodes.map(n => select(n, [...path]))
  )
}


// select(tree, '.content tr td')