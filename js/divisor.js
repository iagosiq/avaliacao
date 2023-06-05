var billItems = []; // Array para armazenar os itens da conta

document.getElementById("add-item").addEventListener("click", function(add) {
  add.preventDefault(); // Impede o envio do formulário

  // Obter os valores inseridos pelo usuário
  var value = parseFloat(document.getElementById("value").value);

  // Adicionar o valor à lista de itens da conta
  billItems.push(value);

  // Limpar o campo de valor
  document.getElementById("value").value = "";
});

document.getElementById("submit-form").addEventListener("click", function(envio) {
  envio.preventDefault(); // Impede o envio do formulário

  // Obter o valor inserido pelo usuário
  var name = document.getElementById("name").value;

  // Atualizar os detalhes da conta
  updateBillDetails(name);

  // Limpar o campo de nome
  document.getElementById("name").value = "";

  // Limpar a lista de itens da conta
  billItems = [];
});

function updateBillDetails(name) {
  // Calcular o valor total da conta
  var total = 0;
  for (var i = 0; i < billItems.length; i++) {
    total += billItems[i];
  }

  // Verificar se a opção de gorjeta está marcada
  var includeTip = document.getElementById("tip").checked;
  if (includeTip) {
    total += total * 0.1; // Adicionar 10% de gorjeta
  }

  // Exibir ou ocultar os detalhes da conta
  var billList = document.getElementById("bill-list");
  if (billItems.length > 0) {
    billList.style.display = "block";
  } else {
    billList.style.display = "none";
  }

  // Exibir o nome e o valor total da conta
  var listItem = document.createElement("li");
  listItem.innerHTML = "<strong>Nome:</strong> " + name + " | <strong>Total:</strong> R$ " + (isNaN(total) ? '0.00' : total.toFixed(2));
  billList.appendChild(listItem);
}
