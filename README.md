# FileTransferWebApp

Simple Web-App for sharing files between devices implemented using Flask within same local network.

1. Multiple Files upload with progress bar.
2. Selected Files to be listed in 'Downloads' page
   so that can be downloaded.
3. QR code implementation to access the app url for devices.



Note: If prompted by the firewall, make sure to allow this app access to the URL so that you can access it from other devices within the same local network.


<h2>Steps:</h2>
   1. Navigate to the app directory within the project folder, and in the command line, execute the file 
      <code>file_transfer_server.py</code>code using either python or python3.
      <br>
   2. Copy second URL generated in the logs and paste it into the browser of the other device with <br>which you want to exchange files.

![url_access](https://github.com/sahilmpatel/FileTransferWebApp/assets/40482893/a33a737f-663c-4a88-aa9a-1946f27b8341)




<h3>File uploads:<h3/>

1. Select the files you want to upload and click the upload button.
2. After the uploading process completes, On the script running device "Select a Folder to save Files" wizard will prompt to save incoming files.

https://github.com/sahilmpatel/FileTransferWebApp/assets/40482893/833ae3cb-d6ab-4ed1-b45c-41255198ec96


<br>

<h3>File downloads:<h3/>

1. Clicking the Downloads button "Select a Folder to share Files" wizard will prompt(On the script running device) to share selected files with second device. 
2. Files will be listed to download.

https://github.com/sahilmpatel/FileTransferWebApp/assets/40482893/131c961b-704b-4179-a8ff-b9ecdce48d37
