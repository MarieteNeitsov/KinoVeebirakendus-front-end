
  <template>
    <div v-if="msg">{{msg}} </div>
    <div v-for="(seanss, index) in soovitused.seansid" :key="seanss.id" @click="näitaSaali(seanss)">
      
      <div id="muutuv" class="seanss">
        <img class="pilt" :src="seanss.film.pilt"/>
        <div class='kirjeldus'>
            <h2 class="pealkiri"> {{ seanss.film.pealkiri }} </h2>
          <h3>kuupäev: {{ seanss.kuupäev }} </h3>
          <h3> algusaeg: {{ seanss.algusAeg }} </h3>
          <p> žanr: {{ seanss.film.zanr }} </p>
          <p> vanusepiirang: {{ seanss.film.vanusepiirang }} </p>
          <p> kestus: {{ seanss.film.kestus }} </p>
          <p> keel: {{ seanss.keel }} </p>
          <h3>sobimise tõenäosus: {{ soovitused.skoorid[index] }}</h3>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        soovitused: {},
        msg: ''

      };
    },
    methods: {
      fetchSoovitused() {
        const userId = localStorage.getItem('userId');
        fetch(`http://localhost:8080/soovitused?kasutajaId=${userId}`)
          .then((response) => response.json())
          .then((data) => {
            if(data.seansid.length==0 || data.skoorid.length==0){
                this.msg="Külastuste ajalugu pole"
            }
            this.soovitused = data;
          })
          .catch((err) => console.log(err.message));
      },
      näitaSaali(seanss) {
      
        console.log(typeof seanss.saal.istekohad, seanss.saal.istekohad)
        this.$router.push({ name: 'SaalComponent', params: { saalId: seanss.saal.id, seanssId: seanss.id}});

    },
    },
    mounted() {
      this.fetchSoovitused();
      console.log("monted soovitused")
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

h1 {
  font-size: 20px;
  color: whitesmoke;
  padding: 50px;
}

  
  </style>