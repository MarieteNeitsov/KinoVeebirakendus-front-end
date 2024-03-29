<template>
    <div class="kava">
        <h1>Kinokava</h1>
        <div class="container">
          <div>
              <select v-model="valitudZanr">
                  <option value=null>Vali zanr</option>
                  <option v-for="valik in zanrValikud" :key="valik" >{{ valik }}</option>
                </select>

                <select v-model="valitudVanusepiirang">
                  <option value=null>Vali vanusepiirang</option>
                  <option v-for="valik in vanusepiirangValikud" :key="valik" >{{ valik }}</option>
                </select>

                <select v-model="valitudAlgusaeg">
                  <option value=null>Vali algusaeg</option>
                  <option v-for="valik in algusaegValikud" :key="valik" >{{ valik }}</option>
                </select>

                <select v-model="valitudKeel">
                  <option value=null>Vali keel</option>
                  <option v-for="valik in keelValikud" :key="valik" >{{ valik }}</option>
                </select>
                
        </div>

        <button v-if="this.userId === null" @click='this.$router.push("/signup")'>Logi sisse</button>
        <button v-else @click="logout()">Logi välja</button>

            <div v-for="seanss in seansid" :key="seanss.id" @click="näitaSaali(seanss)">
                
                <div class="kuupäev" v-bind:praeguneKuupäev="seanss.kuupäev" v-if="praeguneKuupäev!==seanss.kuupäev">{{ formatKuupäev(seanss.kuupäev) }}</div>
                <h2 class="pealkiri"> {{ seanss.film.pealkiri }} </h2>
                
                <div id="muutuv" class="seanss">  
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
            
            <button v-if="this.userId!=null" @click="soovitaFilme()">Soovita filme</button>
        </div>
    </div>
 </template>

<script>
export default {
  name: "SeansidComponent",
  created() {
    window.addEventListener('beforeunload', () => {
      localStorage.clear();
    });
  },
  
  data() {
    return {
      seansid: [],
      praeguneKuupäev: null,
      valitudVanusepiirang: null,
      valitudAlgusaeg: null,
      valitudZanr: null,
      valitudKeel: null,
      vanusepiirangValikud: [],
      algusaegValikud: [],
      zanrValikud: [],
      keelValikud: [],
      userId: null
    };
  },
  watch:{
    
    valitudZanr: 'filtreeri',
    valitudVanusepiirang: 'filtreeri',
    valitudAlgusaeg: 'filtreeri',
    valitudKeel: 'filtreeri',
    
    
  },

  methods: {
    fetchSeansid() {
      fetch(`http://localhost:8080/seansid`)
        .then((response) => response.json())
        .then((data) => {
          this.seansid = data;

          this.vanusepiirangValikud = [...new Set(data.map(seanss => seanss.film.vanusepiirang))];
          this.algusaegValikud = [...new Set(data.map(seanss => seanss.algusAeg.split(':')[0]))];
          this.zanrValikud = [...new Set(data.map(seanss => seanss.film.zanr))];
          this.keelValikud = [...new Set(data.map(seanss => seanss.keel))];

        
        })
        .catch((err) => console.log(err.message));
    },
    filtreeri(){
      fetch(`http://localhost:8080/seansid/filter?vanusepiirang=${this.valitudVanusepiirang}&algusaeg=${this.valitudAlgusaeg}&zanr=${this.valitudZanr}&keel=${this.valitudKeel}`)
        .then((response) => response.json())
        .then((data) => {
          this.seansid = data;
        })
        .catch((err) => console.log(err.message));

    },
    formatKuupäev(kp) {
      const [aasta, kuu, päev] = kp.split('-');
      return `${päev}.${kuu}.${aasta}`;
    },
    näitaSaali(seanss) {
      
      console.log(typeof seanss.saal.istekohad, seanss.saal.istekohad)
      this.$router.push({ name: 'SaalComponent', params: { saalId: seanss.saal.id, seanssId: seanss.id}});

    },
    soovitaFilme() {
    
      const userId = localStorage.getItem('userId');
      this.$router.push({ name: 'SoovitusedComponent', params: { userId: userId }});
    },
    logout() {
    
      localStorage.clear();
      this.userId = null;
      this.$router.push('/');
    
  }
    },
    mounted() {
      this.fetchSeansid();
      this.userId = localStorage.getItem("userId")
      console.log(localStorage.getItem("userId"))
      console.log("mounted");
      
    },


  
};
</script>

<style scoped>
.kava{
  background-color: rgb(18, 18, 24);
}
.pilt {
    width: 200px;  
    height: 300px; 
    object-fit: cover; 
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 5);
}
#muutuv:hover{
  background-color:   rgb(203, 203, 229);
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

