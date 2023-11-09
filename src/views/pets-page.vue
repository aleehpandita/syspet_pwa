<template>
  <div class="hero-body">
    <modal
      :component="modalComp"
      :payload="selectedUser"
      @exitModal="closeModal"
    />

    <div class="container">
      <p v-if="!isEmpty">Number of pets: {{ this.items.length }}</p>
      <b-table :data="items" :columns="columns" />
      <!-- <p v-if="!isEmpty">Number of pets: {{ this.items }}</p> -->
      <!-- <b-table
        :data="items"
        :bordered="isBordered"
        :striped="isStriped"
        :narrowed="isNarrowed"
        :checkable="isCheckable"
        :loading="isLoading"
        :mobile-cards="hasMobileCards"
        :paginated="isPaginated"
        :per-page="perPage"
        :pagination-simple="isPaginationSimple"
        :detailed="isDetailed"
        :checked-rows.sync="checkedRows"
      >
        <template slot-scope="props">
          <b-table-column field="id" label="ID" width="40" sortable numeric>
            {{ props.id }}
          </b-table-column>

          <b-table-column field="name" label="Name" sortable>
            {{ props.name }}
          </b-table-column>

          <b-table-column field="age" label="Age" sortable>
            {{ props.age }}
          </b-table-column>

          <b-table-column field="breed" label="Breed" sortable>
            {{ props.breed }}
          </b-table-column>

          <b-table-column
            field="modifiedTime"
            label="Modified Date"
            sortable
            centered
          >
            <span class="tag is-info">
              {{ props.modifiedTime | localDate }}
            </span>
          </b-table-column>

          <b-table-column
            field="createdTime"
            label="Created Date"
            sortable
            centered
          >
            <span class="tag is-info">
              {{ props.createdTime | localDate }}
            </span>
          </b-table-column>

          <b-table-column>
            <button
              class="button is-small is-info is-outlined"
              @click="openEditModal(props.row)"
            >
              Edit
            </button>
          </b-table-column>
        </template>

        <div slot="empty" class="has-text-centered">Loading Accounts</div>
      </b-table> -->
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
      columns: [
        {
          field: "id",
          label: "ID",
          width: "40",
          numeric: true,
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
      ],
      items: [
        {
          id: 1,
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
  computed: {},
  methods: {
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
