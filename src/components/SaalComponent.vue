<template>
    <div class="container">
      <h2>Vali kohad filmile </h2>
      <h1>Seansi algus: </h1>
      
      <div class="saalContainer" v-if="istekohad.length">
        <div class="rida valgetekst" v-for="reaNumber in istekohad.length / 15" :key="'rida:' + reaNumber">
            {{ reaNumber }}
            <div class="koht" v-for="koht in istekohad.slice((reaNumber- 1) * 15, reaNumber * 15)" :key="koht.id" 
            v-bind:class="{ 'roheline': koht.vaba, 'punane': !koht.vaba, 'kollane': kohtadeNumbrid.includes(koht.kohaNumber) }">
                {{ koht.kohaNumber }}
            </div>
        </div>
        <label class="valgetekst" for="kohtadeArv">Sisesta kohtade arv soovituse saamiseks:</label>
        <input type="number" name="kohteArv" required v-model="kohtadeArv">
        <button @click="leiaKohad(this.kohtadeArv)" >Soovita!</button>

      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SaalComponent",
    data() {
      return {
        istekohad: [],
        kohtadeArv: 1,
        kohtadeNumbrid: [],
        
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
        },
        leiaKohad(kohtadeArv){
            fetch(`http://localhost:8080/saal/${this.$route.params.saalId}/soovita/${kohtadeArv}`)
                .then((response) => response.json())
                .then((data) => {
                    this.kohtadeNumbrid = data
                    this.fetchSaal()
                
                
                })
                .catch((err) => console.log(err.message));

        }
      
    },
    
  };
  </script>

  <style scoped>
  .saalContainer{
    display: flex;
    flex-direction: column;
    padding: 0px;
    margin: 0px;
    align-items: center;
  }
  .rida{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .koht{
    height: 40px;
    width: 40px;
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 10px;

  }
  .roheline{
    background-color: rgb(98, 165, 98);
  }
  .punane{
    background-color: rgb(185, 120, 120);
  }
  .kollane{
    background-color: rgb(222, 209, 92);
  }
  input{
    height: 20px;
    width: 90px;
    margin-bottom: 10px;
  }
  button{
    height: 30px;
    width: 70px;
    margin-bottom: 10px;
  }
 .valgetekst{
    color:white;
 }
  </style>