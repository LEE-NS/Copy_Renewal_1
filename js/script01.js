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

function accrdCtrl(pointingNode, targetNode) {
    let targets = document.querySelectorAll(targetNode);
    targets.forEach((target) => {
        target.classList.remove('active');
        if(pointingNode.nextElementSibling == target) {
            target.classList.add('active');
        } else {
            target.classList.remove('active');
        }
    });
    console.log(`${pointingNode}가 클릭되었다. 이것의 형제 노드는 ${pointingNode.nextElementSibling}`);
};
//형제 노드를 찾는 속성을 사용한다. 없다면 null을 반환하기 때문에 
//아코디언 형태 메뉴, gnb_menu_d0_item이 클릭이 되면 gnb_menu_d1이 열려야한다. 그리고 d1_item이 클릭되면 d2가 열려야한다.
//forEach 메소드 : forEach문에서 함수를 표현할 때, 매개변수는 그 배열의 요소를 가리킨다!!!!!!
//다른 항목 클릭 시 확장된 항목창 닫기, 열려있는 항목창의 항목을 눌러도 그 확장된 항목창 닫기 ok
// 문제점 : 클릭되는 영역 안에 확장되는 영역이 포함되어 있어서 하위 항목을 클릭하려 하면 상위 항목도 클릭을 한 것으로 취급됨
// -> 클릭되는 영역이 확장되는 영역을 포함하지 않게 분리시켜야 한다.
//  


gnbExit.addEventListener('click', ctrlGnbWindow);
gnbBtn.addEventListener('click', ctrlGnbWindow);
d0Titles.forEach((d0Title) => {d0Title.addEventListener('click', () => accrdCtrl(d0Title, '.menu_d1'))});
//해당 태그를 클릭할 시 GNB를 열고 닫기

