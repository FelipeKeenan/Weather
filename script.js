document.querySelector('.busca').addEventListener('submit', weather)
let body = document.querySelector('body');
// Adiciona a classe 'animate' para iniciar a animação
document.addEventListener('DOMContentLoaded', function () {
    var fadeInText = document.querySelector('.fade-in-text');
    fadeInText.classList.add('animate');
    boasVindas() //Chamada da função que da uma saudação dependendo do horário que usuário.
});

async function weather(event) { //Estou dizendo pra minha função que vou digitar um código assíncrono, ou seja, não ordenado.
    event.preventDefault() //Essa função deixa o comportamento padrão inutilizável.
    let input = document.querySelector('#searchInput').value //Peguei o valor que o usuário digitou e armazenei
    if (input !== '') {
        clearInfos()
        showWarning('Carregando...');
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=da502ad132ee0e8e0c855f8d32f3a416&units=metric&lang=pt_br` //URL que faz a integração com o OpenWeather, só que no lugar de "Name City", coloco o valor do input digitado pelo usuário.
        // "&lang=pt_br" deixa em português do Brasil, assim como o "&units=metric" deixa a temperatura em Celsius.

        let results = await fetch(url) //Await faz a requisição e espera o resultado.
        let json = await results.json() //A variável json vai armazenar  o resultado em JSON já pronto; o JSON é um objeto que contém as informações.


        if (json.cod === 200) {   //Estou verificando, caso o código for 200 (cidade válida), ele vai conseguir fazer a requisição. O "cod" foi pego lá no "PREVIEW" do JSON.
            showInfo({ //Acessando cada informação que apareceu no preview. Atentar-se aos arrays como informações na hora de acessá-las.
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                weatherIcon: json.weather[0].icon,
                windSpeed: json.wind.speed * 1.6,
                windAngle: json.wind.deg,
                descriptionWeather: json.weather[0].description,
                sensation: json.main.feels_like,
                tempMax: json.main.temp_max


               

            })
            changeBg(json.weather[0].description);
        } else {
            clearInfos()
            showWarning('Localização inválida. Tente novamente.') //Passando a função com a mensagem de erro.
        }

    }
    else {
        alert('Favor digitar uma cidade no campo abaixo.')
        clearInfos();
    }
      // Removendo o conteúdo da função boasVindas após o submit:
      let saudacoes = document.querySelector('#saudacoes');
      saudacoes.innerHTML = '';
  

    function showInfo(json) { //Função que vai mostrar o resultado
        showWarning('') // Tirando o "carregando".
        document.querySelector('.resultado').style.display = 'block'; //Tirando o display "block".

        //Colocando as informações em seus devidos lugares no HTML.
        document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
        document.querySelector('.tempInfo').innerHTML = `${json.temp.toFixed('1')} <sup>ºC</sup>`;
        document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed.toFixed(1)} <span>km/h</span></div>`;
        document.querySelector('.resultadoTempo').innerHTML = `${json.descriptionWeather.toUpperCase()}`;
        document.querySelector('.feelsLike').innerHTML = `Sensação térmica: <br> <br> ${json.sensation.toFixed('1')} ºC`
        document.querySelector('.max-temp').innerHTML = `<p style="font-size: 20px">Temperatura máxima</p> <br><p style="font-size=20px">${json.tempMax.toFixed('1')} ºC</p>`
        


        //Colocando o ícone de cada clima
        document.querySelector('.temp img').setAttribute('src', `https://openweathermap.org/img/wn/${json.weatherIcon}@2x.png`)

        //Rotacionado a direção do vento
        document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;
    }

    function clearInfos() {
        showWarning('');
        document.querySelector('.resultado').style.display = 'none';
    }

    function changeBg(description) {    //Função que mudará o background dependendo da descrição fornecida pela API.
        let formattedDescription = description.toLowerCase().trim(); //Convertendo a descrição fornecida pela API.
        document.getElementById("body").className = "";
        switch (formattedDescription) {
            case 'nublado':
                body.classList.add('nublado')
                break
            case 'céu limpo':
                body.classList.add('ceu-limpo')
                break
            case 'nuvens dispersas':
                body.classList.add('nuvens-dispersas')
                break
            case 'algumas nuvens':
                body.classList.add('algumas-nuvens')
                break
            case 'neblina':
                body.classList.add('neblina')
                break
            case 'chuva moderada':
                body.classList.add('chuva-moderada');
                break
            case 'chuva forte':
                body.classList.add('temporal')
        }
    }
    function showWarning(msg) {
        document.querySelector('.aviso').innerHTML = msg; //Criei uma função que vai aparecer a mensagem de aviso tanto quando o input for preenchido quanto não for.
    }

}
function boasVindas() {
    let saudacoes = document.querySelector('#saudacoes');
    saudacoes.classList.add('fade-in-text')
    let data = new Date();
    let hora = data.getHours();
    if (hora > 0 && hora < 12) {
        saudacoes.innerHTML = `Muito bom dia! Que tal saber como vai o clima atual em qualquer cidade do mundo?`
    } else if (hora > 12 && hora <= 18) {
        saudacoes.innerHTML = `Muito boa tarde! Que tal saber como vai o clima atual em qualquer cidade do mundo?`
    } else {
        saudacoes.innerHTML = `Muito boa noite! Que tal saber como vai o clima atual em qualquer cidade do mundo?`
    }
}
