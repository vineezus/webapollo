import React from 'react';
import { Link } from 'react-router-dom';

function HowPage() {
    return (
        <div className="TxtContainer">
            <h1>Como funciona?</h1>
            <p>O cálculo do dimensionamento feito em Apollo é feito a partir de três informações bem simples:</p>
            <ol type="I">
                <h2><li>Off-Grid ou Grid Tie?</li></h2>
                <p>A primeira é se o sistema o qual se deseja dimensionar é isolado (Off-Grid) ou conectado à rede elétrica (Grid-Tie). Você pode encontrar as diferenças e ver qual o seu caso na seção <Link to="/fv">Energia Fotovoltaica</Link>.</p>
                <p>Dentro da área de dimensionamento essa informação é passada através do seletor acima do formulário.</p>
                <img className="pagesImg" src={"/static/seletor.png"}/>
                <h2><li>Localidade</li></h2>
                <p>
                    Em seguida, é preciso inserir o nome da sua cidade e selecioná-la quando aparecer dentre as sugestões. Essa informação é importante para o dimensionamento pois a partir dela obtemos dados de irradiação, 
                    que rege todo o processo de geração fotovoltaica. Além disso, também conhecemos o valor tarifário para seu estado e podemos calcular o valor de retorno financeiro (Payback).
                </p>
                <h2><li>Consumo de Energia</li></h2>
                <p>O consumo que se quer atender com o sistema FV. A info de consumo a ser passada difere de acordo com a modalidade do sistema:</p>
                <p>Off-Grid: O NGD (Necessidade de Geração Diária) é o parâmetro necessário para o dimensionamento. Ele é obtido através de um pequeno cálculo, ilustrado abaixo.</p>
                <img className="pagesImg" id="ngd" src={"/static/ngd.svg"}/>
                <p>Grid Tie: Já para os sistemas conectados, se deseja a média de consumo mensal. É uma informação bastante acessível já que pode ser encontrada nas contas de energia, bastando apenas tirar a média entre os valores encontrados geralmente na seção ‘Histórico de Consumo’.</p>
                <img className="pagesImg" src={"/static/fatura.jpg"}/>
            </ol>
            <p>E assim, a partir destas informações, Apollo apresenta um dimensionamento onde constam:</p>
            <ul>
                <li>Custo  Estimado do Sistema;</li>
                <li>Quantidade e especificações das componentes;</li>
                <li>Peso (Baterias e Módulos) e área necessária;</li>
                <li>Payback Estimado (Tempo de Retorno do Investimento);</li>
                <li>e Evitação de CO2.</li>
            </ul>
        </div>
    )
}

export default HowPage;
