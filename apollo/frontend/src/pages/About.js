import React from 'react';

function About() {
    return (
        <div className="TxtContainer">
            <h1>Sobre</h1>
            <p>
                Desenvolvido pelo Engº Ambiental Vinicius Rocha, Apollo que surgiu inicialmente a partir de uma ideia para o seu 
                Trabalho de Conclusão de Curso passou por algumas reformulações até chegar na aplicação Web apresentada aqui.
            </p>
            <p>
                Agradecimentos aos profs. Drs. Glauber Tadaiesky e Otávio Chase 
                por seus valiosíssimos conselhos e orientações para este trabalho.
            </p>
            <p>Saiba mais em:</p>
            <ul>
                <li>
                    <a href="http://www.bdta.ufra.edu.br/jspui/handle/123456789/1420" target="_blank">
                        TCC Apollo: Programa computacional para dimensionamento de sistemas fotovoltaicos
                    </a>
                </li>
                <li>
                    <a href="https://github.com/vineezus/webapollo" target="_blank">
                        Repositório do Projeto
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default About;
