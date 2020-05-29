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
    date.setHours(date.getHours() - 14);

    if(option === 'string'){
        return date.toISOString().split('T')[0];
    }else{
        return date;
    }
}

export const getDayString = () => {
    const date = getUsDate();
    switch(date.getDay()){
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "none";
    }
}

export const getDB = () =>  {
    let db;
    if (!db) {
      db = new Promise((resolve, reject) => {
        const openreq = window.indexedDB.open("MySeries");
        openreq.onerror = () => {
          reject(openreq.error);
        };
  
        openreq.onsuccess = () => {
          resolve(openreq.result);
        };
      });
    }
    return db;
}