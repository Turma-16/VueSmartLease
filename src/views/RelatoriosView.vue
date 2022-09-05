<style scoped>
  table{
    background-color: white;
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

    background-color: white;
    color: black;
    border-radius: 5px;

    display: none;
  }

  .formSelected{
    display:flex;
  }
</style>


<template>
  <div class="about">
    <h1>Relatorios</h1>
  </div>

  <label>
    Data de inicio
    <input type="date" id="dataInicio" />
  </label>
      
  <label>
    Data de fim
    <input type="date" id="dataFim" />
  </label>

  <button class="button-cadastrar" @click="buscar()" >Buscar</button>
  <button class="button-cadastrar" @click="buscarPeriodoAtivo()" >Buscar Período Ativo</button>

 <table >

    <thead>
      <tr>
        <th>Data</th>
        <th>Custo</th>
        <th>Número de funcionarios</th>
        <th>Número de Reserva</th>
      </tr>
    </thead>
    <tbody v-for="r in dadosDeRetorno.dadosColetados">
      <tr>
        <td>{{r.dataStr}}</td>
        <td>R$ {{r.custo}}</td>
        <td>{{Object.keys(r.funcionarios).length}}</td>
        <td>{{Object.keys(r.reservas).length}}</td>
      </tr>
    </tbody>
  </table>

</template>





<script setup>
  import { useRoute } from 'vue-router'
  import { reactive} from "vue";
  import https from "../services/https.js";

  const route = useRoute()

  var projetoIdURL = parseInt(route.params.projetoId);
  let dadosDeBusca = reactive({projetoId:projetoIdURL, dataInicio:'', dataFinal:''});
  let dadosDeRetorno = reactive({dadosColetados :[]});

  const buscarPeriodoAtivo = async () => {
    let {data} = await https.get(`Custo/ListarPeriodoAtivo?projetoId=${parseInt(dadosDeBusca.projetoId)}`);
    dadosDeRetorno.dadosColetados = (data)
  }

  const buscar = async () => {

    let inicio = (new Date(String(document.getElementById('dataInicio').value).replaceAll("-",'/')).toLocaleDateString('en-US'));
    let fim = (new Date(String(document.getElementById('dataFim').value).replaceAll("-",'/')).toLocaleDateString('en-US'));
  
    if(inicio > fim)
    {
      window.alert("Data invalida")
      return false;
    }

    dadosDeBusca.dataInicio = (inicio);
    dadosDeBusca.dataFinal = (fim);
    
    let {data} = await https.post('Custo/Listar',dadosDeBusca);
    dadosDeRetorno.dadosColetados = (data)

  }



</script>