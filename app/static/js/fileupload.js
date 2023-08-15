 $(document).ready(function() {
        $('[data-bs-toggle="tooltip"]').tooltip();
        $("form").submit(function(event) {
            event.preventDefault();
            let formData = new FormData();
            let files = $('#fileInput')[0].files;

            if (files.length!==0) {
                let progressBar = `
                        <div class="progress">
                             <div id="progress_id" class="progress-bar progress-bar-striped" role="progressbar" style="width: 0%;"></div>
                        </div>
                        <div id="progressStatus_id">0%</div>`;
                $('#progressContainer').append(progressBar);
            }

            $.each(files, function(i, file) {
                formData.append('files[]', file);
            });

            function showMessage(message, isSuccess) {
                const modalHtml = `
                    <div class="modal fade" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">${isSuccess ? "Success" : "Error"}</h5>
                                </div>
                                <div class="modal-body">${message}</div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                const modal = $(modalHtml);
                const modalButton = modal.find('.modal-footer button');

                modalButton.on('click', function() {
                    $('#modalDialog').empty();
                });

                $('#modalDialog').append(modal);
                modal.modal('show');
            }

            // Single Axios API call for all files with progress tracking
            axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: function(progressEvent) {
                    let percentComplete = (progressEvent.loaded / progressEvent.total) * 100;
                    $("#progress_id").width(percentComplete + '%');
                    $("#progressStatus_id").text(percentComplete.toFixed(2) + '%');
                }
            })
            .then(response => {
                showMessage(response.data.message, true);
                $("#fileInput").val("");
                $("#progressContainer").empty();
            })
            .catch(error => {
                showMessage(error.response.data.error, false);
            });
        });
 });
