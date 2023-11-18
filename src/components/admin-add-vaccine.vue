<template>
  <div>
    <div v-if="isAdmin">
      <form id="editAccForm" @submit.prevent="saveAccountChanges()">
        <div class="has-text-centered"><img src="/img/vaccines.png" ></div>
        <b-field label="Type">
          <FormulateInput
            v-model="type"
            type="text"
            name="type"
            placeholder="Type"
          />
        </b-field>

        <b-field label="Vet Name">
          <FormulateInput
            v-model="vet_name"
            type="text"
            name="vet_name"
            placeholder="Vet Name"
          />
        </b-field>

        <b-field label="Address">
          <FormulateInput
            v-model="address"
            type="text"
            name="address"
            placeholder="Address"
          />
        </b-field>

        <b-field label="Date">
          <FormulateInput v-model="date" type="date" name="date" />
        </b-field>
        <b-field label="Next Date">
          <FormulateInput v-model="next_date" type="date" name="next_date" />
        </b-field>
        <div id="controlButtons">
          <button class="button is-primary is-fullwidth">Save Changes</button>
        </div>
      </form>
    </div>
    <div v-else>
      <h1>Not Authorized</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddVaccine",
  components: {},
  props: {
    payload: {
      type: Object,
      default: null,
    },
  },
  mixins: [],
  data() {
    return {
      isAdmin: true,
      id: null,
      type: null,
      address: null,
      vet_name: null,
      date: null,
      next_date: null,
    }
  },
  beforeCreate() {},
  created() {
    this.id = this.$route.params.id
  },
  // created() {
  //   this.id = this.payload.id
  //   this.name = this.payload.name
  //   this.age = this.payload.age
  //   this.breed = this.payload.breed
  //   this.birth_date = this.payload.birth_date
  // },
  beforeMount() {},
  mounted() {},
  computed: {},
  methods: {
    AddMedicalRecord() {
      this.$router.push("/pets/" + this.id)
      console.log("item id: " + this.id)
    },
    saveAccountChanges() {
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

      let cleanData = this.$petAPI.cleanData(changedData)
      this.$petAPI
        .saveVaccinesPet(cleanData, this.id)
        .then(() => {
          this.$buefy.toast.open({
            duration: 2000,
            message: "Changes saved",
            position: "is-top",
            type: "is-success",
          })
          this.closeModal(true)
        })
        .catch(() => {
          this.$buefy.snackbar.open({
            duration: 2000,
            message: "An error occured. Please try again",
            position: "is-top",
            type: "is-warning",
          })
        })
    },
    changedFields: function () {
      let fields = {}
      fields.id = this.id

      if (this.payload.name !== this.name) {
        fields.name = this.name
      }

      if (this.payload.age !== this.age) {
        fields.age = this.age
      }

      if (this.payload.breed !== this.breed) {
        fields.breed = this.breed
      }

      if (this.payload.birth_date !== this.birth_date) {
        fields.birth_date = this.birth_date
      }

      return fields
    },
    deletePet: function () {
      this.$buefy.dialog.confirm({
        title: "Deleting pet",
        message:
          "Are you sure you want to <strong>delete</strong> this pet? This cannot be undone.",
        confirmText: "Delete pet",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.$petAPI
            .deletePet(this.id)
            .then(() => {
              if (this.id === this.$store.get("pet/id")) {
                this.$petAPI.logout()
                this.$router.push("/")
              }
              this.$buefy.toast.open({
                duration: 2000,
                message: "Pet deleted",
                position: "is-top",
                type: "is-info",
              })
              this.closeModal(true)
            })
            .catch(() => {
              this.$buefy.snackbar.open({
                duration: 2000,
                message: "An error occured. Please try again",
                position: "is-top",
                type: "is-warning",
              })
            })
        },
      })
    },
    closeModal(updateUserList) {
      this.$emit("exitModal", updateUserList)
    },
  },
  filters: {
    fullDate: function (date) {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }
      return new Date(date).toLocaleDateString(undefined, options)
    },
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
}
</script>

<style lang="scss" scoped>
#editAccForm {
  width: 65vw;
  line-height: 1;

  // button {
  //   margin-left: 5px;
  //   margin-right: 5px;
  // }
}

#controlButtons {
  margin-top: 5px;
}
</style>
