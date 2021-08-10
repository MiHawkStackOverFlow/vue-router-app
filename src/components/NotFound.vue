<template>
    <div>
        <h4>The page you looking for does not exist</h4>
        <div> {{ $route.params.pathMatch }} </div>    
    </div>
</template>

<script>
export default { name: 'NotFound' }
</script>

