'use strict';

const url =
  'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo';
const pnl_est = document.querySelector('#div_est');
const pnl_pesq = document.querySelector('#div_resp');
const input = document.querySelector('#input_pesq');
const button = document.querySelector('#botao');

let date_json = [];

async function start() {
  render();
  await consumeAPI();
}

async function consumeAPI() {
  const response = await fetch(url);
  const json = await response.json();

  date_json = json.results.map((result) => {
    return {
      name: `${result.name.first} ${result.name.last}`,
      sex: result.gender,
      age: result.dob.age,
      image: result.picture.thumbnail,
    };
  });
}

function fetchData() {
  render();
  let sum_age = 0;
  let qntd_usu = 0;
  let qntd_fem = 0;
  let qntd_masc = 0;
  let med_age = 0;
  const div2 = document.createElement('div');

  input.value === '' ? start() : writeData();

  function writeData() {
    date_json.forEach((element) => {
      if (element.name.toLowerCase().includes(input.value.toLowerCase())) {
        const div1 = document.createElement('div');

        /* Verifica o sexo e incrementa a variavel */
        element.sex === 'female'
          ? (qntd_fem += 1)
          : element.sex === 'male'
          ? (qntd_masc += 1)
          : console.log('nao encontrou');
        /* Acrescenta a idade para somar o total */
        sum_age += element.age;
        /* Realiza o somatório da quantidade de Usuários encontrados */
        qntd_usu += 1;

        div1.innerHTML = `<img src=${element.image}>
                        <span>${element.name}, ${element.age}</span>`;
        div1.className = 'div_de_pesquisa';

        pnl_pesq.appendChild(div1);

        document.querySelector(
          '#h1_pesq'
        ).textContent = `${qntd_usu} Usuário(s) Encontrado(s)`;
      }
    });
    if (sum_age > 0) {
      med_age = (sum_age / qntd_usu).toFixed(2);
      div2.innerHTML = `<span>Sexo Masculino: ${qntd_masc}</span><br>
                    <span>Sexo Feminino: ${qntd_fem}</span><br>
                    <span>Soma das Idades: ${sum_age}</span><br>
                    <sanp>Média das Idades: ${med_age}</span>`;
      pnl_est.appendChild(div2);
    } else start();
  }
}

function render() {
  pnl_pesq.innerHTML = '';
  pnl_est.innerHTML = '';
  const h1_pesq = document.createElement('h1');
  const h1_est = document.createElement('h1');
  h1_pesq.textContent = 'Nenhum Usuário Filtrado';
  h1_est.textContent = 'Estatísticas';

  pnl_pesq.appendChild(h1_pesq);
  pnl_est.appendChild(h1_est);
  h1_pesq.id = 'h1_pesq';
  h1_est.id = 'h1_est';

  input.removeAttribute('disabled');
  button.addEventListener('click', fetchData);
  input.addEventListener('keyup', fetchData);
}

start();
