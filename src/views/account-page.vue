<template>
  <div>
    <h1 class="title">My Account</h1>
    <form id="updateAccForm" @submit.prevent="updateAcc()">
      <b-field label="First Name">
        <FormulateInput
          v-model="name"
          type="text"
          name="name"
          placeholder="Joe"
        />
      </b-field>

      <b-field label="Last Name">
        <FormulateInput
          v-model="last_name"
          type="text"
          name="last_name"
          placeholder="Bandito"
        />
      </b-field>

      <b-field label="Email">
        <FormulateInput
          v-model="email"
          type="email"
          name="email"
          validation="email"
          placeholder="first_last@example.com"
        />
      </b-field>
      <b-field label="Change Password">
        <FormulateInput
          v-model="password1"
          type="password"
          name="password"
          placeholder="••••••••••"
          validation="min:6,length"
          validation-name="Password"
        />
      </b-field>

      <b-field v-if="password1" label="Confirm Password">
        <FormulateInput
          v-model="password2"
          type="password"
          name="password"
          placeholder="••••••••••"
          validation="min:6,length"
          validation-name="Password"
        />
      </b-field>

      <p v-if="!passesMatch && password1.length >= 1" id="passMatchErr">
        Both passwords must match
      </p>

      <p class="control">
        <button class="button is-primary">Save Changes</button>

        <button
          class="button is-danger is-outlined"
          @click.prevent="deleteAcc()"
        >
          Delete Account
        </button>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "Account",
  components: {},
  mixins: [],
  data() {
    return {
      id: null,
      name: null,
      last_name: null,
      email: null,
      password1: null,
      password2: null,
      errors: [],
    }
  },
  beforeCreate() {},
  created() {
    this.setLocalData()
  },
  beforeMount() {},
  mounted() {
    this.id = this.$store.get("account/id")
    this.$accountAPI
      .getAccount(this.id)
      .then(() => {
        this.setLocalData()
      })
      .catch(() => {
        console.log("failed to retrieve latest account info")
      })
  },
  computed: {
    passesMatch: function () {
      return this.password1 === this.password2
    },
  },
  methods: {
    setLocalData: function () {
      this.name = this.$store.get("account/name")
      this.last_name = this.$store.get("account/last_name")
      this.email = this.$store.get("account/email")
      this.id = this.$store.get("account/id")
    },
    updateAcc: function () {
      if (this.password1 && this.password1 !== this.password2) {
        this.errors = ["passwords must match."]
        return
      }

      let changedData = this.changedFields()
      if (Object.values(changedData).length < 1) {
        this.$buefy.toast.open({
          duration: 2000,
          message: "No changes to save",
          position: "is-top",
          type: "is-info",
        })
        return
      }

      let cleanData = this.$accountAPI.cleanData(changedData)

      if (cleanData.errors.length >= 1) {
        this.errors = cleanData.errors
        return
      }
      this.$accountAPI
        .updateAccount(cleanData, this.id)
        .then(() => {
          this.setLocalData()
          this.$buefy.toast.open({
            duration: 2000,
            message: "Changes Saved",
            position: "is-top",
            type: "is-success",
          })
        })
        .catch(() => {
          this.$buefy.toast.open({
            duration: 2000,
            message: "An error occured, changes not saved",
            position: "is-top",
            type: "is-danger",
          })
        })
    },
    changedFields: function () {
      let fields = {}

      if (this.$store.get("account/name") !== this.name) {
        fields.name = this.name
      }

      if (this.$store.get("account/last_name") !== this.last_name) {
        fields.last_name = this.last_name
      }

      if (this.$store.get("account/email") !== this.email) {
        fields.email = this.email
      }

      // if (this.$store.get("account/phoneNumber") !== this.phoneNumber) {
      //   fields.phoneNumber = this.phoneNumber
      // }

      if (this.password1 && this.password1 === this.password2) {
        fields.password = this.password1
      }

      return fields
    },
    deleteAcc: function () {
      this.$buefy.dialog.confirm({
        title: "Deleting account",
        message:
          "Are you sure you want to <strong>delete</strong> your account? This cannot be undone.",
        confirmText: "Delete Account",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.$accountAPI.deleteAccount(this.id)
          this.logout()
          this.$buefy.toast.open("Account deleted.")
        },
      })
    },
    clearLocal: function () {
      this.name = null
      this.last_name = null
      this.email = null
      this.password1 = null
      this.password2 = null
      this.errors = []
    },
    logout: function () {
      this.$accountAPI.logout()
      this.clearLocal()
      this.$router.push("/")
    },
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    this.clearLocal()
  },
}
</script>

<style lang="scss" scoped>
.title {
  margin: 25px;
  margin-top: 5vh;
  margin-bottom: 5vh;
}

#passMatchErr {
  color: red;
  margin-bottom: 15px;
}

.is-danger {
  margin-left: 20px;
}

#updateAccForm {
  margin: 25px;
  max-width: 350px;
}
</style>
