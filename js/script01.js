/* 
header

- gnb에서 X표시 누르면 gnb 창이 닫힘
    빠른 전환 효과 (0.3s 미만)
    전환 효과는 '단순 사라짐 효과'

- 햄버거 표시를 누르면 gnb 창이 열림 
    빠른 전환 효과 (0.3s 미만, 창이 닫히는 빠르기와 동일하게)
    열릴 때, gnb의 항목 이외에는 상호작용 할 수 없도록 한다. 스크롤도 X. (모바일 한정)
    열릴 때, gnb에 가려진 항목들은 어둡게 음영처리한다
 */
let gnbWindow = document.querySelector('.gnb_wrap');
let gnbExit = document.querySelector('.gnb_exit');
let gnbBtn = document.querySelector('.gnb_btn');


gnbExit.addEventListener('click', function() {
    gnbWindow.style.display = 'none';
}); //GNB창 닫기
gnbBtn.addEventListener('click', function() {
    gnbWindow.style.display = 'flex';
});