const TemplateDetails = (state= [], action) =>{
    switch(action.type){
        case 'ADD_TEMPLATE_DETAILS':
            return[
                ...state,
                {
                    requestHeader: action.requestHeader,
                    requestBody: action.requestBody,
                    responseBody: action.responseBody
                }
            ]
        default:
            return state;
    }
}

export default TemplateDetails;