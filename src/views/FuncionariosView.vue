<template>
  <div class="about">

    <DataTable :value="listaFuncionarios.funcionario" responsiveLayout="scroll">
      
            <Column field="funcionarioId" header="Id"></Column>
            <Column field="nome" header="Nome"></Column>
            <Column field="salario" header="Salario"></Column>
            
        </DataTable>
    </div>
</template>

        <!-- <DataTable :value="listaFuncionarios.funcionario" responsiveLayout="scroll">
            <Column field="funcionarioId" header="Id"></Column>
            <Column field="nome" header="Nome"></Column>
            <Column field="salario" header="Salario"></Column>
        </DataTable>  -->



<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script setup>
import {reactive, onMounted} from "vue";

import http from "@/services/https.js";
name: "ListaFuncionarios";


let listaFuncionarios = reactive({funcionario:[]})
onMounted( async () => {
  try{                                        
    const {data} = await http.get('Funcionario/Listar');
    listaFuncionarios['funcionario'] = data;
    console.log(listaFuncionarios)
  } catch (error){
    console.log(error);
  }
})

</script>
  