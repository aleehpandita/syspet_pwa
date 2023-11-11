<template>
  <div class="hero-body">
    <modal
      :component="modalComp"
      :payload="selectedUser"
      @exitModal="closeModal"
    />

    <div class="container">
      <!-- <p v-if="!isEmpty">Number of pets: {{ this.items.length }}</p> -->
      <!-- <b-table :data="items" :columns="columns" /> -->
      <!-- <p v-if="!isEmpty">Number of pets: {{ this.items }}</p> -->
      <template>
        <div>
          <button
            class="button is-small is-info is-outlined"
            @click="openEditModal()"
          >
            Edit
          </button>
          <b-table
            :data="formattedTableData"
            :columns="columns"
            :mobile-cards="true"
            striped
            bordered
            narrowed
            hoverable
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pets",
  components: {},
  mixins: [],
  data() {
    return {
      items: [
        {
          id: 1,
          avatar:
            "https://robohash.org/2c4b0b21545a063589ab6024994bef98?set=set4&bgset=&size=400x400",
          age: 40,
          name: "Dickerson",
          birth_date: "2020-12-30",
          breed: "Perro",
          owner_id: 2,
          owner_name: "Ale",
          createdTime: "2022-10-10",
          modifiedTime: "2022-10-10",
        },
        {
          id: 2,
          avatar:
            "https://robohash.org/2c4b0b21545a063589ab6024994bef98?set=set4&bgset=&size=400x400",
          age: 40,
          name: "Dickerson",
          birth_date: "2020-12-30",
          breed: "Perro",
          owner_id: 2,
          owner_name: "Ale",
          createdTime: "2022-10-10",
          modifiedTime: "2022-10-10",
        },
      ],

      columns: [
        {
          field: "id",
          label: "ID",
        },
        {
          field: "avatar",
          label: "avatar",
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
        {
          field: "createdTime",
          label: "createdTime",
        },
        {
          field: "modifiedTime",
          label: "modifiedTime",
        },
        {
          field: "edit",
          label: "Edit",
        },
      ],
      accounts: [
        {
          id: 1,
          firstName: "PErro",
          emailAddress: "sasasa",
          isVerified: "Admin",
          modifiedTime: "2020-10-23",
          createdTime: "2020-10-23",
        },
      ],
      checkedRows: [],
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isCheckable: false,
      isEmpty: false,
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
      return this.items.map((item) => ({
        ...item,
        avatar: `<img src="${item.avatar}" alt="Avatar" class="avatar-img"/>`,
        edit: `<b-button class="button is-small is-info is-outlined"
              @click.stop="openSignup()""
            >
              Edit
            </b-button>`,
      }))
    },
  },
  methods: {
    openSignup() {
      this.modalComp = () => import("@/components/signup-form")
    },
    openEditModal(userData) {
      this.selectedUser = userData
      this.modalComp = () => import("@/components/admin-edit-user")
    },
    closeModal(madeChanges) {
      this.selectedUser = {}
      this.modalComp = null
      if (madeChanges) {
        //this.updateLocalData()
      }
    },
    updateLocalData() {
      // this.$petAPI
      //   .getAccounts()
      //   .then((users) => {
      //     this.isLoading = false
      //     this.isEmpty = false
      //     this.accounts = users
      //     this.isPaginated = users.length > this.perPage ? true : false
      //   })
      //   .catch(() => {
      //     this.isLoading = false
      //     this.$buefy.snackbar.open({
      //       duration: 2000,
      //       message: "An error occured. Please try again",
      //       position: "is-top",
      //       type: "is-warning",
      //     })
      //   })
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
