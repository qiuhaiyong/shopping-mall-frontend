<template>
  <div>
    <h1>params参数--{{ $route.params.keyword }} =====props获取来的 keyword={{ keyword }}- k={{ k }}---a={{ a }}-b={{ b }}</h1>
    <h1>query参数-- {{ $route.query.k }}</h1>
  </div>
</template>

<script>
export default {
  props: ['keyword', 'a', 'b', 'k']
}
</script>

<style></style>
