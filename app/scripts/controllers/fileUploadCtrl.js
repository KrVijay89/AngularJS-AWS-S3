'use strict';

/**
 * @ngdoc function
 * @name vijayGitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vijayGitApp
 */
angular.module('vijayGitApp')
    .controller('fileUploadCtrl', function ($scope) {

        $scope.sizeLimit      = 10585760; // 10MB in Bytes
        $scope.uploadProgress = 0;
        $scope.creds          = {
            bucket: 'Bucket Name',
            access_key: 'AWS Access Key',
            secret_key: 'AWS Secret Key'
        };

        $scope.upload = function(file) {
            var s3url = '';
            AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
            AWS.config.region = 'us-east-1';
            var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });

            if(file) {
                // Perform File Size Check First
                var fileSize = Math.round(parseInt(file.size));
                if (fileSize > $scope.sizeLimit) {
                    toastr.error('Sorry, your attachment is too big. <br/> Maximum '  + fileSizeLabel() + ' file attachment allowed','File Too Large');
                    return false;
                }
                // Prepend Unique String To Prevent Overwrites
                var uniqueFileName = $scope.uniqueString() + '-' + file.name;
                var params = { Key: uniqueFileName, ContentType: file.type, Body: file, ServerSideEncryption: 'AES256' };
                bucket.putObject(params, function(err, data) {
                    if(err) {
                        toastr.error(err.message,err.code);
                        return false;
                    }
                    else {
                        // Upload Successfully Finished
                            toastr.success('Saved Successfully', 'Done');
                        // Reset The Progress Bar
                        setTimeout(function() {
                            $scope.uploadProgress = 0;
                            $scope.$digest();
                        }, 2000);
                        s3url = uniqueFileName;
                        $scope.filupload = s3url;
                        console.log('Amazon Url', $scope.filupload);
                    }
                })
                    .on('httpUploadProgress',function(progress) {
                        $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
                        $scope.$digest();
                    });
                return s3url;
            }
            else {
                // No File Selected
                toastr.error('Please select a file to upload');
            }
        };

        $scope.fileSizeLabel = function() {
            // Convert Bytes To MB
            return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
        };

        $scope.uniqueString = function() {
            var text     = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( var i=0; i < 8; i++ ) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };


    });


