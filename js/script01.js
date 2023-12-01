/* 
header

- gnb에서 X표시 누르면 gnb 창이 닫힘
    yes 전환 효과는 '단순 사라짐 효과'

- 햄버거 표시를 누르면 gnb 창이 열림 
    열릴 때, gnb의 항목 이외에는 상호작용 할 수 없도록 한다. 스크롤도 X.
    yes 열릴 때, gnb에 가려진 항목들은 어둡게 음영처리한다

- 아코디언 메뉴
    각 탭을 클릭할 시 그 탭의 하위 항목들이 나타난다
    하위 항목들이 나타나면서 탭의 왼쪽 인디케이터가 빨간색으로 변하고 오른쪽의 메뉴 확장 여부를 나타내는 기호가 '-'로 변한다
    각 탭을 다시 클릭하면 그 탭의 하위 항목들이 사라진다
    하위 항목들이 사라지면서 탭의 왼쪽 인디케이터가 사라지고 오른쪽의 메뉴 확장 여부를 나타내는 기호가 '+'로 변한다
    (gnb_menu_d0)

 */

let gnbWindow = document.querySelector('.gnb_wrap');
let gnbList = document.querySelector('.gnb');
let gnbExit = document.querySelector('.gnb_exit');
let gnbBtn = document.querySelector('.gnb_btn');



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
//GNB 열기 및 닫기




gnbExit.addEventListener('click', ctrlGnbWindow);
gnbBtn.addEventListener('click', ctrlGnbWindow);
//해당 태그를 클릭할 시 GNB를 열고 닫기