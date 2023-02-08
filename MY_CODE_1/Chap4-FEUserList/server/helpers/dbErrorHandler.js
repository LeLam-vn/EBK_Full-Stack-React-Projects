'use strict'

/**
 * Get unique error field name
 */
const getUniqueErrorMessage = (errors) => {
    let output
    try {
        let fieldName = errors.message.substring(errors.message.lastIndexOf('.$') + 2, errors.message.lastIndexOf('_1'))
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists'
    } catch (ex) {
        output = 'Unique field already exists'
    }

    return output
}

/**
 * Get the error message from error object
 */
const getErrorMessage = (errors) => {
    let message = ''

    if (errors.code) {
        switch (errors.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(errors)
                break
            default:
                message = 'Something went wrong'
        }
    } else {
        for (let errName in errors.errors) {
            if (errors.errors[errName].message)
                message = errors.errors[errName].message
        }
    }

    return message
}

export default {getErrorMessage}
