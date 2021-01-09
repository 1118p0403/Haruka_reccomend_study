'use strict';
const pNameInput = document.getElementById('pName');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        // 子どもの要素がある限り削除
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = () => {
    const pName = pNameInput.value;
    if (pName.length === 0) {
        // 名前が空の時は処理を終了する
        return;
    }
    console.log(pName);
    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerHTML = '診断結果';
    resultDivided.appendChild(header);
    
    const paragraph = document.createElement('p');
    const result = assessment(pName);
    paragraph.innerHTML = result;
    resultDivided.appendChild(paragraph);
    
    // TODO ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 
    'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたにおすすめの天海春香さん') + 
    '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerHTML = 'Tweet #あなたにおすすめの天海春香さん';

    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

pNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
};

// 診断結果用の多次元配列の作成
let imasAllProducts = [ 
['アイドルマスター(360版)', 'Xbox360', 2006, 16],
['アイドルマスター Live For You!', 'Xbox360', 2007, 16],
['アイドルマスター XENOGLOSSIA', 'TVアニメ', 2006, 16],
['アイドルマスターSP', 'PSP', 2009, 16],
['アイドルマスター2', 'Xbox360/,PS3', 2010, 17],
['アイドルマスター グラビアフォーユー！', 'PS3', 2011, 17],
['アイドルマスター シンデレラガールズ', 'mobage', 2011, 17],
['アイドルマスター シャイニーフェスタ', 'PSP', 2012, 17],
['アイドルマスター ミリオンライブ！', 'GREE', 2013, 17],
['アイドルマスター ワンフォーオール', 'PS3', 2014, 17],
['アイドルマスター マストソングス', 'PSVita', 2015, 17],
['アイドルマスター プラチナスターズ', 'PS4', 2016, 17],
['アイドルマスター ミリオンライブ！ シアターデイズ', 'iOS/Android', 2017, 17],
['アイドルマスター ステラステージ', 'PS4', 2017, 17],
['アイドルマスター スターリットシーズン', 'PS4/Steam', 2021, 17],
['アイドルマスター ポップンリンクス', 'iOS/Android', 2021, 17]
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} pName ユーザーの名前
 * @return {string} 診断結果
 */
let assessment = (pName) => {// 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < pName.length; i++) {
        sumOfCharCode = sumOfCharCode + pName.charCodeAt(i);
    }
    const index = sumOfCharCode % imasAllProducts.length;
    const result = (
        `${pName}におすすめの天海春香さんは${imasAllProducts[index][0]}です。媒体は${imasAllProducts[index][1]}、${imasAllProducts[index][2]}年の作品で、春香さんの年齢は${imasAllProducts[index][3]}歳です。`
    );
    
    // result = result.replace(/\{pName\}/g, pName);
    // 本来(の教材コード)ならここで正規表現の置換をする
    // 今回は使わないのでコメントアウト
    return result
}

// 動作テスト
console.assert(
    assessment('咲希') === 
        '咲希におすすめの天海春香さんはアイドルマスター スターリットシーズンです。媒体はPS4/Steam、2021年の作品で、春香さんの年齢は17歳です。', 
        'できてないです'
);
console.assert(
    assessment('サキ') === 
        'サキにおすすめの天海春香さんはアイドルマスター XENOGLOSSIAです。媒体はTVアニメ、2006年の作品で、春香さんの年齢は16歳です。', 
        'できてないです'
);
console.assert(
    assessment('咲希') === assessment('咲希'), 'できてない'
);
