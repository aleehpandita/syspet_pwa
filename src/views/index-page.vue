<template>
  <section class="section">
    <modal :component="modalComp" @exitModal="closeModal" />
    <div class="container">
      <img
        class="is-centered"
        :src="require('@/assets/syspet.png')"
        alt="Logo"
      >
    </div>
    <div class="container">
      <span v-if="!isLoggedIn" class="navbar-item">
        <a class="navbar-item button accNav is-info" @click="openSignup()"
        >Sign Up</a
        ><br >
        <a class="navbar-item button accNav" @click="openLogin()">Log In</a>
      </span>
    </div>
  </section>
</template>

<script>
import { get } from "vuex-pathify"

export default {
  name: "Index",
  components: {},
  mixins: [],
  data() {
    return {
      modalComp: null,
      showMobileNav: false,
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  computed: {
    showNavbar: get("ui/showNavbar"),
    isLoggedIn: get("account/isAuthenticated"),
    userRole: get("account/userRole"),
    isAdmin: function () {
      return this.userRole === "ADMIN"
    },
  },
  methods: {
    closeModal() {
      this.modalComp = null
    },
    openSignup() {
      this.modalComp = () => import("@/components/signup-form")
    },
    openLogin() {
      this.modalComp = () => import("@/components/login-form")
    },
    logout() {
      this.$accountAPI.logout()
      this.$buefy.toast.open({
        duration: 1000,
        message: "Signed Out",
        position: "is-top",
        type: "is-dark",
      })
      this.$router.push("/")
    },
    toggleMobileNav() {
      this.showMobileNav = !this.showMobileNav
    },
  },
  filters: {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
}
</script>

<style lang="scss" scoped></style>
