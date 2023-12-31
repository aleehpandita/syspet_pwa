<template>
  <div>
    <div v-if="isAdmin">
      <form id="editAccForm" @submit.prevent="saveAccountChanges()">
        <h1 class="title has-text-centered">Editing user: id {{ id }}</h1>

        <p>
          <strong>Created:</strong>
          {{ created_at | fullDate }}
        </p>
        <p>
          <strong>Modified:</strong>
          {{ updated_at | fullDate }}
        </p>

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
        <!-- <b-field label="Verified">
          <div class="block">
            <b-radio v-model="isVerified" native-value="true">True</b-radio>
            <b-radio v-model="isVerified" native-value="false">False</b-radio>
          </div>
        </b-field> -->
        <div id="controlButtons">
          <button class="button is-primary">Save Changes</button>
          <!-- <button class="button is-danger is-outlined" @click.prevent="closeModal()">Discard Changes</button> -->
          <button
            class="button is-danger is-pulled-right"
            @click.prevent="deleteAccount()"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
    <div v-else>
      <h1>Not Authorized</h1>
    </div>
  </div>
</template>

<script>
import { get } from "vuex-pathify"

export default {
  name: "AdminEditUser",
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
      id: null,
      name: null,
      last_name: null,
      email: null,
      phoneNumber: null,
      // isVerified: false,
      // UUID: null,
      // userRole: null,
      created_at: null,
      updated_at: null,
    }
  },
  beforeCreate() {},
  created() {
    this.id = this.payload.id
    this.name = this.payload.name
    this.last_name = this.payload.last_name
    this.email = this.payload.email
    // this.phoneNumber = this.payload.phoneNumber
    // this.isVerified = this.payload.isVerified
    // this.userRole = this.payload.userRole
    this.created_at = this.payload.created_at
    this.updated_at = this.payload.updated_at
  },
  beforeMount() {},
  mounted() {},
  computed: {
    loggedInUserRole: get("account/userRole"),
    isAdmin: function () {
      return this.loggedInUserRole === "ADMIN"
    },
  },
  methods: {
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

      let cleanData = this.$accountAPI.cleanData(changedData)
      this.$accountAPI
        .updateAccount(cleanData, this.id)
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

      if (this.payload.name !== this.name) {
        fields.name = this.name
      }

      if (this.payload.last_name !== this.last_name) {
        fields.last_name = this.last_name
      }

      if (this.payload.email !== this.email) {
        fields.email = this.email
      }

      if (this.payload.phoneNumber !== this.phoneNumber) {
        fields.phoneNumber = this.phoneNumber
      }

      if (this.payload.isVerified !== this.isVerified) {
        fields.isVerified = this.isVerified
      }

      if (this.payload.userRole !== this.userRole) {
        fields.userRole = this.userRole
      }

      return fields
    },
    deleteAccount: function () {
      this.$buefy.dialog.confirm({
        title: "Deleting account",
        message:
          "Are you sure you want to <strong>delete</strong> this account? This cannot be undone.",
        confirmText: "Delete Account",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.$accountAPI
            .deleteAccount(this.id)
            .then(() => {
              if (this.id === this.$store.get("account/id")) {
                this.$accountAPI.logout()
                this.$router.push("/")
              }
              this.$buefy.toast.open({
                duration: 2000,
                message: "Account deleted",
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
  width: 50vw;
  line-height: 2;

  button {
    margin-left: 5px;
    margin-right: 5px;
  }
}

#controlButtons {
  margin-top: 40px;
}
</style>
