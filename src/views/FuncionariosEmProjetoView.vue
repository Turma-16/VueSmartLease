<style scoped>
  table{
    background-color: rgb(255, 255, 255);
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
<h1>Projeto {{responseFuncProjeto.projeto.nome}}</h1> 
<table>
  <thead>
    <tr>
      <th>Id</th>
      <th>Nome</th>
      <th>Salario</th>
      <th></th>
    </tr>
  </thead>

  <tbody v-for="f in responseFuncProjeto.funcionarios" v-bind:key="f.funcionarioId">  
    <tr >
      <td>{{f.funcionarioId}}</td>
      <td>{{f.nome}}</td>
      <td>R$ {{f.salario}}</td>
      <td>
        <button type="submit" @click='deletarFuncionario(f.funcionarioId)'><i class="pi pi-trash"></i></button>
      </td>
    </tr>
  </tbody>

</table>
<button class="button-cadastrar" @click="formControllerActivate()" >
  Adicionar Funcionario <i class="pi pi-plus"></i>
</button>

<form id="form" class="formCadastro">
  <label for="Funcionarios">Funcionarios
    <ul>
      <li v-for="fu in responseFuncSemProjeto.funcionarios" v-bind:key="fu.funcionarioId" :value="fu.id">
        {{fu.funcionarioId}} - {{fu.nome}} 
      </li>
    </ul>
  </label>

  <label>Escolha o Funcionario:
    <input v-model="responseFuncionarioNovo.funcionarioId" type="number" placeholder="Digite o Id do Funcionario"/>
  </label>
  
  <button class="button-cadastrar" @click="cadastrarFuncionario()" >Cadastrar</button>

</form>
</template>

<script setup>

import {onMounted, onUpdated, reactive, ref} from "vue";
import { useRoute } from 'vue-router'
import https from "../services/https.js";
import 'primeicons/primeicons.css';

var selected;
let responseFuncProjeto = reactive({
  projeto: [],
  funcionarios: []});

let responseFuncSemProjeto = reactive({
  funcionarios:[]
}); 

let responseFuncionarioNovo = reactive({
      projetoId:null,
      funcionarioId:null 
    });
    
let responseFuncionarioDeletado = reactive({
      projetoId:null,
      funcionarioId:null 
    }); 

const route = useRoute()

onMounted(async () =>{
  var projetoIdURL = route.params.projetoId;
  var {data} = await https.get(`FuncionarioProjeto/Listar?projetoId=${projetoIdURL}`);
  responseFuncProjeto.projeto = data.projeto;
  responseFuncProjeto.funcionarios = data.funcionarios;
  
  var {data} = await https.get(`Funcionario/ListarSemProjeto`);  
  responseFuncSemProjeto.funcionarios = data;
})

const cadastrarFuncionario = async () => {
   responseFuncionarioNovo.projetoId = parseInt(route.params.projetoId);
   responseFuncionarioNovo.funcionarioId = parseInt(responseFuncionarioNovo.funcionarioId);
   await https.post('FuncionarioProjeto/Cadastrar',responseFuncionarioNovo);
   sleep(2000);
   return true;
}
const formControllerActivate = () => {
  document.getElementById("form").classList.add("formSelected")
}
const deletarFuncionario = async (f) =>
{
  responseFuncionarioDeletado.projetoId= parseInt(route.params.projetoId);
  responseFuncionarioDeletado.funcionarioId= parseInt(f);
  console.log(responseFuncionarioDeletado.funcionarioId, responseFuncionarioDeletado.projetoId )
  await https.put(`FuncionarioProjeto/Desativar?projetoId=${responseFuncionarioDeletado.projetoId}?&funcionarioId=${responseFuncionarioDeletado.funcionarioId}`);
  return true;
}


</script>

