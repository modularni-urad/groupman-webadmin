/* global Vue, axios, API, _, moment */
import { STATUS_LABELS } from './consts.js'
import template from './form.html.js'

export default {
  data: () => {
    return {
      name: '',
      slug: ''
    }
  },
  computed: {
    statusOpts: () => _.map(STATUS_LABELS, (v, k) => ({ value: k, text: v })),
    disabled: function () {
      return !this.$store.getters.isMember('group_admin')
    }
  },
  created () {
    if (this.$props.item) {
      Object.assign(this.$data, this.$props.item)
    }
  },
  props: ['item'],
  methods: {
    save () {
      return this.$data.id
        ? axios.put(`${API}/groupman/${this.$data.id}`, this.$data)
        : axios.post(`${API}/groupman`, this.$data)
    },
    handleSubmit () {
      this.save()
        .then(res => {
          this.$attrs.onSubmit(res.data)
        })
        .catch(err => {
          const message = err.response.data
          this.$store.dispatch('toast', { message, type: 'error' })
        })
    }
  },
  template
}
