console.log('Client side javascript loaded')

const btn = document.querySelector('button')
console.log(btn)

const createUser = (name,email,username)=>{
    fetch('/create?name='+name+'&email='+email+'&username='+username,{method:"POST"})
}


btn.addEventListener('click',()=>{
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const username = document.getElementById('username').value
    createUser(name,email,username)
    console.log('Clicked!!')
})
  