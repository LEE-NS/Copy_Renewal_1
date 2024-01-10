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
    '+' 기호는 해당 타이틀의 하위 항목이 열려있을 때만 open_symbol 클래스가 적용되도록 해야 한다.

    jquery에서는 어떤 로직을 사용했을까?

    * 항목의 크기 이상의 글자 수를 가지는 항목은 
        호버되었을 때, ellipsis되어있던 부분이 원래 항목의 컨텐츠 만큼 다시 보이게 되는데, 좌우로 움직이면서 항목을 보여주게끔 한다.

- 메인 슬라이드 :
    이미지 슬라이드와 인디케이터로 표현됨
    이미지 양 끝에 좌우로 넘어갈 수 있는 이동 버튼이 있고 모든 항목은 순환
    이미지와 인디케이터의 인덱스가 일치하도록 한다. 특정 인덱스의 인디케이터 클릭시 해당 인덱스의 슬라이드로 이동
    일정 시간마다 다음 슬라이드로 넘어가도록 한다.
            
 */

let gnbWindow = document.querySelector('.gnb_wrap');
let gnbList = document.querySelector('.gnb');
let gnbExit = document.querySelector('.gnb_exit');
let gnbBtn = document.querySelector('.gnb_btn');
let d0Titles = document.querySelectorAll('.menu_d0_title');
let d1Titles = document.querySelectorAll('.menu_d1_title');
let d2Titles = document.querySelectorAll('.menu_d2_title');


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

function gnbClassRemoveD0(titles, windows, titleSymbols) {
    titles.forEach((elem) => {
        elem.classList.remove('active')
    });
    windows.forEach((elem) => {
        elem.classList.remove('open_d0')
    });
    titleSymbols.forEach((elem) => {
        elem.classList.remove('open_symbol')
    });
};
// GNB에서 상호작용시 부여된 클래스 초기화(d0용)

function gnbClassRemove(titles, windows, titleSymbols) {
    titles.forEach((elem) => {
        elem.classList.remove('active')
    });
    windows.forEach((elem) => {
        elem.classList.remove('open')
    });
    titleSymbols.forEach((elem) => {
        elem.classList.remove('open_symbol')
    });
};
// GNB에서 상호작용시 부여된 클래스 초기화

function accrdCtrlD0(pointingNode, pointingNodes, targetNode) {
    let symbols = document.querySelectorAll('.menu_d0_title .act');
    let symbol = pointingNode.querySelector('.act');
    let targets = document.querySelectorAll(targetNode);
    let targetsArr = [...targets];

    if(pointingNode.nextElementSibling.classList.contains('active')) {
        gnbClassRemoveD0(targets, pointingNodes, symbols);
        return
    };
    //이미 열려있는 상태에서 클릭을 한다면 닫는다

    gnbClassRemoveD0(targets, pointingNodes, symbols);
    //위 조건에 해당되지 않으면 모든 클래스 삭제
    
    if(pointingNode.nextElementSibling && targetsArr.includes(pointingNode.nextElementSibling)) {
        pointingNode.nextElementSibling.classList.add('active');
        pointingNode.classList.add('open_d0');
        symbol.classList.add('open_symbol');
    } else  {
        return
    };
    //클릭된 항목에게 알맞는 클래스 부여
};
// 최상위 항목 아코디언 메뉴 : 항목 클릭 시 다른 항목 닫힘 + 열려있는 항목 클릭시 닫힘 + 최상위 타이틀 전용 효과

function accrdCtrl(pointingNode, pointingNodes, targetNode, actClassHere) {
    let symbols = document.querySelectorAll(actClassHere);
    let symbol = pointingNode.querySelector('.act');
    let targets = document.querySelectorAll(targetNode);
    let targetsArr = [...targets];

    if(pointingNode.nextElementSibling.classList.contains('active')) {
        gnbClassRemove(targets, pointingNodes, symbols);
        return
    };
    //이미 열려있는 상태에서 클릭을 한다면 닫는다

    gnbClassRemove(targets, pointingNodes, symbols);
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
// 아코디언 메뉴 

/* 
메인 슬라이드 만들기

슬라이드 전체 - mainSlideAll
증감카운터 - slideCount = 0

<함수>
nextSlide()
prevSlide()
repeatSlide() - 일정 시간마다 nextSlide()가 순환 반복되는 함수
makeIndic() - 슬라이드 개수에 따라 인디케이터의 개수를 증가시키는 함수

render() - 최초로 페이지가 로드될 때 슬라이드가 0번째 부터 로드되게 한다

*/
let mainSlideAll = document.querySelector('.main_slide_all'); //슬라이드 전체
let mainSlide = document.querySelectorAll('.main_slide'); //각 슬라이드
let slideWidth = mainSlide[0].clientWidth;

let pagination = document.querySelector('.slide_indic ul'); //슬라이드 페이지네이션
let nextBtn = document.querySelector('.next_btn button'); //다음 버튼
let prevBtn = document.querySelector('.prev_btn button'); //이전 버튼

let slideCount = 1;

mainSlideAll.style.left = 0;
mainSlideAll.style.transition = 'left 0.3s ease-in-out'; 

function nextMove() {
    //left값을 이용한다
    if(slideCount % mainSlide.length == 0) {
         
    } else {
        mainSlideAll.style.left = `${slideWidth*slideCount}px`
    };
    slideCount++;

    
}



for (let i = 0; i < mainSlide.length; i++) {
    if (i == 0) {
        pagination.innerHTML += `<li class="indic_on"></li>`;
    } else {
        pagination.innerHTML += `<li></li>`;
    }
}; //슬라이드 개수 만큼 인디케이터 개수 증가

gnbExit.addEventListener('click', ctrlGnbWindow);
gnbBtn.addEventListener('click', ctrlGnbWindow);

d0Titles.forEach((d0Title) => {
    d0Title.addEventListener('click', () => accrdCtrlD0(d0Title, d0Titles, '.menu_d1'));
});

d1Titles.forEach((d1Title) => {
    d1Title.addEventListener('click', () => accrdCtrl(d1Title, d1Titles, '.menu_d2', '.menu_d1_title .act'));
});

d2Titles.forEach((d2Title) => {
    d2Title.addEventListener('click', () => accrdCtrl(d2Title, d2Titles, '.menu_d3', '.menu_d2_title .act'));
});

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
// class 나 id 지정할 때 #이랑 .이 붙었는지 잘 확인하자