<template>
  <div class="about">

        <DataTable :value="listaProjetos.projeto" responsiveLayout="scroll">
            <Column field="projetoId" header="Id"></Column>
            <Column field="nome" header="Nome"></Column>
        </DataTable> 
  </div>
</template>

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
name: "ListaProjetos";


let listaProjetos = reactive({projeto:[]})
onMounted( async () => {
  try{                                        
    const {data} = await http.get('Projeto/Listar');
    listaProjetos['projeto'] = data;
  } catch (error){
    console.log(error);
  }
})

</script>