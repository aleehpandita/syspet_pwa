<template>
  <div>
    <h1 class="title">Add Pet</h1>
    <form id="updateAccForm" @submit.prevent="updateAcc()">
      <b-field label="First Name">
        <FormulateInput
          v-model="name"
          type="text"
          name="name"
          placeholder="Lilo"
        />
      </b-field>

      <b-field label="Age">
        <FormulateInput
          v-model="age"
          name="age"
          validation="required|number|max:120"
        />
      </b-field>

      <b-field label="Birthday">
        <FormulateInput
          v-model="birth_date"
          type="date"
          name="birth_date"
          validation="required|after:1990-01-01"
          min="1990-12-01"
          max="2024-01-01"
        />
      </b-field>
      <b-field label="Type">
        <FormulateInput
          v-model="breed"
          type="text"
          name="breed"
          placeholder="Perro"
        />
      </b-field>

      <p class="control">
        <button class="button is-primary">Save Changes</button>

        <!-- <button
          class="button is-danger is-outlined"
          @click.prevent="deleteAcc()"
        >
          Delete Account
        </button> -->
      </p>
    </form>
  </div>
</template>

<script>
/*
        age:
          type: integer
        birth_date:
          type: string
        breed:
          type: string
        id:
          type: integer
        name:
          type: string
        owner_id:
          type: integer
        owner_name:
          type: string
*/
export default {
  name: "AddPet",
  components: {},
  mixins: [],
  data() {
    return {
      options: [
        {
          value: "1",
          label: "Mexico",
        },
        {
          value: "2",
          label: "Thailand",
        },
        {
          value: "3",
          label: "Burundi",
        },
      ],
      name: null,
      age: null,
      birth_date: null,
      breed: null,
      owner_id: null,
      owner_name: null,
      errors: [],
    }
  },
  beforeCreate() {},
  created() {
    this.setLocalData()
  },
  beforeMount() {},
  mounted() {
    // this.$accountAPI
    //   .getAccount()
    //   .then(() => {
    //     this.setLocalData()
    //   })
    //   .catch(() => {
    //     console.log("failed to retrieve latest account info")
    //   })
  },
  computed: {
    // passesMatch: function () {
    //   return this.password1 === this.password2
    // },
  },
  methods: {
    setLocalData: function () {
      // this.name = this.$store.get("pet/name")
      // this.age = this.$store.get("pet/age")
      // this.birth_date = this.$store.get("pet/birth_date")
      // this.breed = this.$store.get("pet/breed")
      // this.owner_id = this.$store.get("pet/owner_id")
      // this.owner_name = this.$store.get("pet/owner_name")
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
        .updateAccount(cleanData)
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

      if (this.$store.get("account/firstName") !== this.firstName) {
        fields.firstName = this.firstName
      }

      if (this.$store.get("account/lastName") !== this.lastName) {
        fields.lastName = this.lastName
      }

      if (this.$store.get("account/emailAddress") !== this.emailAddress) {
        fields.emailAddress = this.emailAddress
      }

      if (this.$store.get("account/phoneNumber") !== this.phoneNumber) {
        fields.phoneNumber = this.phoneNumber
      }

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
          this.$accountAPI.deleteAccount()
          this.logout()
          this.$buefy.toast.open("Account deleted.")
        },
      })
    },
    clearLocal: function () {
      this.firstName = null
      this.lastName = null
      this.emailAddress = null
      this.phoneNumber = null
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
  margin-bottom: 1vh;
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
