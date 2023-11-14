import axios from "axios"
import store from "@/store/index"

const HTTP = () => {
  return axios.create({
    baseURL: "http://localhost:8080/v1/pets",
    headers: {
      Authorization: `Bearer ${store.get("account/token")}`,
    },
  })
}

function updateStoreData(accInfo) {
  if (accInfo.token) {
    store.set("account/isAuthenticated", true)
    store.set("account/token", accInfo.token)
  }
  if (accInfo.id) {
    store.set("pet/id", accInfo.id)
  }
  if (accInfo.name) {
    store.set("pet/name", accInfo.name)
  }
  if (accInfo.breed) {
    store.set("pet/breed", accInfo.breed)
  }
  if (accInfo.age) {
    store.set("pet/age", accInfo.age)
  }
  if (accInfo.birth_date) {
    store.set("pet/birth_date", accInfo.birth_date)
  }
  if (accInfo.updated_at) {
    store.set("pet/updated_at", accInfo.updated_at)
  }
  if (accInfo.register_date) {
    store.set("pet/register_date", accInfo.register_date)
  }
  if (accInfo.owner_id) {
    store.set("pet/owner_id", accInfo.owner_id)
  }
  if (accInfo.owner_name) {
    store.set("pet/owner_name", accInfo.owner_name)
  }
}

const petFunctions = {
  savePet: function (payload) {
    return HTTP()
      .post("", {
        name: payload.name,
        age: parseInt(payload.age),
        breed: payload.breed,
        birth_date: payload.birth_date,
      })
      .then((res) => {
        store.set("account/isAuthenticated", true)
        updateStoreData(res.data)
      })
  },
  getPet: function (id = null) {
    if (id) {
      return HTTP().get(`/${id}`)
    } else {
      return HTTP()
        .get("/")
        .then((res) => {
          updateStoreData(res.data)
        })
    }
  },
  updatePet: function (payload, id = null) {
    if (id) {
      return HTTP().put(`/${id}`, payload)
    } else {
      return HTTP()
        .put("/", payload)
        .then((res) => {
          updateStoreData(res.data)
        })
    }
  },
  deletePet: function (id = null) {
    if (id) {
      return HTTP().delete(`/${id}`)
    } else {
      return HTTP()
        .delete("/")
        .then(() => {
          store.commit("pet/reset")
        })
    }
  },
  getPets: function () {
    return HTTP()
      .get("")
      .then((res) => {
        return res.data
      })
  },
  // initReset: function (emailAddress) {
  //   return HTTP().post(`/initiate-reset/${emailAddress}`)
  // },
  // confirmReset: function (token) {
  //   return HTTP()
  //     .post(`/confirm-reset/${token}`)
  //     .then((res) => {
  //       updateStoreData(res.data)
  //     })
  // },
  // sendEmailToSiteAdmin: function (payload) {
  //   return HTTP().post("/contact-form", payload)
  // },
  // validateAccount: function (token) {
  //   return HTTP()
  //     .post(`/confirm-account/${token}`)
  //     .then((res) => {
  //       updateStoreData(res.data)
  //     })
  // },
  // logout: function () {
  //   store.commit("account/reset")
  // },
  cleanData: function (payload) {
    let cleanedData = {
      errors: [],
    }

    if (payload.name) {
      cleanedData.name = payload.name
    }
    if (payload.age) {
      cleanedData.age = payload.age
    }
    if (payload.breed) {
      cleanedData.breed = payload.breed
    }

    if (payload.birth_date) {
      cleanedData.birth_date = payload.birth_date
    }
    if (payload.updated_at) {
      cleanedData.updated_at = payload.updated_at
    }
    if (payload.register_date) {
      cleanedData.register_date = payload.register_date
    }
    if (payload.owner_name) {
      cleanedData.owner_name = payload.owner_name
    }
    if (payload.owner_id) {
      cleanedData.owner_id = payload.owner_id
    }
    return cleanedData
  },
}

export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, "$petAPI", {
      value: petFunctions,
    })
  },
}
