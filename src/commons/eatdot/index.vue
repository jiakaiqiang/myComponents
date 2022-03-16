<template>
    <div class="pac-man">

        <div class="half">
            <div class="circle"></div>
        </div>

        <div class="half half-bottom">
            <div class="circle bottom"></div>
        </div>

        <div class="little-circle"></div>
        <div class="little-circle"></div>

    </div>

</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
    *{
        /*background:skyblue;*/
    }
    .pac-man{
        position: relative;
        /*top:100px;*/
        /*left:100px;*/
    }
    .half{
        width:50px;
        height:25px;
        overflow:hidden;
        animation:rotate 1s ease infinite;
        transform-origin: 50% 100%;
    }

    .half-bottom{
        transform-origin:50% 0%;
        animation:rotate-bottom 1s ease infinite;
    }

    .circle{
        width:50px;
        height:50px;
        background:#111;
        border-radius:50%;

    }
    .bottom{
        transform:translateY(-50%);
    }

    .little-circle{
        width:10px;
        height:10px;
        background:#111;
        border-radius:50%;
        position: absolute;
        top: 50%;
        left: 150px;
        transform: translateY(-50%);
    }

    .little-circle:nth-of-type(3) {
        animation: walk-left 1s infinite linear;
    }

    .little-circle:nth-of-type(4) {
        animation: walk-left 1s infinite linear 0.5s ;
    }


    @keyframes rotate{
        0%{
            transform:rotate(0deg);
        }
        50% {
            transform:rotate(-45deg);
        }

        100%{
            transform:rotate(0deg);
        }
    }

    @keyframes rotate-bottom{
        0%{
            transform:rotate(0deg);
        }
        50% {
            transform:rotate(45deg);
        }

        100%{
            transform:rotate(0deg);
        }
    }

    @keyframes walk-left{
        0%{
            opacity:0;
        }
        100%{
            left:15px;
            opacity: 1;
        }
    }


</style>
