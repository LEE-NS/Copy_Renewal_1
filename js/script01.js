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
 */

let gnbWindow = document.querySelector('.gnb_wrap');
let gnbList = document.querySelector('.gnb');
let gnbExit = document.querySelector('.gnb_exit');
let gnbBtn = document.querySelector('.gnb_btn');
let menuD0 = [...document.querySelectorAll('.gnb_menu_d0')];
let menuD1 = [...document.querySelectorAll('.gnb_menu_d1')];
let menuD2 = [...document.querySelectorAll('.gnb_menu_d2')];
let menuD3 = [...document.querySelectorAll('.gnb_menu_d3')];

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

function openAccrd(bottoms) {
    bottoms.forEach(elem => {
        let bottom = elem;
    });
    for (let i = 0; i < bottoms; i++) {
        bottoms[i].classList.remove('active_menu')
    };
    bottom.classList.add('active_menu');
};
//아코디언 형태 메뉴


gnbExit.addEventListener('click', ctrlGnbWindow);
gnbBtn.addEventListener('click', ctrlGnbWindow);
//해당 태그를 클릭할 시 GNB를 열고 닫기

menuD0.addEventListener('click', () => (openAccrd(menuD1)));
menuD1.addEventListener('click', () => (openAccrd(menuD2)));
menuD2.addEventListener('click', () => (openAccrd(menuD3)));
//해당 태그를 클릭 시 아코디언 형태 메뉴를 열고 닫기
