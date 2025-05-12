import edge from 'edge-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assemblyPath = path.join(__dirname, 'Calculadora.Core.dll');

const soma = edge.func({
  assemblyFile: assemblyPath,
  typeName: 'Calculadora.Core.Operacao',
  methodName: 'Soma'
});

const multiplicacao = edge.func({
  assemblyFile: assemblyPath,
  typeName: 'Calculadora.Core.Operacao',
  methodName: 'Multiplicacao'
});

const subtracao = edge.func({
  assemblyFile: assemblyPath,
  typeName: 'Calculadora.Core.Operacao',
  methodName: 'Subtracao'
});

const divisao = edge.func({
  assemblyFile: assemblyPath,
  typeName: 'Calculadora.Core.Operacao',
  methodName: 'Divisao'
});


soma({ n1: 10, n2: 5 }, function (error, result) {
  if (error) throw error;
  console.log('Resultado da Soma:', result);
});

multiplicacao({ n1: 10, n2: 5 }, function (error, result) {
  if (error) throw error;
  console.log('Resultado da Multiplicação:', result);
});

subtracao({ n1: 10, n2: 5 }, function (error, result) {
  if (error) throw error;
  console.log('Resultado da Subtração:', result);
});

divisao({ n1: 10, n2: 2 }, function (error, result) {
  if (error) throw error;
  console.log('Resultado da Divisão:', result);
});

divisao({ n1: 10, n2: 0 }, function (error, result) {
  if (error) {
    console.error('Erro na Divisão:', error);
    return;
  }
  console.log('Resultado da Divisão (com erro tratado):', result);
});


export { soma, multiplicacao, subtracao, divisao };