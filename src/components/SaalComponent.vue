<template>
    <div class="container">
      <h2>Vali kohad filmile </h2>
      <h1>Seansi algus: </h1>
      
      <div class="saalContainer" v-if="istekohad.length">
        <div class="rida" v-for="reaNumber in istekohad.length / 15" :key="'rida:' + reaNumber">
            {{ reaNumber }}
            <div class="koht" v-for="koht in istekohad.slice((reaNumber- 1) * 15, reaNumber * 15)" :key="koht.id" v-bind:class = "(koht.vaba)?'roheline':'punane'">
                {{ koht.kohaNumber }}
            </div>
        </div>

      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SaalComponent",
    data() {
      return {
        istekohad: [],
        
      };
    },
    mounted() {
        this.fetchSaal()
        console.log("mounted saal")
       
    },
    methods: {
        fetchSaal() {
            fetch(`http://localhost:8080/saal/${this.$route.params.saalId}`)
                .then((response) => response.json())
                .then((data) => {
                this.istekohad = data
                console.log("istekohad length: ", this.istekohad);
                
                })
                .catch((err) => console.log(err.message));
        }
      
    },
    
  };
  </script>

  <style scoped>
  .rida{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .koht{
    height: 40px;
    width: 40px;
  }
  .roheline{
    background-color: rgb(98, 165, 98);
  }
  .punane{
    background-color: rgb(185, 120, 120);
  }
  </style>