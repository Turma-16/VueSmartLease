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
  <h1>Lista de Projetos</h1>
 
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Nome</th>
        <th></th>
      </tr>
    </thead>
    <tbody v-for="p in listaDeProjetos.projeto">  
      <tr>
        <td>{{p.projetoId}}</td>
        <td>{{p.nome}}</td>

      </tr>
    </tbody>
  </table>

    
</template>

<script setup>
  import {onMounted, onUpdated, reactive, ref} from "vue";
  import https from "../services/https.js";
  import 'primeicons/primeicons.css';

  let listaDeProjetos = reactive({projeto:[]});


  onMounted(async () =>{
    var {data} = await https.get('Projeto/Listar');
    listaDeProjetos.projeto = data;
  })

  
</script>