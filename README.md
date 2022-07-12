# Fabrik List Action

<div align="center">
  <img src="./.github/jlowcodelogo.png" width="350" />
</div>




## Sobre
<p>O plugin Action List permite adicionar uma nova ação na linha de ações de uma lista. Este plugin pode funcionar em conjunto com um módulo ou com códigos próprios em PHP ou Javascript, o script cadastrado será executado assim que o usuário clicar no botão. A ação é exibida conforme a configuração do nível de acesso.</p>

## Especificações
<div align="center">
  <img src="./.github/1.png" />
</div>
<br />

- Nível de Acesso: Determina o nível de acesso do usuário que vê a ação.
- Tipo de Ação: Mostra um botão que executa um código PHP ou imprime o resultado do código PHP (return da função) ignorando o botão.
- Tipo de código: Se será executado um código PHP ou código Javascript
- Texto do botão: Rótulo do botão
- Ícone do botão: O ícone exibido no botão (pode ficar em branco).
- Código PHP: O código a ser executado caso selecionado Tipo PHP
- Código Javascript: O código a ser executado caso selecionado Tipo Javascript
- Mensagem de sucesso: Mensagem a ser exibida após a execução caso julgue necessário.

## Uso

<p>Após realizar as configurações necessárias inserindo o script e os parâmetros desejados, o ``Botão Ação´´ aparecerá no topo da lista e, ao ser clicado executará o script selecionado (PHP ou Javascript), exibindo a mensagem de finalização logo após, caso configurada, </p>

<br />
<div align="center">
  <img src="./.github/2.png" />
</div>
