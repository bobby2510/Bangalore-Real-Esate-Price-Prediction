bedroom = document.querySelectorAll('#bedroom')
bedroom.forEach((bedroom_obj,index)=>{
    bedroom_obj.addEventListener('click',()=>{
        bedroom.forEach((temp_bedroom)=>{temp_bedroom.classList.remove('active')})
        bedroom_obj.classList.add('active')
    })
})
bathroom = document.querySelectorAll('#bathroom')
bathroom.forEach((bathroom_obj,index)=>{
    bathroom_obj.addEventListener('click',()=>{
        bathroom.forEach((temp_bathroom)=>{temp_bathroom.classList.remove('active')})
        bathroom_obj.classList.add('active')
    })
})

let load_locations = function()
{
    url ='http://127.0.0.1:5000/load_locations'
    $.get(url,function(data,status)
    {
        if(data)
        {
            let locations = data.locations
            location_obj = document.getElementById('locations')
            $('#locations').empty()
            for(let i=0;i<locations.length;i++)
            {
                $('#locations').append(new Option(locations[i]))
            }
        }
    })
}
window.onload=load_locations


function get_total_sqft()
{
    total_sqft = document.getElementById('total_sqft')
    let result=null
    if(total_sqft.value != '')
        result=total_sqft.value
    return result
}
function get_bedroom()
{
    temp_bedroom = document.querySelectorAll('#bed')
    let result=null
    temp_bedroom.forEach((bed,index)=>
    {
        if(bed.checked == true)
            result=index+1
    })
    return result
}
function get_bathroom()
{
    temp_bathroom = document.querySelectorAll('#bath')
    let result=null
    temp_bathroom.forEach((bath,index)=>
    {
        if(bath.checked == true)
            result=index+1
    })
    return result
}

function get_estimated_price()
{
    let error = document.getElementById('error_message')
    error.textContent=''
    let location_value = document.getElementById('locations').value
    let total_sqft_value = get_total_sqft()
    if(total_sqft_value == null)
    {
        error.textContent='Total Sqft cannot be empty!'
        return
    }
    total_sqft_value=parseFloat(total_sqft_value)
    let bedroom_value=get_bedroom()
    if(bedroom_value == null)
    {
        error.textContent='Number of bedrooms cannot be empty!'
        return
    }
    let bathroom_value =get_bathroom()
    if(bathroom_value==null)
    {
        error.textContent='Number of bathrooms cannot be empty!'
        return
    }
    url='http://127.0.0.1:5000/predict_price'
    $.post(url,{
        location:location_value,
        size:bedroom_value,
        total_sqft:total_sqft_value,
        bath:bathroom_value
    },function(data,status)
    {
        let result = data.estimated_price
        document.getElementById('result_panel').style.display='block'
        document.getElementById('result_label').textContent='Our Model Predicted Price : '
        document.getElementById('result_value').textContent=`Rs ${result} lakhs`
    })
}
