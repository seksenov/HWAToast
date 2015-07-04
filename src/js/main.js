(function () {
    "use strict";

    // Add the event listener to handle Windows activated event
    if (typeof Windows !== "undefined" &&
            typeof Windows.UI !== "undefined" &&
            typeof Windows.UI.WebUI !== "undefined") {
	    Windows.UI.WebUI.WebUIApplication.addEventListener('activated', function (args) {
	        var activation = Windows.ApplicationModel.Activation;

	        if (args.kind === activation.ActivationKind.toastNotification) {
	            console.log(args.argument);
	            console.log(args.userInput.textReply);
	        }
	    });
	}
	
})();

function createToast(message, imgUrl, imgAlt) {
	"use strict";
	    
    // Namespace: Windows.UI.Notifications
    if (typeof Windows !== 'undefined' &&
            typeof Windows.UI !== 'undefined' &&
            typeof Windows.UI.Notifications !== 'undefined') {
        // Setup variables for shorthand
        var notifications = Windows.UI.Notifications,
            templateType = notifications.ToastTemplateType.toastImageAndText02,
            templateContent = notifications.ToastNotificationManager.getTemplateContent(templateType),
            toastMessage = templateContent.getElementsByTagName('text'),
            toastImage = templateContent.getElementsByTagName('image'),
            toastElement = templateContent.selectSingleNode('/toast');

        // Set message & image in toast template
        toastMessage[0].appendChild(templateContent.createTextNode(message || 'Demo message'));
        toastImage[0].setAttribute('src', imgUrl || 'https://unsplash.it/150/?random');
        toastImage[0].setAttribute('alt', imgAlt || 'Random sample image');
        toastElement.setAttribute('duration', 'long');
        toastElement.setAttribute('launch', '{"type":"toast","code":"info"}'); // Optional Launch Parameter

        // Add actions
        var actions = templateContent.createElement('actions');
        templateContent.firstChild.appendChild(actions);

        // Create an input box
        var input = templateContent.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('title', 'Reply with');
        input.setAttribute('id', 'textReply');
        actions.appendChild(input);

            // Create a yes button
        var btnYes = templateContent.createElement('action');
        btnYes.setAttribute('content', 'Yes');
        btnYes.setAttribute('arguments', 'yes');
        btnYes.setAttribute('launchType', 'foreground');
        actions.appendChild(btnYes);

            //Create a no button
        var btnNo = templateContent.createElement('action');
        btnNo.setAttribute('content', 'No');
        btnNo.setAttribute('arguments', 'no');
        btnNo.setAttribute('launchType', 'foreground');
        actions.appendChild(btnNo);

        // Show the toast
        var toast = new notifications.ToastNotification(templateContent);
        var toastNotifier = new notifications.ToastNotificationManager.createToastNotifier();
        toastNotifier.show(toast);
    } else if ("Notification" in window) {

        //Set the options
        var options = {
            body: message || "Demo message",
            icon: imgUrl || "https://unsplash.it/150/?random"
        }
        
        // Web notifications
        if (Notification.permission === "granted") {
			// If it's okay let's create a notification
			var n = new Notification("Yo!", options);
			setTimeout(n.close.bind(n), 5000);
			}
			
			// Otherwise, we need to ask the user for permission
			else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function (permission) {
  			// If the user accepts, let's create a notification
  				if (permission === "granted") {
    				var n = new Notification("Yo!", options);
    				setTimeout(n.close.bind(n), 5000);
  				}
			});
			}
    } else {
    	// Fallback if no native notifications are supported
    	// Build modal UI for notifications

    }
}