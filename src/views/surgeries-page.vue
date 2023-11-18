<template>
  <div class="top">
    <modal
      :component="modalComp"
      :payload="selectedUser"
      @exitModal="closeModal"
    />

    <div class="container">
      <span v-if="this.items.length > 0">
        <div class="has-text-centered top">
          <img src="/img/surgery.png" >
          <h1 class="title">Surgeries</h1>
          <button
            class="button is-primary is-fullwidth"
            @click="openEditModal()"
          >
            Add Surgeries
          </button>
        </div>
        Number of pets: {{ this.items.length }}
      </span>
      <span v-if="this.items.length === 0">
        <h1 class="title">No pets registered</h1>
      </span>
      <!-- <b-table :data="items" :columns="columns" /> -->
      <!-- <p v-if="!isEmpty">Number of pets: {{ this.items }}</p> -->
      <template>
        <div>
          <b-table
            :data="formattedTableData"
            :columns="columns"
            :mobile-cards="true"
            striped
            bordered
            narrowed
            hoverable
            @click="openEditModal"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Surgeries",
  mixins: [],
  data() {
    return {
      items: [],
      columns: [
        {
          field: "id",
          label: "ID",
        },
        // {
        //   field: "avatar",
        //   label: "avatar",
        // },
        {
          field: "name",
          label: "name",
        },
        {
          field: "age",
          label: "Age",
        },
        {
          field: "breed",
          label: "Breed",
        },
        {
          field: "birth_date",
          label: "BirthDay",
          centered: true,
        },
        {
          field: "owner_name",
          label: "Owner Name",
        },
      ],
      checkedRows: [],
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isCheckable: false,
      isEmpty: true,
      isLoading: true,
      isDetailed: false,
      hasMobileCards: false,
      isPaginated: false,
      isPaginationSimple: false,
      perPage: 20,
      modalComp: null,
      selectedUser: {},
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {
    this.updateLocalData()
  },
  mounted() {},
  computed: {
    formattedTableData() {
      // Object.keys(fetchedData).forEach((key) => {
      //   console.log(key, fetchedData[key])
      //   this.items
      // })
      return this.items.map((item) => ({
        ...item,
        //avatar: `<img src="${item.avatar}" alt="Avatar" class="avatar-img"/>`,
        edit: `<b-button class="button is-small is-info is-outlined custom-button" data-id="${item.id}"
              @click.stop="openEditModal(${item})"
            >
              Edit
            </b-button>`,
      }))
    },
  },
  methods: {
    openEditModal(userData) {
      console.log("item:" + userData.id)
      this.selectedUser = userData
      this.modalComp = () => import("@/components/admin-edit-pet")
    },
    closeModal(madeChanges) {
      this.selectedUser = {}
      this.modalComp = null
      if (madeChanges) {
        this.updateLocalData()
      }
    },
    updateLocalData() {
      this.$petAPI
        .getPets()
        .then((fetchedData) => {
          // Object.keys(fetchedData).forEach((key) => {
          //   console.log(key, fetchedData[key])
          // })
          this.items = fetchedData["pets"]
          console.log(this.items)
          this.isLoading = false
          this.isEmpty = false
          this.isPaginated = this.items.length > this.perPage ? true : false
        })
        .catch(() => {
          this.isLoading = false
          this.$buefy.snackbar.open({
            duration: 2000,
            message: "An error occured. Please try again",
            position: "is-top",
            type: "is-warning",
          })
        })
      if (this.items.length === 0) {
        this.isEmpty = false
      } else {
        this.isEmpty = true
      }
    },
  },
  filters: {
    localDate: function (date) {
      return new Date(date).toLocaleDateString()
    },
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    this.selectedUser = {}
    this.modalComp = null
  },
}
</script>

<style lang="scss" scoped>
.top {
  margin-top: 4.5px;
}
.title {
  margin-top: 2px;
  margin-bottom: 1vh;
  color: $blue;
}

#editAccForm {
  display: flex;
  flex-direction: row;
  input {
    max-width: 200px;
    margin-right: 10px;
  }
}

button {
  display: inline;
}
</style>
<style>
.avatar-cell {
  display: flex;
  align-items: center;
}

.avatar-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px; /* Adjust the margin as needed */
}
</style>
