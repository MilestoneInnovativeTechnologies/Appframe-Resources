<template>
    <div>
        <!--<a class="dropdown-item" href="#">
            <span class="dropdown-icon fa fa-user"></span>
            Profile
        </a>-->
        <a class="dropdown-item" :href="logout"><span class="dropdown-icon fa fa-sign-out-alt"></span> Logout</a>
        <!--<div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Help Center</a>
        <a class="dropdown-item" href="#">Ask Forum</a>
        <a class="dropdown-item" href="#">Keyboard Shortcuts</a>-->
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "AccountOptions",
        computed:{
            ...mapGetters(['logout']),
        }
    }
</script>