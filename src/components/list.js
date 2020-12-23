/* global axios, API, _ */
import ItemForm from './form.js'
import AdduserForm from './adduserform.js'
import template from './list.html.js'
import { STATUS_LABELS } from './consts.js'

export default {
  data: () => {
    return {
      fields: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Jméno', sortable: true },
        { key: 'slug', label: 'Kod', sortable: true },
        { key: 'actions', label: '' }
      ],
      items: [],
      isBusy: false,
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      curr: null,
      currDetail: null,
      item: {}
    }
  },
  filters: {
    status: (value) => STATUS_LABELS[value]
  },
  methods: {
    myProvider (ctx) {
      const params = {
        currentPage: this.currentPage,
        perPage: this.perPage,
        sort: ctx.sortBy ? `${ctx.sortBy}:${ctx.sortDesc ? 'desc' : 'asc'}` : 'id:asc'
      }
      return axios.get(`${API}/groupman/`, { params })
        .then(res => {
          this.totalRows = res.data.pagination.total
            ? res.data.pagination.total : this.totalRows
          return res.data.data
        }).catch(err => {
          const message = err.response.data
          this.$store.dispatch('toast', { message, type: 'error' })
          return []
        })
    },
    setPageSize: function (newSize) {
      this.perPage = newSize
    },
    add: function () {
      this.$data.curr = null
      this.$bvModal.show('modal-add')
    },
    edit: function (item) {
      this.$data.curr = item
      this.$bvModal.show('modal-add')
    },
    onItemSubmit: function (item) {
      this.curr
        ? Object.assign(this.curr, item)
        : this.$refs.table.refresh()
      this.$bvModal.hide('modal-add')
    },
    addusers: function (item) {
      this.$data.curr = item
      this.$bvModal.show('modal-addusers')
    }
  },
  components: {
    'item-form': ItemForm,
    'adduser-form': AdduserForm
  },
  template
}
