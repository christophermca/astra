
export const ADD_TEMPLATE_DATA = 'ADD_TEMPLATE_DATA'

export const addTemplateData = (requestHeader, requestBody, responseBody) =>({
    type: ADD_TEMPLATE_DATA,
    requestHeader,
    requestBody, 
    responseBody
})