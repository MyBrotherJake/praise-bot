'use strict';
/**
 * slack上で欲しい言葉をくれるボット
 */
// FileSystem
const fs = require('fs');
// 保存先
const fileName = './praise.json';
// デフォルト
let praiseWords = [
    {index:1, msg:"今日はよくがんばりました。すごいです。"},
    {index:2, msg:"生きていてくれて嬉しいです。ありがとう。"},
    {index:3, msg:"あなたの頑張りは私だけが知っています。お疲れ様でした。"},
    {index:4, msg:"あなたの優しさはきっと届いています。"},
    {index:5, msg:"今のあなたはイケてます。すごくいい感じです。"},
    {index:6, msg:"たくさんがんばりましたね。今日もお疲れ様でした。"}        
];
/**
 * 登録された言葉を保存する
 */
function saveWords(){
    fs.writeFileSync(fileName, JSON.stringify(praiseWords), 'utf8');
}

try{
    const data = fs.readFileSync(fileName, 'utf8');
    praiseWords = JSON.parse(data);
}catch(ignore){
    console.log(fileName + 'から復元できませんでした');
}
/**
 * インデックスの最大値にプラス1をする
 * @returns 最大値
 */
function maxIndex(){
    let newInt = 1;
    //配列のindexのみ取得
    const maxArray = praiseWords.map(m => m.index);
    //最大値
    for(let max of maxArray){
        if(max > newInt){
            newInt = max + 1;
        }
    }
    return newInt;
}
/**
 * メッセージの追加
 * @param {integer} index  
 * @param {string} msg  メンションするメッセージ
 */
function addPraise(msg){
    //indexの最大値取得    
    const newIndex = maxIndex();
    praiseWords.push({index:newIndex, msg:msg});
    // SaveFile
    saveWords();
}
/**
 * 指定したインデックスでメッセージの削除
 * @param {integer} index 
 */
function delPraise(index){
    //指定されたインデックスの存在チェック
    const indx = praiseWords.findIndex(p => p.index === index);
    if(indx !== -1){
        praiseWords.splice(indx, 1);
        saveWords();
    }
}
/**
 * 一覧を表示
 * @returns index : メッセージ
 */
function listPraise(){
    return praiseWords.map(w => w.index + " : " + w.msg);            
}
/**
 * ランダムにメッセージを返す
 * @returns {string} メッセージ
 */
function praise(){
    if(praiseWords.length > 0){
        //ランダムな添字の取得
        const randomIndex = Math.floor(Math.random() * praiseWords.length);
        return praiseWords[randomIndex].msg;
    }else{
        return "ほめてもらいたい言葉が見つかりませんでした";
    }
}
module.exports = {
    praise,
    add:addPraise, 
    del:delPraise, 
    list:listPraise
}