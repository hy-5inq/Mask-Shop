let myCart = [{name : 'a'},{name : 'b'},{name : 'c'}]
myCart = myCart.filter((item,index) => {
    if(index != 1){
        return item
    }
})
console.log(myCart)
