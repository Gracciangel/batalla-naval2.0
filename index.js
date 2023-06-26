function toggle(){
let form  = document.getElementById('form').classList.toggle('active')
let boat = document.getElementById('boat').classList.toggle('inactive')

}

let btn = document.getElementById('btn')


function validation (){
    btn.addEventListener(('click'), (e)=>{
    
        e.preventDefault()
        let current = 2023
       let nombre = document.getElementById('name')
       let email = document.getElementById('email')
       let date = document.getElementById('date')
       let edad = parseInt(date.value)

       
       if(nombre.value === '' || email.value ===''){
        form.classList.add('error')
        setTimeout(()=>{
            form.classList.remove('error')
        }, 1000)
       
       }else{
        if(nombre.value=== '' && email.value ==='' && current-edad < 18){
            form.classList.add('error')
            setTimeout(()=>{
                form.classList.remove('error')
            }, 1000)
        
            Swal.fire('por favor revisa los campos ')
        }else{
            if(current - edad < 18){
                form.classList.add('error')
                alert(`debes tener al menos 18 años para jugar`)
                setTimeout(()=>{
                    form.classList.remove('error')
                }, 1000)
              
            }else{
                
                window.location.href='./play.html'
    
            }
            
        }
       }
       
       
    })
    
}

 
let body = document.getElementById('body')
let form = document.getElementById('form')
let mode = document.getElementById('darkMode')
function darkMode(){
mode.classList.toggle('toggleDark')
form.classList.toggle('formDark')
body.classList.toggle('dark')
body.style.transition='.5s'

}

let btnDark = document.getElementById('darkMode')
btnDark.addEventListener(('click'),()=>{
    darkMode()
    
})

validation()