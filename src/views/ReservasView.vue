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
    
    <label >
      Data da Reserva
      <input @change="verificaDisponibilidade()" type="date" id="dataReserva" />
    </label>
    
    <label>
      Id do Funcionário
      <input type="text" @model="novaReserva.idFuncionario" id="idFuncionario" />
    </label>
    
    <label>Selecione um equipamento
      <select v-model="novaReserva.equipamentoSelecionado" @change="verificaDisponibilidade()">
        <option v-for="e in listaDeEquipamentos.equipamentos" :value="e">
          {{e.nome}} | R$ {{e.custoDiario}}
        </option>
      </select>
    </label>

    <div class="custoReserva">
      Custo da Reserva
      <span v-text="novaReserva.equipamentoSelecionado.custoDiario"></span>
    </div>

    <div class="button-cadastrar" style="margin-top:30px;" @click="reservarEquipamento()">Reservar</div>
  </form>
    
</template>

<script setup>
  import {onMounted, onUpdated, reactive, ref} from "vue";
  import https from "../services/https.js";
  
  import 'primeicons/primeicons.css';

  let listaDeReservas = reactive({reservas:[]});
  let listaDeEquipamentos = reactive({equipamentos:[]});
  let novaReserva = reactive({equipamentoSelecionado:'',dataSelecionada:'', idFuncionario:''});

  onMounted(async () =>{  
    var {data} = await https.get('Reserva/Listar');
    listaDeReservas.reservas = data;

    var {data} = await https.get('Equipamento/Listar');
    listaDeEquipamentos.equipamentos = data;    
  })

  // onUpdated(async () =>{
  //   var {data} = await https.get('Reserva/Listar');
  //   listaDeReservas.reservas = data;

  //   var {data} = await https.get('Equipamento/Listar');
  //   listaDeEquipamentos.equipamentos = data;    
  // })


  const cancelar = async (reserva) => {
    await https.post('Reserva/Cancelar',reserva)
  }

  const verificaDisponibilidade = () => {
    // var dataSelecionada = new Date(String(document.getElementById('dataReserva').value).replaceAll("-",'/')).toLocaleDateString();
    
    var dataSelecionada = String(document.getElementById('dataReserva').value).replaceAll("-",'/');

    if(dataSelecionada!= '' && novaReserva.equipamentoSelecionado != '')
    {
      
      let disponibilidade = true;
      
      dataSelecionada = new Date(dataSelecionada).toLocaleDateString('en-US');

      listaDeReservas.reservas.forEach(r => {
        if(new Date(r.dataReserva).toLocaleDateString() == dataSelecionada 
        && r.equipamentoId == novaReserva.equipamentoSelecionado.equipamentoId )
        {
          window.alert('Data não disponível para este produto!');
          disponibilidade = false;
        }
      })

      if(disponibilidade)
      {
        novaReserva.dataSelecionada = dataSelecionada;
      }

      return disponibilidade;
    }
    return false;
  }
  
  const reservarEquipamento = async () => {
    
    if(novaReserva.equipamentoSelecionado == '')
    {
      window.alert("Selecione um equipamento!")
      return false;
    }
    if(novaReserva.dataSelecionada == '')
    {
      window.alert("Selecione uma data!")
      return false;
    }

    if(!verificaDisponibilidade()){
      window.alert("Data não disponível")
    }

    let reserva =  {
      "funcionarioId":parseInt(document.getElementById("idFuncionario").value),
      "EquipamentoId":parseInt(novaReserva.equipamentoSelecionado.equipamentoId),
      "CustoReserva": novaReserva.equipamentoSelecionado.custoDiario,
      "DataReserva": new Date(novaReserva.dataSelecionada)
    }

    const retorno = await https.post('Reserva/Cadastrar',reserva)
    window.alert(retorno.data)
  }

  const formControllerActivate = () => {
    document.getElementById("formReserva").classList.add("formSelected")
  }

</script>