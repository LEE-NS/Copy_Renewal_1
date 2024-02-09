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

let gnbWrap = document.querySelector('.gnb_wrap');
let gnbScrollWrap = document.querySelector('.gnb_scroll_wrap');
let gnbExit = document.querySelector('.gnb_exit');
let gnbBtn = document.querySelector('.gnb_btn');

let d0Titles = document.querySelectorAll('.menu_d0_title');
let d1Titles = document.querySelectorAll('.menu_d1_title');
let d2Titles = document.querySelectorAll('.menu_d2_title');


gnbExit.addEventListener('click', () => {
    gnbWrap.classList.remove('gnb_open_bg');
    gnbScrollWrap.classList.remove('gnb_open');
    document.body.style.overflow = 'auto';
});
// 메뉴 창 닫기
gnbWrap.addEventListener('click', (e) => {
    let gnbWrapWidth = parseInt(window.getComputedStyle(gnbWrap).width);
    if(e.pageX > (gnbWrapWidth * 0.7)) {
        gnbWrap.classList.remove('gnb_open_bg');
        gnbScrollWrap.classList.remove('gnb_open');
        document.body.style.overflow = 'auto';
    }
});
// 메뉴 창 닫기 (메뉴 외부를 클릭할 경우에도)
gnbBtn.addEventListener('click', () => {
    gnbWrap.classList.add('gnb_open_bg');
    gnbScrollWrap.classList.add('gnb_open');
    document.body.style.overflow = 'hidden';
});
// 메뉴 창 열기
// + Modal 열려있을 시 메인 페이지 스크롤 방지

function gnbClassRemoveD0(titles, lists, titleSymbols) {
    titles.forEach((elem) => {
        elem.classList.remove('active')
    });
    lists.forEach((elem) => {
        elem.classList.remove('open_d0')
    });
    titleSymbols.forEach((elem) => {
        elem.classList.remove('open_symbol')
    });
};
// GNB에서 상호작용시 부여된 클래스 초기화(d0용)

function gnbClassRemove(titles, lists, titleSymbols) {
    titles.forEach((elem) => {
        elem.classList.remove('active')
    });
    lists.forEach((elem) => {
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

d0Titles.forEach((d0Title) => {
    d0Title.addEventListener('click', () => accrdCtrlD0(d0Title, d0Titles, '.menu_d1'));
});

d1Titles.forEach((d1Title) => {
    d1Title.addEventListener('click', () => accrdCtrl(d1Title, d1Titles, '.menu_d2', '.menu_d1_title .act'));
});

d2Titles.forEach((d2Title) => {
    d2Title.addEventListener('click', () => accrdCtrl(d2Title, d2Titles, '.menu_d3', '.menu_d2_title .act'));
});

// 아코디언 메뉴




/* 메인 슬라이드 */
let slideFrame = document.querySelector('.slide_all');
let slides = document.querySelectorAll('.slide');

let slideFrameWidth = slideFrame.clientWidth;
let slideWidth = slides[0].clientWidth; 
let currSlide = 0;

let nextBtn = document.querySelector('.next_btn');
let prevBtn = document.querySelector('.prev_btn');

let pagination = document.querySelector('.slide_indic > ul');



function loopSlideMaker(slideParam) {
    let beforeE = document.createElement('div');
    let afterE = document.createElement('div');
    let startSlide = slideParam[0];
    let endSlide = slideParam[slideParam.length - 1];

    startSlide.classList.forEach((c) => {afterE.classList.add(c)});
    afterE.innerHTML = startSlide.innerHTML;
    endSlide.classList.forEach((c) => {beforeE.classList.add(c)});
    beforeE.innerHTML = endSlide.innerHTML;

    slideParam[slideParam.length - 1].after(afterE);
    slideParam[0].before(beforeE);    
};
//루프용 더미 노드 생성 함수

loopSlideMaker(slides);
//루프용 더미 노드 생성

slideFrame.style.width = `${(slides.length + 2 ) * 100}%`;
slideFrame.style.left = `-100%`
//슬라이드 전체 너비의 비율을 지정(슬라이드 개수에 따른 것이므로 바뀔 필요 x), 복사된 슬라이드가 먼저 보이면 안되기에 left로 -100% 이동(비율로 값을 줬기에 오류 걱정 x) 

function nextSlide() {
    let slideFrameLeft = parseInt(slideFrame.style.left);

    currSlide++;

    if(currSlide == slides.length) {
        slideFrame.style.left = `${slideFrameLeft - 100}%`;
        setTimeout(() => {
            slideFrame.classList.add('slide_animate');
            slideFrame.style.left = '-100%';
        }, 200);
        currSlide = 0;        
    } else {
        slideFrame.style.left = `${slideFrameLeft - 100}%`;
    }

    slideFrame.classList.remove('slide_animate')
    currIndic();
}; 
//다음 슬라이드로 이동

function prevSlide() {
    let slideFrameLeft = parseInt(slideFrame.style.left);

    currSlide--;

    if(currSlide < 0) {
        slideFrame.style.left = `${slideFrameLeft + 100}%`;
        setTimeout(() => {
            slideFrame.classList.add('slide_animate');
            slideFrame.style.left = `-${slides.length * 100}%`;
        }, 200);
        currSlide = slides.length - 1;    
    } else {
        slideFrame.style.left = `${slideFrameLeft + 100}%`;
    };

    slideFrame.classList.remove('slide_animate');
    currIndic();
};
//이전 슬라이드로 이동

for (let i = 0; i < slides.length; i++) {
    if (i == 0) {
        pagination.innerHTML += `<li class="indic_on"></li>`;
    } else {
        pagination.innerHTML += '<li></li>';
    };
};
//페이지네이션 생성

let indics = pagination.querySelectorAll('li');

currIndic(); //인디케이터 시작 위치로 가져오기

function currIndic() {
    indics.forEach((elem) => {elem.classList.remove('indic_on')});
    indics[currSlide].classList.add('indic_on')
};
//현재 슬라이드의 순번에 따라 인디케이터 스타일 변화

indics.forEach((elem, i) => {
    elem.addEventListener('click', () => {
        currSlide = i;
        slideFrame.style.left = `-${(currSlide + 1) * 100}%`;
        currIndic();
    });
});
// 인디케이터 클릭 시 해당 index의 슬라이드로 이동

if(slides.length > 1) {
    window.addEventListener('load', () => {
        let autoLoopSlide = setInterval(nextSlide, 5000);
        slideFrame.addEventListener('mouseover', function() {
            clearInterval(autoLoopSlide);
            console.log('슬라이드 멈춤');
        });
        slideFrame.addEventListener('mouseout', function() {
            autoLoopSlide = setInterval(nextSlide, 5000)
            console.log('슬라이드 다시 시작');
        });
    });
};
//5초 마다 다음 슬라이드로 이동, 마우스 오버 시에 멈춤, 마우스 아웃 시에 재시작

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
// 클릭 시 다음, 이전 슬라이드 이동

if(slides.length <= 1) {
    nextBtn.removeEventListener('click', nextSlide);
    prevBtn.removeEventListener('click', prevSlide);
};
// 슬라이드가 1개 이하이면 버튼을 통해 슬라이드 이동을 할 수 없게 한다

let startPoint = 0;
let endPoint = 0;
// 드래그, 스와이프용 시작과 종료 지점 변수

if(slides.length > 1) {
    slideFrame.addEventListener('mousedown', (e) => {
        startPoint = e.pageX;
    });
    slideFrame.addEventListener('mouseup', (e) => {
        endPoint = e.pageX;
        if(startPoint < endPoint) {
            prevSlide();
        } else if(startPoint > endPoint) {
            nextSlide()
        }
    });
    // 드래그 동작 (pc용)
    
    slideFrame.addEventListener('touchstart', (e) => {
        startPoint = e.touches[0].pageX;
        console.log(startPoint);
    });
    slideFrame.addEventListener('touchend', (e) => {
        endPoint = e.changedTouches[0].pageX;
        console.log(endPoint);
        if(startPoint < endPoint) {
            prevSlide();
        } else if(startPoint > endPoint) {
            nextSlide()
        }
    });
    // 스와이프 동작 (모바일용)
};
// 슬라이드(대형) end



let donateDate = document.querySelector('.date');
let today = new Date();

donateDate.innerHTML = "";

let todayYear = today.getFullYear();
let todayMonth = (today.getMonth() + 1).toString().padStart(2, '0');
let todayDay = today.getDate().toString().padStart(2, '0');

donateDate.innerHTML = `${todayYear}. ${todayMonth}. ${todayDay} 기준`;
//현재 날짜 표시



let slideFrame2 = document.querySelector('.slide_all_2');
let slide2 = document.querySelectorAll('.slide_2');
//슬라이드 전체, 개별 슬라이드 전체

let slideFrame2Width = slideFrame2.clientWidth;
let slide2Width = slide2[0].clientWidth;
let currSlide2 = 0;
//슬라이드 전체 너비, 개별 슬라이드 너비 

loopSlideMaker(slide2);
//루프용 더미 노드 생성

slideFrame2.style.width = '';
slideFrame2.style.width = `${(slide2.length + 2) * 100}%`; //전체 슬라이드 너비는 루프 슬라이드용 슬라이드까지 합친 너비여야 한다.
slideFrame2.style.left = '';
slideFrame2.style.left = '-100%'; //첫 번째 슬라이드를 시작위치로

let nextBtn2 = document.querySelector('.next_btn_2');
let prevBtn2 = document.querySelector('.prev_btn_2');

nextBtn2.addEventListener('click', nextSlide2);
prevBtn2.addEventListener('click', prevSlide2);

function nextSlide2() {
    currSlide2++;
    slideFrame2.style.transition = 'left 0.2s';
    slideFrame2.style.left = `-${(currSlide2 + 1)*100}%`;
    if(currSlide2 === slide2.length) {
        currSlide2 = 0;
        setTimeout(() => {
            slideFrame2.style.transition = 'none';
            slideFrame2.style.left = '-100%';
        }, 200);       
    };
};

function prevSlide2() {
    currSlide2--;
    slideFrame2.style.transition = 'left 0.2s';
    slideFrame2.style.left = `${(currSlide2 + 1)*100}%`;
    if(currSlide2 < 0) {
        currSlide2 = slide2.length - 1;
        setTimeout(() => {
            slideFrame2.style.transition = 'none';
            slideFrame2.style.left = `-${slide2.length * 100}%`;
        }, 200);
    };
};

if(slide2.length <= 1) {
    nextBtn2.removeEventListener('click', nextSlide2);
    prevBtn2.removeEventListener('click', prevSlide2);
};
// 슬라이드가 1개인 경우 다음, 이전 슬라이드로 이동할 수 없게 한다.

let pagination2 = document.querySelector('.slide_indic_2 > ul');
for (let i = 0; i < slide2.length; i++) {
    if(i == 0) {
        pagination2.innerHTML += `<li class="indic_2_on"></li>`;
    } else {
        pagination2.innerHTML += `<li></li>`;
    }  
};

let indic2 = pagination2.querySelectorAll('li');
function currIndic2() {
    indic2.forEach((elem) => {elem.classList.remove('indic_2_on')});
    indic2[currSlide2].classList.add('indic_2_on');
}

indic2.forEach((elem, i) => {
    elem.addEventListener('click', () => {
        currSlide2 = i;
        slideFrame2.style.left = `-${(currSlide2 + 1) * 100}%`;
        currIndic2();
    });
});
// 인디케이터 만들어 넣기, currindic2()에 따라 스타일이 바뀌어야 한다.

if(slide2.length > 1) {
    window.addEventListener('load', () => {
        let autoLoopSlide = setInterval(nextSlide2, 5000);
        slideFrame2.addEventListener('mouseover', function() {
            clearInterval(autoLoopSlide);
            console.log('슬라이드 멈춤');
        });
        slideFrame2.addEventListener('mouseout', function() {
            autoLoopSlide = setInterval(nextSlide2, 5000)
            console.log('슬라이드 다시 시작');
        });
    });
};
//5초 마다 다음 슬라이드로 이동, 마우스 오버 시에 멈춤, 마우스 아웃 시에 재시작

let startPoint2 = 0;
let endPoint2 = 0;
// 드래그, 스와이프용 시작과 종료 지점 변수

if(slide2.length > 1) {
    slideFrame2.addEventListener('mousedown', (e) => {
        startPoint2 = e.pageX;
    });
    slideFrame2.addEventListener('mouseup', (e) => {
        endPoint2 = e.pageX;
        if(startPoint2 < endPoint2) {
            prevSlide2();
        } else if(startPoint2 > endPoint2) {
            nextSlide2()
        }
    });
    // 드래그 동작 (pc용)
    
    slideFrame2.addEventListener('touchstart', (e) => {
        startPoint2 = e.touches[0].pageX;
        console.log(startPoint2);
    });
    slideFrame2.addEventListener('touchend', (e) => {
        endPoint2 = e.changedTouches[0].pageX;
        console.log(endPoint2);
        if(startPoint2 < endPoint2) {
            prevSlide2();
        } else if(startPoint2 > endPoint2) {
            nextSlide2()
        }
    });
    // 스와이프 동작 (모바일용)
};
//슬라이드(소형) end





//노드의 속성을 가져올 때 주의할 점 : 예를 들어 어떤 노드의 width 값을 가져온다고 했을 때, element.style.width는 작성된 시점의 고정된 값을 가져오지만, element.style.width를 값으로 할당한 변수 elementWidth는 상황에 따라 변화된 element.style.width의 값이 할당된다.
//slideFrame.style.width는 값이 string으로 반환됨( ex)'100px' ). slideFrameWidth는 값을 숫자로만 반환한다( clientWidth의 특성, ex)100 ). 주의할 것.

// class 나 id 지정할 때 #이랑 .이 붙었는지 잘 확인하자