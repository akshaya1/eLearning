import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploadService } from '../services/fileupload.service';
import { FileToUpload } from '../models/filetoupload.model';
import { ToastrService } from 'ngx-toastr';
import { FileToUploadResponse } from '../models/fileuploadresponse.model';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  // Maximum file size allowed to
  // be uploaded = 1MB
  MAX_SIZE: number = 1048576;
  theFiles: any[] = [];
  messages: string[] = [];
  fileUploadResponce : FileToUploadResponse[] = [];
  @Output() messageEvent = new EventEmitter<FileToUploadResponse>();

  constructor(
    private fileUploadService : FileUploadService,
    private toastrService : ToastrService
    ) { }

  ngOnInit() {
    this.fileUploadResponce = [];
  }

  
  
  onFileChange(event) {
    this.theFiles = null;
    if (event.target.files &&
        event.target.files.length > 0) {
      // Don't allow file sizes over 1MB
      if (event.target.files[0].size < this.MAX_SIZE) {
        // Set theFile property
        this.theFiles = event.target.files;
        console.log(this.theFiles)
      }
      else { // Display error message
        this.messages.push("File: " +
            event.target.files[0].name
            + " is too large to upload.");
      }
    }
  }

  uploadFile(): void {
    for (let index = 0;
             index < this.theFiles.length;
             index++) {
      this.readAndUploadFile(this.theFiles[index]);
    }
    
  }

  readAndUploadFile(theFile: any) {
    let file = new FileToUpload();
      
    // Set File Information
    file.fileName = theFile.name;
    file.fileSize = theFile.size;
    file.fileType = theFile.type;
    file.lastModifiedTime = theFile.lastModified;
    file.lastModifiedDate = theFile.lastModifiedDate;
        
    // Use FileReader() object to get file to upload
    // NOTE: FileReader only works with newer browsers
    let reader = new FileReader();
        
    // Setup onload event for reader
    reader.onload = () => {
      // Store base64 encoded representation of file
      file.fileAsBase64 = reader.result.toString();
        
      // POST to server
      this.fileUploadService.uploadFile(file)
        .subscribe(resp =>
          {
            this.fileUploadResponce.push(resp);
            this.toastrService.success('Upload completed')
            this.messageEvent.emit(resp);
          });
    }
        
    // Read the file
    reader.readAsDataURL(theFile);
  }

}
