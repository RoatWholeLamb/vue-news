<template>
  <div id="editor">
    <vue-editor v-model="editContent"></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "Editor",
  components: {
    VueEditor,
  },
  props:['content'],
  data() {
    return {
        editContent:''
    };
  },
  watch:{
      editContent(value){
          this.$emit('edit',value)
      },
      content(value){
        this.editContent=value;
      }
  },

  created() {
  },

  methods: {},

};
</script>