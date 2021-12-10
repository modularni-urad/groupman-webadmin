export default [{
  name: 'slug',
  component: "dyn-input",
  label: "slug",
  rules: "required",
  fieldcomponent: true, 
  sortable: true
}, {
  name: 'name',
  component: "dyn-input",
  label: "jméno",
  rules: "required",
  fieldcomponent: true, 
  sortable: true
}, {
  name: 'created', label: 'vytvořen', fieldcomponent: 'date', sortable: true
}]
