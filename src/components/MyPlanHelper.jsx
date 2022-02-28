const myPlanHelper = {
    list: [
        {
            key: 'userdefined', param: 0, result: '',
            value: '自訂',
            directions: '請自行輸入，或選擇「類型」，讓我幫您計算價位',
        },
        {
            key: 'lossRatio', param: 1, result: '停損價',
            value: '依虧損比率決定停損價',
            directions: '請輸入「參考價」，並於「參數1」設定虧損%數，我來幫您計算停損價'
        },
        {
            key: 'riskRewardRatio', param: 1, result: '合理價',
            value: '依風險報酬比決定參考價',
            directions: '請輸入「目標價」、「停損價」，並於「參數1」設定自己滿意的風險報酬比，我來幫您計算合理價',
        },
    ]
};

myPlanHelper.findIndex = (searchValue) => {
    let searched = myPlanHelper.list.map(obj => {
        if (Object.keys(obj).some(property => obj[property].toString().indexOf(searchValue) !== -1)) {
            return obj;
        }
        return undefined;
    });
    return searched.filter(obj => obj !== undefined)[0];
}
myPlanHelper.getFunction = (name) => {
    return myPlanHelper[name];
}

myPlanHelper.userdefined = () => "";

myPlanHelper.riskRewardRatio = ({ plan_target, plan_stoploss, plan_param1 }) => {
    if (plan_target && plan_stoploss && plan_param1) {
        let anchor = (plan_target + plan_stoploss * plan_param1) / (plan_param1 + 1);
        return anchor;
    }
}

myPlanHelper.lossRatio = ({ plan_anchor, plan_param1 }) => {
    if (plan_param1) {
        let stoploss = plan_anchor * (1 - plan_param1 * 0.01);
        return stoploss;
    }
}

export default myPlanHelper