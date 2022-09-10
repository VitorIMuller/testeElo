const validarEntradaDeDados = (lancamento) => {
   if (isNaN(lancamento.cpf)) {
      return ("Cpf deve conter apenas numeros")
   }
   if (!testaCPF(lancamento.cpf)) {
      return ("O Cpf está inválido!")
   }
   if (isNaN(lancamento.valor)) {
      return ("O valor deve ser um numero!")
   }
   if (lancamento.valor > 15000 || lancamento.valor < -2000) {
      return ("O valor deve ser maior que -2000 e menor que 15000")
   }
   return null
}

const recuperarSaldosPorConta = (lancamentos) => {
   const newArr = [];
   if (lancamentos.length >= 0) {
      lancamentos.map((lancamento) => {
         const item = newArr.find(el => el.cpf === lancamento.cpf)
         if (item) {
            const index = newArr.indexOf(item);
            if (index !== -1) {
               newArr[index] = { cpf: item.cpf, valor: item.valor + lancamento.valor };
            }
         } else {
            newArr.push({ cpf: lancamento.cpf, valor: lancamento.valor })
         }
      })
   }
   return newArr;
}

const recuperarMaiorMenorLancamentos = (cpf, lancamentos) => {
   let maior;
   let menor;
   const lancamentosCpf = lancamentos.filter(el => el.cpf === cpf);

   lancamentosCpf.map((lancamento) => {
      if (!maior && !menor) {
         maior = lancamento
         menor = lancamento
      }
      if (lancamento.valor > maior.valor) {
         maior = lancamento
      }
      if (lancamento.valor < menor.valor) {
         menor = lancamento
      }

   })
   if (maior && menor) {
      return [menor, maior]
   }
   return []
}

const recuperarMaioresSaldos = (lancamentos) => {
   const newArr = [];
   if (lancamentos.length >= 0) { //reutilizar função
      lancamentos.map((lancamento) => {
         const item = newArr.find(el => el.cpf === lancamento.cpf)
         if (item) {
            const index = newArr.indexOf(item);
            if (index !== -1) {
               newArr[index] = { cpf: item.cpf, valor: item.valor + lancamento.valor };
            }
         } else {
            newArr.push({ cpf: lancamento.cpf, valor: lancamento.valor })
         }
      })
   }

   newArr.sort((a, b) => {
      if (a.valor > b.valor) return -1;
      if (a.valor < b.valor) return 1;
      return 0;
   });

   return newArr.slice(0, 3)
}

const recuperarMaioresMedias = (lancamentos) => {
   const acum = [];

   lancamentos.forEach(lancamento => {
      const match = acum.find(media => media.cpf === lancamento.cpf);
      if (match) {
         match.soma += lancamento.valor
         match.valores++;
      } else {
         lancamento.soma = lancamento.valor
         lancamento.valores = 1;
         acum.push(lancamento)
      }
   });

   const medias = [].map.call(acum, i => ({ cpf: i.cpf, valor: i.soma / i.valores }))

   console.log(medias);

   medias.sort((a, b) => {
      if (a.valor > b.valor) return -1;
      if (a.valor < b.valor) return 1;
      return 0;
   });


   return [medias[0], medias[1], medias[2]]
}


function testaCPF(strCPF) {
   var Soma;
   var Resto;
   Soma = 0;
   if (strCPF == "00000000000") return false;

   for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
   Resto = (Soma * 10) % 11;

   if ((Resto == 10) || (Resto == 11)) Resto = 0;
   if (Resto != parseInt(strCPF.substring(9, 10))) return false;

   Soma = 0;
   for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
   Resto = (Soma * 10) % 11;

   if ((Resto == 10) || (Resto == 11)) Resto = 0;
   if (Resto != parseInt(strCPF.substring(10, 11))) return false;
   return true;
}