<template>
    <div class="modal fade" id="FABModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-overflow modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"> {{ title }} </h5>
                </div>
                <div class="modal-body">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Click Me</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FABModal",
        data(){
            return {
                title: 'Modal Title',
                content: 'Modal Content',
            }
        },
    }
</script>