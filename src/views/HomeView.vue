<script setup>

</script>

<template>
  <div class="nav-home">
    <button><RouterLink to="/">Home</RouterLink></button>
    <button><RouterLink to="/equipamentos">Equipamentos</RouterLink></button>
    <button><RouterLink to="/funcionarios">Funcionarios</RouterLink></button>
    <button><RouterLink to="/projetos">Projetos</RouterLink></button>
    <button><RouterLink to="/relatorios">Relatorios</RouterLink></button>
    <button><RouterLink to="/reservas">Reservas</RouterLink></button>
  </div>
</template>

<style>
  .nav-home{
    display: flex;
  }
  .nav-home button {
    margin:250px 10px;
    height: 40px;
    width: 120px;
    padding: 10px;
    border-radius: 30px;
    border-color: transparent;
    
    background-color: rgb(53, 53, 59);
    color: white;

    cursor: pointer;
  }

  .nav-home button:hover{
    background-color: rgb(87, 87, 92);

  }

  table button{
    background-color: rgb(53, 53, 59);
    border-radius: 5px;
    border-color: transparent;
    color: rgba(255, 255, 255, 0.719);
  }

  table button:hover
  {
    background-color: rgb(44, 44, 48);
  }
</style>
