// Função para converter um número romano em arábico
function romanToArabic(romanNumeral) {
    const romanValues = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000
    };
  
    let arabicNumber = 0;
  
    for (let i = 0; i < romanNumeral.length; i++) {
      const currentSymbol = romanNumeral[i];
      const currentValue = romanValues[currentSymbol];
      const nextSymbol = romanNumeral[i + 1];
      const nextValue = romanValues[nextSymbol];
  
      if (nextValue && currentValue < nextValue) {
        arabicNumber -= currentValue;
      } else {
        arabicNumber += currentValue;
      }
    }
  
    return arabicNumber;
  }
  
  // Função para converter um número arábico em romano
  function arabicToRoman(arabicNumber) {
    const romanValues = [
      { value: 1000, symbol: 'M' },
      { value: 900, symbol: 'CM' },
      { value: 500, symbol: 'D' },
      { value: 400, symbol: 'CD' },
      { value: 100, symbol: 'C' },
      { value: 90, symbol: 'XC' },
      { value: 50, symbol: 'L' },
      { value: 40, symbol: 'XL' },
      { value: 10, symbol: 'X' },
      { value: 9, symbol: 'IX' },
      { value: 5, symbol: 'V' },
      { value: 4, symbol: 'IV' },
      { value: 1, symbol: 'I' }
    ];
  
    let romanNumber = '';
  
    for (let i = 0; i < romanValues.length; i++) {
      while (arabicNumber >= romanValues[i].value) {
        romanNumber += romanValues[i].symbol;
        arabicNumber -= romanValues[i].value;
      }
    }
  
    return romanNumber;
  }
  
  // Função para tratar o evento de conversão
  function converter() {
    const inputElement = document.getElementById('input');
    const resultadoElement = document.getElementById('resultado');
  
    const valor = inputElement.value.trim();
  
    if (valor === '') {
      resultadoElement.textContent = 'Por favor, digite um número romano ou arábico.';
      return;
    }
  
    let resultado = '';

      if (/^\d+$/.test(valor)) {
      // É um número arábico, então converte para romano
      const arabicNumber = parseInt(valor, 10);
      resultado = arabicToRoman(arabicNumber);
      resultadoElement.innerText = 'O número ARÁBICO "' + inputElement.value + '" convertido para ROMANO é: ' + resultado
    } else {
      // É um número romano, então converte para arábico
      resultado = romanToArabic(valor.toUpperCase());
      resultadoElement.innerText = 'O número ROMANO "' + inputElement.value + '" convertido para ARÁBICO é: ' + resultado
    }   
  }
  