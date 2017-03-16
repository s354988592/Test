        let outMenuInfoData = this.props.data;
        let historyBillInfo = outMenuInfoData.billRec.historyBillInfo;
        console.log(2222222);
        var arr =[];
        var arr1 = [];
        historyBillInfo.map((item,index)=>{
            var time=item.billCycleEndDate;
            var timeStr = time.substring(2,4)+'/'+time.substring(4,6);
            arr1.push(timeStr);
        });
        let data = {
            total: 0,
            net_fee: [],
            talk_fee: [],
            msg_fee:[],
            add_fee:[],
            proxy_fee:[],
            other_fee:[],
            start_time: 0,
            end_time: 0
        };
        var datArr = historyBillInfo;
        datArr.forEach( function(ele, index) {
            var bills = ele.billMaterial;
            bills.forEach( function(bill, index) {
                var val = parseInt(bill.billEntriesValue)
                if (bill.billEntries == '固定费用') {
                    data.total += val
                } else if (bill.billEntries == '语音通信费') {
                    data.talk_fee.push({
                        key: ele.billCycleStartDate.substring(0, 6),
                        val: val
                    })
                } else if (bill.billEntries == '上网费') {
                    data.net_fee.push({
                        key: ele.billCycleStartDate.substring(0, 6),
                        val: val
                    })
                }else if (bill.billEntries == '短彩信') {
                    data.msg_fee.push({
                        key: ele.billCycleStartDate.substring(0, 6),
                        val: val
                    })

                }else if (bill.billEntries == '增值业务费') {
                    data.add_fee.push({
                        key: ele.billCycleStartDate.substring(0, 6),
                        val: val
                    })

                }else if (bill.billEntries == '代收费') {
                    data.proxy_fee.push({
                        key: ele.billCycleStartDate.substring(0, 6),
                        val: val
                    })

                }else if (bill.billEntries == '其他费用') {
                    data.other_fee.push({
                        key: ele.billCycleStartDate.substring(0, 6),
                        val: val
                    })

                }
            });
        });
        var nowTime = this.props.data.oprTime;
        var  n = parseInt(nowTime.substring(0,4));
        var  y = parseInt(nowTime.substring(4,6))-1;
        if (y-3<=0){
          var preN = n-1;
           var preY =y-3+12;
        }else {
           var preN = n;
           var  preY =y-3
        }

        console.log(data);
        var talk_arr = [];
        data.talk_fee.map((par,index)=>{
            talk_arr.push(par.val)
        });
        var net_arr = [];
        data.net_fee.map((par,index)=>{
            net_arr.push(par.val)
        });
        let payData = {
            title: '套餐外通话费用',
            contect: [
                {x: arr1[0], y: talk_arr[0]},
                {x: arr1[1], y: talk_arr[1]},
                {x: arr1[2], y: talk_arr[2]}
            ],
            unit: '元'
        };
        let payData1 = {
            title: '套餐外流量费用',
            contect:[
                {x: arr1[0], y: net_arr[0]},
                {x: arr1[1], y: net_arr[1]},
                {x: arr1[2], y: net_arr[2]}
            ],
            unit: '元'
        };