<template>
  <section class="section">
    <!-- <modal
      :component="modalComp"
      :payload="selectedUser"
      @exitModal="closeModal"
    /> -->
    <div class="container has-text-centered">
      <img class="is-centered" src="/img/medical-history.png" >
    </div>
    <div class="container">
      <span class="navbar-item">
        <a class="navbar-item button nav is-dark" @click="openVisitsModal()"
        >VET VISITS</a
        >
        <a class="navbar-item button nav is-dark" @click="openVaccModal()"
        >VACCINES</a
        >
        <a class="navbar-item button nav is-dark" @click="openDewModal()"
        >DEWORMINGS</a
        >
        <a class="navbar-item button nav is-dark" @click="openSurModal()"
        >SURGERIES</a
        >
      </span>
    </div>
  </section>
</template>

<script>
import { get } from "vuex-pathify"

export default {
  name: "Medical",
  components: {},
  mixins: [],
  data() {
    return {
      modalComp: null,
      showMobileNav: false,
      selectedUser: {},
      id: null,
    }
  },
  beforeCreate() {},
  created() {
    this.id = this.$route.params.id
  },
  beforeMount() {},
  mounted() {},
  computed: {
    showNavbar: get("ui/showNavbar"),
    isLoggedIn: get("account/isAuthenticated"),
    // userRole: get("account/userRole"),
    // isAdmin: function () {
    //   return this.userRole === "ADMIN"
    // },
  },
  methods: {
    openVisitsModal() {
      this.$router.push("/pets/" + this.id + "/vetvisits")
      console.log("item:" + this.id)
      //this.selectedUser = {}
      //this.modalComp = () => import("@/components/admin-edit-pet")
    },
    openVaccModal() {
      console.log("item:" + this.id)
      this.$router.push("/pets/" + this.id + "/vaccines")
      //this.selectedUser = {}
      //this.modalComp = () => import("@/components/admin-edit-pet")
    },
    openDewModal() {
      console.log("item:" + this.id)
      this.$router.push("/pets/" + this.id + "/dewormings")
      //this.selectedUser = {}
      //this.modalComp = () => import("@/components/admin-edit-pet")
    },
    openSurModal() {
      console.log("item:" + this.id)
      this.$router.push("/pets/" + this.id + "/surgeries")
      //this.selectedUser = {}
      //this.modalComp = () => import("@/components/admin-edit-pet")
    },
    closeModal(madeChanges) {
      //this.selectedUser = {}
      this.modalComp = null
      // if (madeChanges) {
      //   this.updateLocalData()
      // }
    },
    // updateLocalData() {
    //   this.$petAPI
    //     .getPets()
    //     .then((fetchedData) => {
    //       // Object.keys(fetchedData).forEach((key) => {
    //       //   console.log(key, fetchedData[key])
    //       // })
    //       this.items = fetchedData["pets"]
    //       console.log(this.items)
    //       this.isLoading = false
    //       this.isEmpty = false
    //       this.isPaginated = this.items.length > this.perPage ? true : false
    //     })
    //     .catch(() => {
    //       this.isLoading = false
    //       this.$buefy.snackbar.open({
    //         duration: 2000,
    //         message: "An error occured. Please try again",
    //         position: "is-top",
    //         type: "is-warning",
    //       })
    //     })
    //   if (this.items.length === 0) {
    //     this.isEmpty = false
    //   } else {
    //     this.isEmpty = true
    //   }
    // },
  },
  filters: {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
}
</script>

<style lang="scss" scoped>
.nav {
  margin-top: 5px;
}
</style>
