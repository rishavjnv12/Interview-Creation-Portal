console.log("User js loaded")

const scheduleButtons = document.querySelectorAll('.schedule')
for(let i = 0;i<scheduleButtons.length;i++){
    const btn = scheduleButtons.item(i)
    const parent = btn.parentElement
    btn.addEventListener('click',()=>{
        if(parent.getElementsByTagName('div').length === 0){
            var html = 
                '<form> \
                    <label for="date">Date:</label><br> \
                    <input type="date" id="date" name="fname"><br> \
                    <label for="startTime">Starting Time:</label> \
                    <input type="time" id="startTime" name="Starting Time"><br> \
                    <label for="endTime">Ending Time:</label> \
                    <input type="time" id="endTime" name="Ending Time"><br> \
                    <button type="button" id="submit">Submit</button> \
                </form>'
            parent.innerHTML += html
            parent.querySelector('#submit').addEventListener('click',()=>{
                const date = parent.querySelector('#date').value
                const startTime = parent.querySelector('#startTime').value
                const endTime = parent.querySelector('#endTime').value
                const username = parent.querySelector('.username').innerHTML

                // console.log({username,date,startTime,endTime})
                fetch('/users?username='+username+'&date='+date+'&startTime='+startTime+'&endTime='+endTime,{method:'POST'}).then(async (res)=>{
                    const status = res.status
                    if(status === 403){
                        alert('Interviewee busy!\nSelect different slot')
                    }else if(status === 201){
                        alert('Interview Scheduled Successfully!')
                    }else{
                        alert('Connection Error!')
                    }
                    location.reload()
                })
            })
        }  
    })
}
// scheduleButton.addEventListener('click',()=>{
//     console.log('Button Clicked')
// })
