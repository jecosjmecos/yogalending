window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    let info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent'),
        tab = document.querySelectorAll('.info-header-tab');

    //Скрываем лишние элементы контента
    let hideTabContent = (a) => {
        for(let i = a; i < tabContent.length; i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    //Показываем определенную часть контента
    let showTabContent = (b) => {
        if(tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }


    //Событие по клику на таб
    info.addEventListener('click', (event) => {
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

    let deadline = tomorrow;

    let getTimeRemaining = (endtime) => {
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

    let setClock = (id, endtime) => {
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


    //Модальное окно

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descriptionBtn = document.querySelectorAll('.description-btn')

    function callModal(e){
        e.addEventListener('click', function(){
            overlay.style.display = "block";
            this.classList.add('more-splash');
            document.body.style.overflow = "hidden";
        });
    }

    callModal(more);

    for(let i = 0; i < descriptionBtn.length; i++){
        callModal(descriptionBtn[i]);
    }

    close.addEventListener('click', function(){
        overlay.style.display = "none";
        more.classList.remove('more-splash');
        document.body.style.overflow = "";
    });

    //Формы обратной связи

    // 1) Создаем объект в котором будут состоять различные состояния нашего запроса
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо. Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    // 2) Получаем элементы со страницы с которыми мы будем работать
    // Модальное окно
    let formModal = document.querySelector('.main-form'),
        inputModal = formModal.getElementsByTagName('input');

    // 3)Создаем элемент на странице, который будет информировать о статусе отправки 
    let statusMessage = document.createElement('div');
    statusMessage.classList.add('status');

    // 4) Вешаем события submit на форму
    // Модальное окно
    formModal.addEventListener('submit', (event)=>{
        event.preventDefault(); // Отменяем стандарное поведение формы
        formModal.appendChild(statusMessage); // Создаем в форме элемент для отображения статус сообщения

        let request = new XMLHttpRequest(); //Создаем новый объект XMLHttpRequest

        //Настраиваем запрос
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        let formData = new FormData(formModal); // Создаем новый объект FomData
        request.send(formData); //отправляем запрос на сервер
        console.log(formData);
        //создаем событие которое будет наблюдать за состоянием нашего запроса
        //добавляем сообщения о статусе
        request.addEventListener('readystatechange', ()=>{
            if(request.readyState < 4){
                statusMessage.textContent = message.loading;
            } else if(request.readyState == 4 && request.status == 200){
                statusMessage.textContent = message.success;
            } else {
                statusMessage.textContent = message.failure;
            }
        });
        
        //Очищаем поля после отправки
        for(let i = 0; i < inputModal.length; i++){
            inputModal[i].value = '';
        }
    });

    // Форма в футере
    let formFooter = document.querySelector('#form'),
        inputFooter = formFooter.getElementsByTagName('input');

    // Форма в футере
    formFooter.addEventListener('submit', (event)=>{
        event.preventDefault(); // Отменяем стандарное поведение формы
        formFooter.appendChild(statusMessage); // Создаем в форме элемент для отображения статус сообщения

        let request = new XMLHttpRequest(); //Создаем новый объект XMLHttpRequest

        //Настраиваем запрос
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(formFooter);
        
        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);
        
        //создаем событие которое будет наблюдать за состоянием нашего запроса
        //добавляем сообщения о статусе
        request.addEventListener('readystatechange', ()=>{
            if(request.readyState < 4){
                statusMessage.textContent = message.loading;
            } else if(request.readyState == 4 && request.status == 200){
                statusMessage.textContent = message.success;
            } else {
                statusMessage.textContent = message.failure;
            }
        });
        
        //Очищаем поля после отправки
        for(let i = 0; i < inputFooter.length; i++){
            inputFooter[i].value = '';
        }
    });


    //Слайдер

    let slideIndex = 1,
        slides = document.querySelectorAll(".slider-item"),
        prev = document.querySelector(".prev"),
        next = document.querySelector(".next"),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);
    function showSlides(n){
        if(slideIndex > slides.length){
            slideIndex = 1;
        }

        if(n < 1){
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');

        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add('dot-active');
    }


    function plusSlides(n){
        showSlides(slideIndex += n);
    }

    function currentSlide(n){
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function(){
        plusSlides(-1);
    });

    next.addEventListener('click', function(){
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event){
        for(let i = 0; i < dots.length + 1; i++){
            if(event.target.classList.contains('dot') && event.target == dots[i-1]){
                currentSlide(i);
            }
        }
    });


    //calc
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = 0;

        persons.addEventListener('change', function(){
            personsSum = +this.value;
            total = (daysSum + personsSum)*4000;

            if(restDays.value == false){
                totalValue.innerHTML = 0;
            }else{
                totalValue.innerHTML = total;
            }
        });

        restDays.addEventListener('change', function(){
            daysSum = +this.value;
            total = (daysSum + personsSum)*4000;

            if(persons.value == false){
                totalValue.innerHTML = 0;
            }else{
                totalValue.innerHTML = total;
            }
        });

        place.addEventListener('change', function(){
            if(restDays.value == '' || persons.value == ''){
                totalValue.innerHTML = 0;
            } else {
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
        });
});