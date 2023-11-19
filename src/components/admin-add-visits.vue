<template>
  <div>
    <div v-if="isAdmin">
      <form id="editAccForm" @submit.prevent="saveAccountChanges()">
        <div class="has-text-centered"><img src="/img/vet.png" ></div>
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
        <b-field label="Reason">
          <FormulateInput
            v-model="reason"
            type="text"
            name="reason"
            placeholder="reason"
          />
        </b-field>
        <b-field label="Comments">
          <FormulateInput
            v-model="comments"
            type="text"
            name="comments"
            placeholder="Comments"
          />
        </b-field>
        <b-field label="Date">
          <FormulateInput v-model="date" type="date" name="date" />
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
  name: "AddVisits",
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
      address: null,
      vet_name: null,
      reason: null,
      comments: null,
      date: null,
    }
  },
  beforeCreate() {},
  created() {
    this.id = this.$route.params.id
  },
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
        .saveVetVisitsPet(cleanData)
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

      if (this.payload.address !== this.address) {
        fields.address = this.address
      }

      if (this.payload.vet_name !== this.vet_name) {
        fields.vet_name = this.vet_name
      }

      if (this.payload.reason !== this.reason) {
        fields.reason = this.reason
      }

      if (this.payload.comments !== this.comments) {
        fields.comments = this.comments
      }
      if (this.payload.date !== this.date) {
        fields.date = this.date
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
