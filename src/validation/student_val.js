function studentVal(data){
    let error = {}
    const chars = new RegExp(/^[a-zA-Z ]*$/)
    const nums = new RegExp(/^[0-9]*$/)

    if(!data.tc){
        error.tc = 'TC is required'
    } else if (!nums.test(data.tc)){
        error.tc = 'TC must be only digits'
    }

    if(!data.name){
        error.name = 'Name is required'
    } else if (!chars.test(data.name)){
        error.name = 'Name must be only charachters'
    }

    if(!data.surname){
        error.surname = 'Surname is required'
    } else if (!chars.test(data.name)){
        error.surname = 'Surname must be only charachters'
    }

    if(!data.department){
        error.department = 'Department is required'
    } else if (!chars.test(data.department)){
        error.department = 'Department must be only charachters'
    }

    if(!data.mobile){
        error.mobile = 'Mobile is required'
    } else if (!nums.test(data.mobile)){
        error.mobile = 'Mobile must be only charachters'
    }

    return error
}

export {studentVal}