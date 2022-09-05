<template>
    <div class="about">
        
        <InputText type="text" v-model="nomeProjeto" placeholder="Nome" />
        <Button label="Cadastrar" />
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
  
  const projeto = {
    nome: nomeProjeto
  }

/*   const data = JSON.stringify({
    Email: this.email,
    Phone: this.phone,
    Information: this.information
    })
    methods: {
    Cadastrar(){}
    } */
  let listaProjetos = reactive({projeto:[]})
  onMounted( async () => {
    try{                                        
      const {data} = await http.get('Projeto/Listar');
      listaProjetos['projeto'] = data;
    } catch (error){
      console.alert(error);
    }
  })
  
  </script>