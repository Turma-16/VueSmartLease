<style scoped>
  table{
    background-color: rgb(254, 246, 231);
    color: black;
    border-collapse: collapse;
    border-radius: 5px;

  }
  
  thead{
    background-color: rgb(105, 172, 156);
    color: white;
    font-weight: bold;
  }

  td,tr{
    text-align: center;
    padding: 5px 0px;
  }

  table button{
    margin: 0px 5px;
    cursor: pointer;
  }

  input{
    height: 40px;
    font-size: 15px;
    text-indent: 10px;
    outline: none;

    border: 1px solid black;
    border-radius: 2px;
    letter-spacing: 1px;

    margin: 10px;
  }

  input:focus{
    background-color: rgb(243, 240, 252);
  }

  textarea{
    width: 100%;
    height: 150px;
    resize: none;

    font-size: 15px;
    padding: 12px 20px;

    border: 1px solid black;
    border-radius: 4px;
    outline: none;
  }

  textarea:focus{
    background-color: rgb(243, 240, 252);
  }

  .button-cadastrar{
    width: 130px;
    height: 40px;
    margin:10px;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: rgb(66, 66, 182);
    color: white;
    border: none;
    border-radius: 5px;

    cursor: pointer;
  }

  .button-cadastrar:hover{
    background-color: rgb(88, 88, 166);

  }

  .button-cadastrar i{
    margin-left: 10px;
    color:white;
  }

  .formCadastro{
    width: 50vw;
    height: 400px;

    margin: 30px 0px;

    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: rgb(254, 246, 231);
    color: black;
    border-radius: 5px;

    display: none;
  }

  .formSelected{
    display:flex;
  }
  
</style>

<template >
  <h1>Equipamentos</h1>
 
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Nome</th>
        <th>Custo Diário</th>
        <th></th>
      </tr>
    </thead>
    <tbody v-for="e in listaDeEquipamentos.equipamentos">  
      <tr>
        <td>{{e.equipamentoId}}</td>
        <td>{{e.nome}}</td>
        <td>R$ {{e.custoDiario}}</td>
        <td>
          <button type="submit" @click='mudarCusto(e)'><i class="pi pi-pencil"></i></button>
          <button type="submit" @click='mostrarDescricao(e.descricao)'><i class="pi pi-book"></i></button>
        </td>
      </tr>
    </tbody>
  </table>
  <button class="button-cadastrar" @click="formControllerActivate()" >
    Cadastrar <i class="pi pi-plus"></i>
  </button>

  <form id="form" class="formCadastro">
    <label>
      Nome
      <input type="text" v-model="novoEquipamento.Nome">
    </label>

    <label>
      Custo Diário
      <input type="text" v-model="novoEquipamento.CustoDiario">
    </label>

    <label>
      Descrição
      <textarea cols="30" rows="10" v-model="novoEquipamento.Descricao"></textarea>
    </label>
        
    <button class="button-cadastrar" @click="cadastrarEquipamento()" >Cadastrar</button>

  </form>
    
</template>

<script setup>
  import {onMounted, onUpdated, reactive, ref} from "vue";
  import https from "../services/https.js";
  import 'primeicons/primeicons.css';

  let listaDeEquipamentos = reactive({equipamentos:[]});
  let novoEquipamento = reactive({Nome: '', Descricao:'', CustoDiario:null});

  onMounted(async () =>{
    var {data} = await https.get('Equipamento/Listar');
    listaDeEquipamentos.equipamentos = data;
  })

  const mudarCusto = async (equipamento) => {
    let novoCusto = parseFloat (await window.prompt("Insira o novo custo:"))

    if(isNaN(novoCusto)){
      window.alert('Valor inválido');
      return false
    }else if(novoCusto<=0){
      window.alert('O custo não pode ser menor ou igual a zero');
      return false
    }else if(novoCusto>999.99){
      window.alert('O valor não pode ser maior que R$ 999.99');
      return false
    }else{
      equipamento.custoDiario = novoCusto;
      await https.post('Equipamento/AlterarCusto',equipamento)
      return true
    }
  }

  const mostrarDescricao = (descricao) => {
    window.alert(descricao);
  }

  const cadastrarEquipamento = async () => {

    novoEquipamento.CustoDiario = parseFloat(novoEquipamento.CustoDiario);

    if(novoEquipamento.Nome == ''){
      window.alert("Você deve adicionar um nome");
      return false

    }else if(novoEquipamento.Descricao == ''){
      window.alert("Você deve adicionar uma descrição");
      return false

    }else if(isNaN(novoEquipamento.CustoDiario)){
      window.alert('Valor inválido');
      return false

    }else if(novoEquipamento.CustoDiario<=0){
      window.alert('O custo não pode ser menor ou igual a zero');
      return false
      
    }else if(novoEquipamento.CustoDiario>999.99){
      window.alert('O valor não pode ser maior que R$ 999.99');
      return false
      
    }else{
      await https.post('Equipamento/Cadastrar',novoEquipamento);
      return true

    }
  }

  const formControllerActivate = () => {
    document.getElementById("form").classList.add("formSelected")
  }

  
</script>