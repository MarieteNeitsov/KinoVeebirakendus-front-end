<template>
    <div class="kava">
        <h1>Kinokava</h1>
        <div class="container">
        
            <div v-for="seanss in seansid" :key="seanss.id">
                
                <div class="kuupäev" v-bind:praeguneKuupäev="seanss.kuupäev" v-if="praeguneKuupäev!==seanss.kuupäev">{{ formatKuupäev(seanss.kuupäev) }}</div>
                <h2 class="pealkiri"> {{ seanss.film.pealkiri }} </h2>
                
                <div class="seanss">  
                <img class="pilt" :src="seanss.film.pilt"/>
                <div class= 'kirjeldus'>
                    <h3 > algusaeg: {{ seanss.algusAeg }} </h3>
                    <p > žanr: {{ seanss.film.zanr }} </p> 
                    <p > vanusepiirang: {{ seanss.film.vanusepiirang }} </p>
                    <p > kestus: {{ seanss.film.kestus }} </p>
                    <p > keel: {{ seanss.keel }} </p>
                </div>
                </div>
            </div>

            <button class="center">Soovita filme</button>
        </div>
    </div>
 </template>

<script>
export default {
  name: "SeansidComponent",
  data() {
    return {
      seansid: [],
      praeguneKuupäev: null,
    };
  },
  methods: {
    fetchSeansid() {
      fetch(`http://localhost:8080/seansid`)
        .then((response) => response.json())
        .then((data) => (this.seansid = data))
        .catch((err) => console.log(err.message));
    },
    formatKuupäev(kp) {
      const [aasta, kuu, päev] = kp.split('-');
      return `${päev}.${kuu}.${aasta}`;
    },
  },
  
  mounted() {
    this.fetchSeansid();
    console.log("mounted");
  },

};
</script>

<style scoped>

.pilt {
    width: 200px;  
    height: 300px; 
    object-fit: cover; 
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 5);
}
.seanss{
    display: flex;
    align-items: start;
    margin-left: 100px;
    background-color: rgb(216, 216, 230);
    border-radius: 10px;
    margin-right: 100px;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 15px;

}
.kirjeldus{
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-left: 150px;
    
}
.kirjeldus p {
    margin-bottom: 20px; 
}
h2{
    text-align: left;
    margin-left: 100px;
    color: whitesmoke;
}
.kuupäev{
    background-color: whitesmoke;
    
    margin-top:30px;
    margin-bottom: 10px;
    margin-left: 100px;
    margin-right: 100px;
    padding: 15px;
    text-align: left;
    border-radius: 10px;
}

h1 {
  font-size: 20px;
  color: whitesmoke;
  padding: 50px;
}


</style>

