<template>
    <div :class="'ball color'+color">{{color}}</div>
</template>
<script>
export default {
    props: ['color']
}
</script>