<template>
  <div id="app">
    <h2 class="headers">Iniciar Sessão</h2>
    <div class="container-fluid">
      <div class="grid">
        <div class="row login">
          <div class="col-md-6 offset-md-3">
            <div class="card my-5">
              <form
                class="card-body cardbody-color p-lg-5"
                @submit.prevent="handleLogin"
              >
                <div class="text-center">
                  <h5>Iniciar Sessão</h5>
                  <img
                    src="https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_1280.png"
                    alt=""
                    class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                    width="100px"
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="text"
                    id="txtUsername"
                    v-model="user.username"
                    required
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Utilizador"
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="password"
                    id="txtPassword"
                    v-model="user.password"
                    required
                    class="form-control"
                    placeholder="Password"
                  />
                </div>
                <div class="text-center">
                  <button
                    style="background-color: #0e1c36; color: #fff"
                    type="submit"
                    value="LOGIN"
                    class="btn px-5 mb-5 w-100"
                  >
                    Iniciar Sessão
                  </button>
                </div>
                <div class="form-text text-center mb-3 refs">
                  Não tem conta?
                  <router-link :to="'/register'">Crie aqui uma!</router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// To make code clear and easy to read, define User model
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}


export default {
    name: "Login",

  data() {
    return {
      user: new User("", "", ""),
      loading: false,
      message: "",
      errors: [],
    };
  },

  
  computed: {
    //check user logged in status using Vuex Store
    ...mapGetters(["getMessage", "getLoggedIn", "getLoggedUser"]),
  },

  methods: {
    //dispatch 'login' Action to Vuex Store
    async handleLogin() {
      this.loading = true;
      this.errors = [];
      if (this.user.username && this.user.password) {
        //makes request by dispatching an action
        try {
          await this.$store.dispatch("login", this.user);
          console.log(this.$store.getters.getLoggedUser.role)
          // if successfull login, navigate to pages corresponding to logged user role
          if (this.$store.getters.getLoggedUser.role == "admin")
            this.$router.push("/admin");
          else 
            this.$router.push("/user");
        } catch (error) {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        } finally {
          this.loading = false;
        }
      } else {
        this.loading = false;
        if (!this.user.username) {
          this.errors.push("Username required.");
        }
        if (!this.user.password) {
          this.errors.push("Password required.");
        }
      }
    },
  },
};

</script>

<style>
.grid {
  background: linear-gradient(
    -8deg,
    rgba(235, 242, 250, 1) 10%,
    rgba(235, 242, 250, 0.1) 90%
  );
  border-radius: 2em;
}
.container {
  padding-bottom: 30px;
}
.profile-image-pic {
  height: 200px;
  width: 200px;
}
.cardbody-color {
  background-color: #ebf2fa;
}

.refs {
  font-weight: bold;
  font-size: auto;
  color: #023047;
}
</style>
