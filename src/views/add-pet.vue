<template>
  <div>
    <div class="has-text-centered top">
      <img src="/img/pets.png" >
      <h1 class="title">Add Pet</h1>
    </div>
    <form id="updateAccForm" @submit.prevent="updatePet()">
      <b-field label="Pet's Name">
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
        <button class="button is-primary is-fullwidth">Save Changes</button>

        <!-- <button
          class="button is-danger is-outlined"
          @click.prevent="deletePet()"
        >
          Delete Account
        </button> -->
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddPet",
  components: {},
  mixins: [],
  data() {
    return {
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
  created() {},
  beforeMount() {},
  mounted() {},
  computed: {},
  methods: {
    updatePet() {
      const cleanData = this.$petAPI.cleanData({
        name: this.name,
        age: parseInt(this.age),
        birth_date: this.birth_date,
        breed: this.breed,
        owner_id: this.owner_id,
        owner_name: this.owner_name,
      })

      if (cleanData.errors.length >= 1) {
        this.errors = cleanData.errors
        return
      }

      this.errors = []
      this.$petAPI
        .savePet(cleanData)
        .then(() => {
          this.$buefy.toast.open({
            duration: 2000,
            message: "Pet Saved",
            position: "is-top",
            type: "is-success",
          })
          if (this.$router.currentRoute.path === "/add-pet") {
            this.$router.push("/pets")
          }
        })
        .catch((error) => {
          console.log(error)
          this.errors = ["An error occured, pet not saved"]
        })
    },
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    this.errors = []
  },
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 1vh;
  color: $blue;
}

#passMatchErr {
  color: red;
  margin-bottom: 15px;
}

.is-danger {
  margin-left: 20px;
}

#updateAccForm {
  margin: 10px 25px;
  max-width: 350px;
}
.top {
  margin-top: 10px;
}
</style>
