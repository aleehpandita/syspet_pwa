<template>
  <div>
    <h1 class="title has-text-centered">Login</h1>
    <form id="loginform" @submit.prevent="login">
      <b-field label="Email">
        <FormulateInput
          v-model="email"
          type="email"
          name="email"
          validation="required|email"
          placeholder="first_last@example.com"
        />
      </b-field>

      <b-field label="Password">
        <FormulateInput
          v-model="password"
          type="password"
          name="password"
          placeholder="••••••••••"
          validation="required|min:6,length"
          validation-name="Password"
        />
      </b-field>

      <p v-for="err in errors" :key="err" class="error">{{ err }}</p>

      <p class="control">
        <button id="submitbutton" class="button is-primary">Login</button>
      </p>
    </form>
    <router-link to="/signup" @click.native="closeModal()"
    >Create new account</router-link
    >
    <br >
    <router-link to="/reset" @click.native="closeModal()"
    >Forget your password?</router-link
    >
  </div>
</template>

<script>
export default {
  name: "Loginform",
  components: {},
  // props: [],
  mixins: [],
  data() {
    return {
      email: null,
      password: null,
      errors: [],
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  computed: {},
  methods: {
    login() {
      const cleanData = this.$accountAPI.cleanData({
        email: this.email,
        password: this.password,
      })

      if (cleanData.errors.length >= 1) {
        this.errors = cleanData.errors
        return
      }
      this.errors = []
      this.$accountAPI
        .login(cleanData)
        .then(() => {
          this.$buefy.toast.open({
            duration: 2000,
            message: "Login Successful",
            position: "is-top",
            type: "is-success",
          })
          this.$emit("exitModal", cleanData)

          if (this.$router.currentRoute.path === "/login") {
            this.$router.push("/")
          }
        })
        .catch(() => {
          this.errors = ["Incorrect email or password"]
        })
    },
    clearVals() {
      this.emailErr = null
      this.passErr = null
      this.errors = []
    },
    closeModal() {
      this.$emit("exitModal")
    },
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    this.clearVals()
  },
}
</script>

<style lang="scss" scoped>
#loginform {
  max-width: 400px;
}

#submitbutton {
  margin-top: 9px;
  margin-bottom: 9px;
}

.error {
  color: red;
  font-size: 0.8em;
}
</style>
