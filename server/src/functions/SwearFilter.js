import Filter from 'bad-words';

let filter = new Filter();

// const profanities = [
//     'fuck'
// ]

export default function(text){
    
    // let words = text.split(' ');
    // for(let i = 0; i < words.length; i++){
    //     for(let j = 0; j < profanities.length; j++){
    //         if(words[i].toLowerCase() === profanities[j]) return profanities[j];
    //     }
    // }

    let check = filter.isProfane(text);
    return (check === false) ? null : check;
}