 $(document).ready(function() {
        $("form").submit(function(event) {
            event.preventDefault();
            let formData = new FormData();
            let files = $('#fileInput')[0].files;

            $.each(files, function(i, file) {
                formData.append('files[]', file);
                let progressBar = '<div class="progress">';
                progressBar += '<div id="progress_' + i + '" class="progress-bar" style="width: 0%;"></div>';
                progressBar += '</div>';
                progressBar += '<div id="progressStatus_' + i + '">0%</div>';
                $('#progressContainer').append(progressBar);
            });

            // Single Axios API call for all files with progress tracking
            axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: function(progressEvent) {
                    let percentComplete = (progressEvent.loaded / progressEvent.total) * 100;
                    $("div[id^='progress_']").width(percentComplete + '%');
                    $("div[id^='progressStatus_']").text(percentComplete.toFixed(2) + '%');
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
