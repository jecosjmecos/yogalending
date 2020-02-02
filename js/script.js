window.addEventListener('DOMContentLoaded', function(){

    'use strict';

    let info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent'),
        tab = document.querySelectorAll('.info-header-tab');

    //Скрываем лишние элементы контента
    function hideTabContent(a){
        for(let i = a; i < tabContent.length; i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    //Показываем определенную часть контента
    function showTabContent(b){
        if(tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }


    //Событие по клику на таб
    info.addEventListener('click', function(event){
        let target = event.target;

        if(target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++){
                if(target == tab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                }
            }
        } 
    });

    // Таймер
    let today = new Date,
        tomorrow = new Date;
    
    tomorrow.setDate(today.getDate()+1);

    let deadline = '2020-02-03';

    function getTimeRemaining(endtime){
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000 * 60 * 60)));
        
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setClock(id, endtime){
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock(){
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if(hours.textContent.length == 1){
                hours.textContent = '0' + t.hours;
            }

            if(minutes.textContent.length == 1){
                minutes.textContent = '0' + t.minutes;
            }

            if(seconds.textContent.length == 1){
                seconds.textContent = '0' + t.seconds;
            }

            if(t.total <= 0){
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);
});