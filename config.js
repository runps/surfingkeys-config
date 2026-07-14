// ------ここからユーザー追記------

/* --------------------------------
 * ユーザー設定関数
-------------------------------- */

// 現在のページのタイトルとURLをマークダウン記法でヤンク
function yankTitleAndUrlAsMarkdown() {
    api.Front.showPopup('copy markdownLinkText:started');

    let title = document.title;
    let url = window.location.href;
    const markdownLinkText = '[' + title + '](' + url + ')';

    //Clipboard.write({type:'text', data:markdownLinkText});
    api.Clipboard.write(markdownLinkText);
    api.Front.showPopup('copy markdownLinkText:'+ markdownLinkText);
}
api.mapkey('ymm', 'URLとタイトルをマークダウン記法でコピー', yankTitleAndUrlAsMarkdown);

// ビジュアルモードで 'Y' を押したとき、選択を解除（終了）せずにヤンクする
api.vmapkey('Y', 'Yank選択テキストを維持したままコピー', () => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
        api.Clipboard.write(selectedText);
    }
    // <Esc> キーの入力をエミュレートして、Surfingkeysに選択を解除させる(動かない)
    const escEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        which: 27,
        bubbles: true,
        cancelable: true
    });
    window.dispatchEvent(escEvent);
});

settings.historyMUorder = true;
// タブの検索時にオムニバーを使用。最近使用した順に並べる
settings.tabsThreshold = 10;
settings.tabsMRUOrder = true;
settings.hintAlign = 'left'; //ヒントの表示位置を左に
settings.modeAfterYank = 'Normal';

// スクロールの速度を変更
settings.scrollStepSize = 300;

// 左右のタブを表示する
api.map('J','R');
api.map('K','E');

// スクロール要素の操作
api.map('sf',';fs');
api.map('ss','cS');

// オムニバーをOに集約
api.map('oo','t');
api.map('ot','T');
api.map('ob','b');



// タブ操作機能を T に集約
api.unmap('t');
api.mapkey('oT', 'Show tabs in current window', function() {
    console.log("User pushed 'oT'")
    api.Front.openOmnibar({type: "Tabs"});
});
api.map('tj', '>>'); // 現在のタブを右へ 
api.map('tk', '<<'); // 現在のタブを左へ
api.map('tl', ':feedkeys 99>>') // 現在のタブを99右へ
api.map('th', ':feedkeys 99<<') // 現在のタブを99左へ

api.map('tgw', ';gw') // 現在のウィンドウにすべてのタブを集める
api.map('tgt', ';gt') // 現在のウィンドウにタブを検索して集める

api.mapkey('gw', '#3View tabs in the current window', function(){
    console.log("User pushed 'gw'");
    front.openOmnibar({type: "Tabs"});
});


// タブの遷移履歴を移動
// 'b'と'B'で移動
api.map('b','B');
api.unmap('B');
api.map('B','F');


// 直前のタブを表示
api.map('L','<Ctrl-6>')


// タブ内履歴の移動
api.map('m','S');
api.map('M','D');



// ヒントのスタイルを調整
api.Hints.style('border: solid 2px #373B41; color:#000000; background: initial; background-color: #c4c4c4;');
api.Visual.style('marks', 'background-color: rgba(19, 255, 19, 0.85);');
api.Visual.style('cursor', 'background-color: rgb(238, 255, 0);');

// set theme
settings.theme = `
.sk_theme {
    font-family: Input Sans Condensed, Charcoal, sans-serif;
    font-size: 10pt;
    background: #24272e;
    color: #abb2bf;
}
.sk_theme tbody {
    color: #fff;
}
.sk_theme input {
    color: #d0d0d0;
}
.sk_theme .url {
    color: #61afef;
}
.sk_theme .annotation {
    color: #56b6c2;
}
.sk_theme .omnibar_highlight {
    color: #528bff;
}
.sk_theme .omnibar_timestamp {
    color: #e5c07b;
}
.sk_theme .omnibar_visitcount {
    color: #98c379;
}
.sk_theme #sk_omnibarSearchResult ul li:nth-child(odd) {
    background: #303030;
}
.sk_theme #sk_omnibarSearchResult ul li.focused {
    background: #3e4452;
}
#sk_status, #sk_find {
    font-size: 20pt;
}
#sk_tabs {
    position: fixed;
    top: 0;
    left: 0;
    background: #24272e;
    overflow: auto;
    z-index: 2147483000;
}
div.sk_tab {
    vertical-align: bottom;
    justify-items: center;
    border-radius: 3px;
    margin: 1px;
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#181818), color-stop(100%,#000000));
    box-shadow: 0px 3px 7px 0px rgba(245, 245, 0, 0);
    padding-top: 2px;
    border-top: solid 1px black;
}
div.sk_tab_title {
    display: inline-block;
    vertical-align: middle;
    font-size: 10pt;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-left: 5px;
    color: #a3aab6;
}
div.sk_tab_url {
    font-size: 10pt;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #333;
}
div.sk_tab_hint {
    display: inline-block;
    font-size: 10pt;
    font-weight: bold;
    padding: 0px 2px 0px 2px;
    margin: 6px;
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#3f3f3f), color-stop(100%,#1f1f1f));
    color: #70f5ff;
    border: solid 1px #2e2e2e;
    border-radius: 3px;
    box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.3);
}
div.sk_tab.current {
    background: #0055aa !important;
}
;
`
// click `Save` button to make above settings to take effect.</ctrl-i></ctrl-y>
