<template>
    <div class="container">
      <h2>Vali kohad filmile </h2>
      
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
        <h3 v-if="this.msg">{{this.msg}}</h3>
        <button v-if="this.kohtadeNumbrid.length!=0 && this.userId!=null" @click="salvestaSeanss(this.$route.params.seanssId,this.userId)">Broneeri!</button>

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
        userId: null,
        msg: ''
        
      };
    },
    mounted() {
        this.fetchSaal()
        this.userId=localStorage.getItem("userId")
        console.log("mounted saal")
        console.log(this.$route.params.seanssId)
        console.log(localStorage.getItem("userId"))
       
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
                    if(data.length === 0){
                        this.msg = "Selline arv istekohti ei saa kõrvuti broneerida";
                    } else {
                        this.kohtadeNumbrid = data;
                        this.fetchSaal();
                    }
                    
                })
                .catch((err) => console.log(err.message));

        },
        salvestaSeanss(seanssId,userId){
            
        fetch(`http://localhost:8080/salvestaSeanss/${seanssId}/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
            credentials: 'include', 
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error('serveri error');
        }})
        .then(() => {
    
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
          
          
        });
    }
      
    },
    
  };
  </script>

  <style scoped>
  h3 {
    color:white;
  }
  h2 {
    color:white;
  }

  .container{
    background-color: rgb(18, 18, 24);
  }
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