import React from 'react';

function FVPage() {

    return (
        <div className="TxtContainer">
            <h1>Energia Fotovoltaica</h1>
            <p>
                Os sistemas de conversão fotovoltaica aproveitam da abundante energia fornecida à Terra pelo Sol para gerar energia elétrica.
                É uma das principais alternativas renováveis de geração pois se utiliza de uma fonte inesgotável dentro da escala humana de tempo.
                Sistemas fotovoltaicos são compostos por um bloco de geração, um bloco de condicionamento de potência e, opcionalmente, um bloco de armazenamento. 
                No entanto, ainda assim podem ocorrer, principalmente, de duas maneiras distintas: Off-Grid (Sistemas Isolados) x On-Grid (Sistemas Conectados à Rede).
            </p>
            <h2>Off-Grid</h2>
            <p>
                Os sistemas Off-Grid são sistemas FV isolados da rede elétrica convencional, e por isso, geralmente fazem 
                o uso de um bloco de armazenamento representado por um banco de baterias, para o armazenamento da carga em si, e um controlador, que efetua a administração da carga armazenada.
            </p>
            <p>Esse tipo de instalação é geralmente utilizada em locais remotos, sem a presença de uma rede de distribuição elétrica.</p>
            <img className="pagesImg" src={"/static/offgrid.jpg"}/>
            <br></br>
            <h2>Grid Tie</h2>
            <p>
                Sistemas que trabalham em conjunto com a rede de distribuição convencional. É a mais comum das modalidades dentro de centros urbanos, pois havendo a presença da rede tradicional, 
                geralmente não há a necessidade de um bloco de armazenamento, o que barateia o investimento e a injeção de um possível excedente à rede pode reduzir/eliminar os custos do investidor para com a distribuidora.
            </p>
            <img className="pagesImg" src={"/static/gridtie.jpg"}/>
        </div>
    )
}

export default FVPage;
