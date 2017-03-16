export const getNumberWithUnit=(number, dot)=>{
    let unitArray = ['TB', 'GB', 'MB', 'KB'];
    let i = unitArray.length-1;
    function formatFloat(src, pos) {
        return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
    }
    return {
        number:(function privateCalculate(n) {
                if (n > 1024) {
                    i--;
                    return privateCalculate(formatFloat(n/1024,dot));
                } else {
                    return n;
                }
            })(number),
        unit:unitArray[i]
    };
}
