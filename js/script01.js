/* 
header

- gnb에서 X표시 누르면 gnb 창이 닫힘
    yes 전환 효과는 '단순 사라짐 효과'

- 햄버거 표시를 누르면 gnb 창이 열림 
    열릴 때, gnb의 항목 이외에는 상호작용 할 수 없도록 한다. 스크롤도 X.
    yes 열릴 때, gnb에 가려진 항목들은 어둡게 음영처리한다

- 아코디언 메뉴 : 
    핵심은 클릭 이벤트에 대한 처리로, 해당 섹션을 활성화하고 다른 섹션들을 비활성화하는 로직을 구현하는 것이 중요합니다.
    
    활성화된 아코디언 메뉴의 스타일이 저장된 HTML 클래스(.active)를 작성해둔다.
    어떤 항목을 클릭하면 .active가 그 항목에 적용된다
    어떤 항목이 클릭되어 활성화된 상태에서 다른 항목을 클릭하면 .active가 동일한 모든 항목에서 제거되고 마지막에 클릭한 항목에 .active가 적용된다.

    jquery에서는 어떤 로직을 사용했을까?

    * 항목의 크기 이상의 글자 수를 가지는 항목은 
        호버되었을 때, ellipsis되어있던 부분이 원래 항목의 컨텐츠 만큼 다시 보이게 되는데, 좌우로 움직이면서 항목을 보여주게끔 한다.
 */

let gnbWindow = document.querySelector('.gnb_wrap');
let gnbList = document.querySelector('.gnb');
let gnbExit = document.querySelector('.gnb_exit');
let gnbBtn = document.querySelector('.gnb_btn');
let d0Titles = document.querySelectorAll('.menu_d0_title');

function ctrlGnbWindow() {
    let dp = gnbWindow.style.display;

    if (dp == 'flex') {
        gnbWindow.style.backgroundColor = 'transparent';
        gnbList.style.backgroundColor = 'transparent';
        gnbWindow.style.display = 'none'
    } else {
        gnbWindow.style.backgroundColor = '#11111199';
        gnbList.style.backgroundColor = '#ffffff';
        gnbWindow.style.display = 'flex'
    };
}; 
//GNB 창 열기(이거보다 훨씬 깔끔하게 할 수 있을듯. 바꾸기)

function accrdCtrl(pointingNode, pointingNodes, targetNode) {
    let symbols = document.querySelectorAll('.act');
    let symbol = pointingNode.querySelector('.act');
    let targets = document.querySelectorAll(targetNode);
    let targetsArr = [...targets];

    if(pointingNode.nextElementSibling.classList.contains('active')) {
        targets.forEach((elem) => {
            elem.classList.remove('active')
        });
        pointingNodes.forEach((elem) => {
            elem.classList.remove('open')
        });
        symbols.forEach((elem) => {
            elem.classList.remove('open_symbol')
        });
        return
    };
    //이미 열려있는 상태에서 클릭을 한다면 닫는다

    targets.forEach((elem) => {
        elem.classList.remove('active')
    });
    pointingNodes.forEach((elem) => {
        elem.classList.remove('open')
    });
    symbols.forEach((elem) => {
        elem.classList.remove('open_symbol')
    });
    //위 조건에 해당되지 않으면 모든 클래스 삭제
    
    if(pointingNode.nextElementSibling && targetsArr.includes(pointingNode.nextElementSibling)) {
        pointingNode.nextElementSibling.classList.add('active');
        pointingNode.classList.add('open');
        symbol.classList.add('open_symbol');
    } else  {
        return
    };
    //클릭된 항목에게 알맞는 클래스 부여
};
// 아코디언 메뉴 : 항목 클릭 시 다른 항목 닫힘 + 열려있는 항목 클릭시 닫힘




gnbExit.addEventListener('click', ctrlGnbWindow);
gnbBtn.addEventListener('click', ctrlGnbWindow);
d0Titles.forEach((d0Title) => {
    d0Title.addEventListener('click', () => accrdCtrl(d0Title, d0Titles, '.menu_d1'));
});
