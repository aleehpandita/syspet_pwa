import axios from "axios"
import store from "@/store/index"

const HTTP = () => {
  return axios.create({
    baseURL: "http://localhost:8080/v1/users/",
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
    store.set("account/id", accInfo.id)
  }
  if (accInfo.name) {
    store.set("account/name", accInfo.name)
  }
  if (accInfo.last_name) {
    store.set("account/last_name", accInfo.last_name)
  }
  if (accInfo.email) {
    store.set("account/email", accInfo.email)
  }
  if (accInfo.created_at) {
    store.set("account/created_at", accInfo.created_at)
  }
  if (accInfo.updated_at) {
    store.set("account/updated_at", accInfo.updated_at)
  }
}

const accFunctions = {
  login: function (payload) {
    return HTTP()
      .post("/login", {
        email: payload.email,
        password: payload.password,
      })
      .then((res) => {
        store.set("account/isAuthenticated", true)
        store.set("account/token", res.data.token)
        updateStoreData(res.data)
      })
  },
  signup: function (payload) {
    return HTTP()
      .post("/signup", {
        email: payload.email,
        password: payload.password,
        name: payload.name,
        last_name: payload.last_name,
      })
      .then((res) => {
        store.set("account/isAuthenticated", true)
        store.set("account/isAuthenticated", res.data.token)
        updateStoreData(res.data)
      })
  },
  getAccount: function (id = null) {
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
  updateAccount: function (payload, id = null) {
    if (id) {
      return HTTP()
        .put(`/${id}`, payload)
        .then((res) => {
          updateStoreData(res.data)
        })
    } else {
      return HTTP()
        .put("/", payload)
        .then((res) => {
          updateStoreData(res.data)
        })
    }
  },
  deleteAccount: function (id = null) {
    if (id) {
      return HTTP()
        .delete(`/${id}`)
        .then(() => {
          store.commit("account/reset")
        })
    } else {
      return HTTP()
        .delete("/")
        .then(() => {
          store.commit("account/reset")
        })
    }
  },
  getAccounts: function () {
    return HTTP()
      .get("/")
      .then((res) => {
        return res.data
      })
  },
  initReset: function (email) {
    return HTTP().post(`/initiate-reset/${email}`)
  },
  confirmReset: function (token) {
    return HTTP()
      .post(`/confirm-reset/${token}`)
      .then((res) => {
        updateStoreData(res.data)
      })
  },
  sendEmailToSiteAdmin: function (payload) {
    return HTTP().post("/contact-form", payload)
  },
  validateAccount: function (token) {
    return HTTP()
      .post(`/confirm-account/${token}`)
      .then((res) => {
        updateStoreData(res.data)
      })
  },
  logout: function () {
    store.commit("account/reset")
  },
  cleanData: function (payload) {
    let cleanedData = {
      errors: [],
    }

    if (payload.name) {
      cleanedData.name = payload.name
    }
    if (payload.last_name) {
      cleanedData.last_name = payload.last_name
    }
    if (payload.email) {
      cleanedData.email = payload.email
    }
    if (payload.token) {
      cleanedData.token = payload.token
    }
    if (payload.password) {
      if (payload.password.length < 6) {
        payload.errors.push("Password does not meet length requirements")
      } else {
        cleanedData.password = payload.password
      }
    }

    return cleanedData
  },
}

export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, "$accountAPI", {
      value: accFunctions,
    })
  },
}
