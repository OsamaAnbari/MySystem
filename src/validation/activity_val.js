function activityVal(data){
    let error = {}
    const chars = new RegExp(/^[a-zA-Z ]*$/)

    if(!data.name){
        error.name = 'Name is required'
    } else if (!chars.test(data.name)){
        error.name = 'Name must be only charachters'
    }

    if(!data.teacher){
        error.teacher = 'Teacher is required'
    } else if (!chars.test(data.teacher)){
        error.teacher = 'Teacher must be only charachters'
    }

    if(!data.date){
        error.date = 'Date is required'
    }

    if(!data.time){
        error.time = 'Time is required'
    }

    return error
}

export {activityVal}