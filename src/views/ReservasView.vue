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
  <h1>Reservas</h1>

  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Id do Funcionário</th>
        <th>Id do Equipamento</th>
        <th>Custo de Reserva</th>
        <th>Data da Reserva</th>
        <th></th>
      </tr>
    </thead>
    <tbody v-for="r in listaDeReservas.reservas">  
      <tr>
        <td>{{r.id}}</td>
        <td>{{r.funcionarioId}}</td>
        <td>{{r.equipamentoId}}</td>
        <td>{{r.custoReserva}}</td>
        <td>{{new Date(String(r.dataReserva)).toLocaleDateString()}}</td>      
        <td>
          <button type="submit" @click='cancelar(r)'><i class="pi pi-trash"></i></button>
        </td>
      </tr>
    </tbody>
  </table>
  <button class="button-cadastrar" @click="formControllerActivate()" >
    Reservar Equipamento <i class="pi pi-plus"></i>
  </button>

  <!-- FOMRULARIO DE NOVA RESERVA -->
  <form id="formReserva" class="formCadastro">
    
    <label @change="verificaDisponibilidade()">
      Data da Reserva
      <input v-model="novaReserva.dataSelecionada" type="date"/>
    </label>
    
    <label>
      Id do Funcionário
      <input type="number"/>
    </label>
    
    <label>Selecione um equipamento
      <select v-model="novaReserva.equipamentoSelecionado" @change="verificaDisponibilidade()">
        <option v-for="e in listaDeEquipamentos.equipamentos" :value="e">
          {{e.nome}} | R$ {{e.custoDiario}}
        </option>
      </select>
    </label>

    <button class="button-cadastrar" style="margin-top:30px;"  >Reservar</button>
  </form>
    
</template>



<script setup>
  import {onMounted, onUpdated, reactive, ref} from "vue";
  import https from "../services/https.js";
  import 'primeicons/primeicons.css';

  let listaDeReservas = reactive({reservas:[]});
  let listaDeEquipamentos = reactive({equipamentos:[]});
  let novaReserva = reactive({equipamentoSelecionado:'',dataSelecionada:new Date()});


  onMounted(async () =>{
    var {data} = await https.get('Reserva/Listar');
    listaDeReservas.reservas = data;

    var {data} = await https.get('Equipamento/Listar');
    listaDeEquipamentos.equipamentos = data;    
  })


  const cancelar = async (reserva) => {
    let confirmacao = window.confirm("Deseja mesmo cancelar essa reserva?");

    if(!confirmacao){
      return false;
    }
    
    await https.delete('Reservas/Cancelar',reserva)
    return true;
  }
  
  const verificaDisponibilidade = () => 
  {     
    if(novaReserva.equipamentoSelecionado != '' && novaReserva.dataSelecionada != '' )
    { 
      var retorno = https.post('Reserva/ValidarData',dataReserva.dataSelecionada)
    }     
  }

  const formControllerActivate = () => {
    document.getElementById("formReserva").classList.add("formSelected")
  }

</script>