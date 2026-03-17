function getLevel(rating){
    if(rating < 1200){
        return "Starter";
    }

    if(rating < 1900){
        return "Intermediate";
    }

    return "Advanced";

}
module.exports=getLevel;
