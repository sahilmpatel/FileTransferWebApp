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
                alert(response.data.message);
                $("#fileInput").val("");
                $("#progressContainer").empty();
            })
            .catch(error => {
                alert(error.response.data.error);
            });
        });
 });
