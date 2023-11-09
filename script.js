const ido = document.querySelector('.ido')
const box = document.createElement('button')
box.classList.add('box')
box.textContent = "ido"
ido.appendChild(box)

function Book(name,page,year){
  this.name = name
  this.page = page
  this.year = year
  this.info = ()=>{console.log(name + " " + page + " " + year)}
}

let arr =[]
for(let i =0 ; i<5; i++){
  let book = new Book('ido',100+(i*9),2000+(i+10))
  console.log(book.info())

}