<template>
  <div class=" ">
    <div class="container-fluid row  col-lg-12 ">
      <div class="  col-lg-6  col-md-6 col-sm-6   leftbox min-vh-100 ">
        <div class="   ">
          <img src="../assets/logo2.jpg" alt="" class="imge img-fluid rounded-circle">
          <p class="mb-3 welcome" v-if="!forgotPage"> Welcome 👋 </p>
          <p class="mb-3 welcome" v-if="forgotPage"> Forgot Password 👋 </p>

          <div class="form-group my-5 " v-if="!forgotPage">
            <label for="name">Email</label>
            <input type="text" autocomplete="false" role="presentation" class="form-control form-control-lg  mb-3 inp" id="user_name" placeholder="Example@gmail.com"
              v-model="formdata.email_id" :class="{ 'is-invalid': email_idError }" @input="clearErrorMessage" />
            <small class="text-danger">{{ email_idError }}</small>


            <label for="password">Password</label>
            <div class="password-container">
              <input :type="showpassword ? 'text' : 'password'" class="form-control mb-3 form-control-lg inp"
                id="password" placeholder="At least 8 Characters" v-model="formdata.password"
                :class="{ 'is-invalid': passwordError }" @input="clearErrorMessage"  autocomplete="false" role="presentation"/>
                <span class="eye" :class="showpassword ? 'bi-eye' : 'bi-eye-slash' " @click="togglePasswordVisibility"></span>
            </div>
            <small class="text-danger">{{ passwordError }}</small>
          </div>
          <div class="form-group my-5 " v-if="forgotPage">
            <label for="name">Email</label>
            <input type="text" autocomplete="off" class="form-control form-control-lg  mb-3 inp" id="email_id" placeholder="Example@gmail.com"
              v-model="formdata.forgot_email_id" :class="{ 'is-invalid': email_idError }" @input="clearErrorMessage" />
            <small class="text-danger">{{ email_idError }}</small>
           
          </div>
          <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>

          <div class="d-flex mb-3" v-if="!forgotPage">
          <p><a @click="forgotPage = true" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover me-auto p-2 cursor-pointer" >Forgot Password?</a></p>
          <button class="signin  ms-auto w-25 text-white" @click="gotonameoftheApplicationpage" > Sign in</button>
        </div>
        <div class="d-flex mb-3" v-if="forgotPage">
          <p><a @click="forgotPage = false" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover me-auto p-2 cursor-pointer" >Back to Login</a></p>
          <button class="signin  ms-auto w-25 text-white" @click="forgotPassword" > Submit</button>
        </div>

        </div>
      </div>

      <div class="col-lg-6  col-md-6 col-sm-6  d-flex justify-content-center align-items-center d-block d-xs-none ">
        <img src="../assets/art.png" alt="" class="img container ">
      </div>
    </div>
    <Toast/>
  </div>
</template>

<script>
import axios from "axios";
import Toast from 'primevue/toast';
export default {
  name: "login-page",
  components: {
    Toast
  },
  data() {
    return {
      apiUrl: process.env.VUE_APP_API_BASE_URL,

      formdata: {
        email_id: "",
        password: "",
      },
      email_idError: "",
      passwordError: "",
      showpassword: false,
      forgotPage: false,
      errorMessage: "",
      loading: false
    };
  },
  mounted () {
    const isAuthenticated = localStorage.getItem('loginresponse')? true:false
    if(isAuthenticated) this.$router.push('/quotation')
  },
  methods: {
    validateForm() {
      this.email_idError = this.formdata.email_id ? "" : "Name is required";
      this.passwordError = this.formdata.password
        ? this.formdata.password.length >= 8
          ? ""
          : "password must be at least 8 characters"
        : "Password  is required";

      return !this.email_idError && !this.passwordError;
    },

    gotoregister() {
      if (this.validateForm()) {
        this.gotonameoftheApplicationpage();
      }
    },
    togglePasswordVisibility() {
    this.showpassword = !this.showpassword;
  },
  async forgotPassword() {
    try {
        
        await axios.post(
          this.apiUrl + "/forgotpassword", {
            email_id: this.formdata.forgot_email_id,
          }
        ).then((response)=>{
          this.forgotPage = false
          this.$toast.add({ severity: 'success', summary: 'success', detail: "Password sent successfully!...", life: 3000 });
          setTimeout(()=>{
            this.$router.push('/')
          }, 3000)
          
        });
      }
      catch (error) {
        if (error.response && error.response.status === 401) {
          this.errorMessage = error.response.message;
        } else {
          this.errorMessage = "An error occurred. Please try again later.";
        }
      }
  },
    async gotonameoftheApplicationpage() {

      try {
        
        await axios.post(
          this.apiUrl + "/login",
          this.formdata,
        ).then((response)=>{
          localStorage.setItem('loginresponse', JSON.stringify(response.data))
          localStorage.setItem('userRole', response.data.userRole);
          localStorage.setItem('userId', response.data.user_id);
          localStorage.setItem("email_id", this.formdata.email_id);
          this.$router.push('/quotation')
        });
        
      
      }
      catch (error) {
        if (error.response && error.response.status === 401) {
          this.errorMessage = "Incorrect email or password";
        } else {
          this.errorMessage = "An error occurred. Please try again later.";
        }
      }
    },
    clearErrorMessage() {
      this.errorMessage =
        "";
    }
  },
};
</script>

<style scoped>
.leftbox {
  display: grid;
  place-content: center;
  font-family: regular;

}

.welcome {
  font-family: rounded;
  font-size: 36px;
  font-weight: 600;
}

::placeholder {
  color: #8897AD;
  font-size: 80%;


}

.inp {
  background-color: #F7FBFF;

}

.img {
  width: 90%;
  height: 90%;
}

.signin {
  background-color: #5D5FEF;
  border-radius: 10px;
  border: #4d3ce6;
  height: 40px;
  cursor: pointer;
  transition-duration: 0.4s;
}

.signin:hover {
  background-color: #5444ec;
}

.spinners {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: #375aa5;

}

.password-container {
  position: relative;
}

.eye {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}




@media (max-width: 575px) {
  .img {
    display: none;
  }

}

@media (min-width: 576px) {
  .img2 {
    display: none;
  }

}
</style>