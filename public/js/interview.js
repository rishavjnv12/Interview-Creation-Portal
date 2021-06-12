const deleteButtons = document.querySelectorAll('.delete')
const rescheduleButtons = document.querySelectorAll('.edit')

console.log('Interview.js loaded')

deleteButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        const parentDiv = button.parentElement;
        const interviewId = parentDiv.querySelector('.id').innerHTML.substring(14)
        fetch('/interview?'+'delete='+'true'+'&id='+interviewId,{method:'POST'}).then((res)=>{
            if(res.status === 200){
                alert('Delete Successfully')
                location.reload()
            }else{
                alert('Connection Error')
                location.reload()
            }
        })
    })
})
rescheduleButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        console.log('Clicked')
        var parent = button.parentElement
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
            const newDate = parent.querySelector('#date').value
            const newStartTime = parent.querySelector('#startTime').value
            const newEndTime = parent.querySelector('#endTime').value
            const interviewId = parent.querySelector('.id').innerHTML.substring(14)

            console.log(interviewId)
            fetch('/interview?id='+interviewId+'&newDate='+newDate+'&newStartTime='+newStartTime+'&newEndTime='+newEndTime,{method:'POST'}).then(async (res)=>{
                const status = res.status
                if(status === 403){
                    alert('Interviewee busy!\nSelect different slot')
                }else if(status === 200){
                    alert('Interview Rescheduled Successfully!')
                }else{
                    alert('Connection Error!')
                }
                location.reload()
            })
        })
    })
})
