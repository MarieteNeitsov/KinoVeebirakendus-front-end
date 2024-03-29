<template>
    <div class="form">
      <h3>Registreeri kasutajaks</h3>
      <label for="email">Email</label>
      <input type="email" name="email" required v-model="email">
      <label for="password">Parool</label>
      <input type="password" name="password" required v-model="parool">
      <div v-if="errMsg">{{errMsg}} </div>
      <button @click="SignUp" class="SignUp">SignUp</button>
    </div>
  </template>
  
  <script>
  export default {
  name: "SignUpView", 
  data: function() {
      return {
     email: '',
     parool: '',
     errMsg: '',
    }
    },
  
    methods: {
        SignUp() {
          if (!this.email || !this.parool) {
            this.errMsg = 'Täida kõik lahtrid!';
            return;
          }
        var data = {
          email: this.email,
          parool: this.parool
        };
        fetch("http://localhost:8080/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
            credentials: 'include', 
            body: JSON.stringify(data),
        }).then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.error);
          });
        }
        return response.json();
        }).
      then((data) => {
          console.log(data);
          
          localStorage.setItem('jwt', data.jwt);
          localStorage.setItem('userId', data.userId);

          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
          console.log("error");
          this.errMsg=e.message;
          
        });
      },
    }, 
    }
  </script>
  
  <style scoped>
  .form {
    width: 400px;
    margin: auto;
    
    background: rgb(173, 170, 186);
    text-align: left;
    padding: 40px;
    border-radius: 10px;
  }
  h3 {
    text-align: center;
    
  }
  label {
    display: inline-block;
    margin: 25px 0 15px;
    font-weight: bold;
  }
  input {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    
    
  }
  button {
    background-color: rgb(18, 18, 24);
    
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
    
    text-align: center;
  }
  button:hover{
    background-color: rgb(63, 63, 82);
  }
  div {
    padding: 10px 20px;
    margin-top: 20px;
  }
  </style>