export const removeTagInString = (description) => {
    if(description === null || description === "")
        return "No summary about series"
    let removedString = '';
    let addFlag = true;
    for(const ch of description){
        if(ch === '<')
            addFlag = false;

        if(addFlag)
            removedString += ch;

        if(ch === '>')
            addFlag = true;
    }
    return removedString;
}

export const getShortString = (description) => {
    if(description.length > 100)
        return description.slice(0, 100) + ".....";
    else
        return description;
}

export const imageMediumValidation = (image) => {
    if(image !== null){
        if(image.medium !== null){
            return image.medium.replace("http", "https");
        }
    }
    return "/images/EmptyState.jpg";
}

export const imageOriginalValidation = (image) => {
    if(image !== null){
        if(image.original !== null){
            return image.original.replace("http", "https");
        }
    }
    return "/images/EmptyState.jpg";
}


// 한국에서 실행한다고 가정하여 시차 고려
export const getUsDate = (option) => {
    const date = new Date();
    date.setHours(date.getHours() - 12);

    if(option === 'string'){
        return date.toISOString().split('T')[0];
    }else{
        return date;
    }
}