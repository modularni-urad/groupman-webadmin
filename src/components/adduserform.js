/* global Vue, axios, API, _, moment */
import { STATUS_LABELS } from './consts.js'
import template from './adduserform.html.js'

export default {
  data: () => {
    return {
      available: [],
      members: []
    }
  },
  computed: {
    statusOpts: () => _.map(STATUS_LABELS, (v, k) => ({ value: k, text: v })),
    disabled: function () {
      return !this.$store.getters.isMember('group_admin')
    }
  },
  created () {
    axios.get(`${API}/userman/?attrs=id,name`)
      .then(res => {
        this.available = res.data
        return axios.get(`${API}/groupman/mship/${this.$props.item.id}`)
      })
      .then(res => {
        res.data.map(i => {
          const item = _.find(this.available, {id: i})
          this.members.push(item)
          this.available.splice(_.indexOf(item))
        })
      })
    if (this.$props.item) {
      Object.assign(this.$data, this.$props.item)
    }
  },
  props: ['item'],
  methods: {
    save (adding, id) {
      const promise = adding
        ? axios.post(`${API}/groupman/mship/${this.$props.item.id}/${id}`)
        : axios.delete(`${API}/groupman/mship/${this.$props.item.id}/${id}`)
      return promise
      .then(res => {
        this.$store.dispatch('toast', { message: 'uloženo' })
      })
      .catch(err => {
        const message = err.response.data
        this.$store.dispatch('toast', { message, type: 'error' })
      })
    },
    removeMember (id) {
      this.save(false, id).then(res => {
        const item = _.find(this.members, {id})
        this.available.push(item)
        this.members.splice(_.indexOf(item))
      })
    },
    addMember (id) {
      this.save(true, id).then(res => {
        const item = _.find(this.available, {id})
        this.members.push(item)
        this.available.splice(_.indexOf(item))
      })
    }
  },
  template
}
