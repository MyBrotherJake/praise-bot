'use strict';
// Description
//  「ほめて」というとほめてくれるbot
// Commands:
//   ほめて                        - 登録された言葉をランダムに発言する
//   もっと メッセージ内容           - ほめて欲しい言葉を登録する
//   ほめないで index番号           - 指定された番号の言葉を削除する
//   見せて                        - 登録されている言葉を一覧表示
const praise = require('praise-bot');

module.exports = robot =>{
    robot.hear(/ほめて/i, msg =>{
        const words = praise.praise();
        msg.send(words);
    });
    robot.hear(/もっと (.+)/i, msg =>{
        const words = msg.match[1].trim();
        praise.add(words);
        msg.send("登録しました。もっとほめますね♪");
    });
    robot.hear(/ほめないで (.+)/i, msg =>{
        const index = msg.match[1].trim();
        praise.del(parseInt(index));
        msg.send("削除しました。他の言葉でほめますね。");
    });
    robot.hear(/見せて/i, msg =>{
        const words = praise.list().join('\n');
        if(words.length === 0){
            msg.send("登録されているメッセージがありません。")
        }else{
            msg.send(words);
        }
    });
}