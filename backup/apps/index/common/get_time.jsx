function  dateFormat(date,fmt) { //author: meizz
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}

function getNextMonth(yyyy,mm){
    if (mm == 12){
        mm = '01';
        yyyy =  yyyy*1+1
    }else{
        mm =  mm*1+1
    }
    return yyyy+'-'+ PrefixInteger(mm,2) + '-01' ;
}

function getThisMonthLastDate(dateStr){
    var zero = ' 00:00:00';
    return dateFormat(new Date(new Date(dateStr+zero).getTime()-1),'yyyyMMdd')
}

export const currentDate = (yyyymmdd) => {
    yyyymmdd = String(yyyymmdd);
    var mm = yyyymmdd.substr(4,2);
    var yyyy = yyyymmdd.substr(0,4);
    var tmpDate = getNextMonth(yyyy,mm);
    return {
        beginDate: yyyy + '' + mm + '01',
        endDate: getThisMonthLastDate(tmpDate)
    }
}
export const preMonthDate=(yyyymmdd)=>{
    yyyymmdd = String(yyyymmdd);
    var mm = yyyymmdd.substr(4,2);
    var yyyy = yyyymmdd.substr(0,4);
    if( mm*1 == 1){
        return currentDate((yyyy*1-1)+'1201');
    }else{
        return currentDate(yyyy+(PrefixInteger(mm*1-1,2))+'01');
    }
}
