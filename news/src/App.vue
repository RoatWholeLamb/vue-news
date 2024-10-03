<template>
  <div id="app">
    <NavMenu />
    <router-view />
  </div>
</template>
<script>
import NavMenu from '@/components/NavMenu'
export default {
  name: 'App',
  components:{
    NavMenu
  },

  data() {
    return {
      
    };
  },

  created() {
  },

  methods: {
    
  },
};
</script>

<style >
* {
  margin: 0;
  padding: 0;
}


/* 新闻搜索结果 */
.el-popover.search-result{
  width: 40%;
}

</style>
