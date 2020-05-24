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

export const imageMediumValidation = (image) => {
    if(image !== null){
        if(image.medium !== null){
            return image.medium;
        }
    }
    return "/images/EmptyState.jpg";
}

export const imageOriginalValidation = (image) => {
    if(image !== null){
        if(image.original !== null){
            return image.original;
        }
    }
    return "/images/EmptyState.jpg";
}