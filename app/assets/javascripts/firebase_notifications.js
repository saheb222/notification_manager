function FirstApp() {
    this.saveMessagingDeviceToken = function () {
        firebase.messaging().getToken().then(function (currentToken) {
            if (currentToken) {
                console.log('Got FCM device token:', currentToken);
                $.post("/push_registrations", {subscription: currentToken});
            } else {
                // Need to request permissions to show notifications.
                this.requestNotificationsPermissions();
            }
        }.bind(this)).catch(function (error) {
            console.error('Unable to get messaging token.', error);
        });
    }
    this.requestNotificationsPermissions = function() {
        console.log('Requesting notifications permission...');
        firebase.messaging().requestPermission().then(function() {
            // Notification permission granted.
            this.saveMessagingDeviceToken();
        }.bind(this)).catch(function(error) {
            console.error('Unable to get permission to notify.', error);
        });
    };
}
var firstApp = new FirstApp();
firstApp.saveMessagingDeviceToken();