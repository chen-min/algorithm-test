function find(arr, value) {
  for(let i=0; i<arr.length; i++){
    if(arr[i] === value) {
      return value
    }
  }
  return null
}

