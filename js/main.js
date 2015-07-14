(function () {
    "use strict";

    // Add the event listener to handle Windows activated event
    if (typeof Windows !== "undefined" &&
            typeof Windows.UI !== "undefined" &&
            typeof Windows.UI.WebUI !== "undefined") {
	    Windows.UI.WebUI.WebUIApplication.addEventListener('activated', function (args) {
	        var activation = Windows.ApplicationModel.Activation;

            // Handle applcation launch from the Windows OS
            if (args.kind === activation.ActivationKind.launch) {
                // Check if there are launch args
                if(args.arguments) {
                    var launchArgs = JSON.parse(args.arguments);

                    if (launchArgs.type === "toast") {
                    // The app has been launched from the click of a notification
                    console.log(args);
                    }
                }
            }
            // Handle user interaction from toast notification on Windows
	        else if (args.kind === activation.ActivationKind.toastNotification) {
                console.log(args);
                
                toastHandler(args.argument, args.userInput.textReply);
	        }
	    });
	}
})();

document.addEventListener("DOMContentLoaded", function(e) {
    "use strict";

    if (isWindows()) {
        document.getElementById("windowsData").className = "flex-item";
    }
});

function isWindows () {
    "use strict";

    if (typeof Windows === "undefined") {
        return false;
    }
    else {
        return true;
    }
}

function toastHandler (btnClicked, userText) {
    "use strict";

    console.log("Button clicked: " + btnClicked + " Text: " + userText);

    try {
        document.getElementById("userButton").innerHTML(btnClicked);
        document.getElementById("userText").innerHTML(userText);
    }
    catch(e) {
        console.log(e);
    }

    
}

function createToast(title, message, imgUrl, imgAlt, tag, lang) {
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

        var launchParams = {
            type: "toast",
            id: tag || "demoToast",
            heading: title || "Demo title",
            body: message || "Demo message"
        };

        var launchString = JSON.stringify(launchParams);
      
        // Set message & image in toast template
        toastMessage[0].appendChild(templateContent.createTextNode(message || 'Demo message'));
        toastImage[0].setAttribute('src', imgUrl || 'https://unsplash.it/150/?random');
        toastImage[0].setAttribute('alt', imgAlt || 'Random sample image');
        toastElement.setAttribute('duration', 'long');
        toastElement.setAttribute('launch', launchString); // Optional Launch Parameter

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
        toast.tag = "demoToast";
        console.log(toast);        
        toastNotifier.show(toast);

    } else if ("Notification" in window) {

        //Set the title
        var _title = title || "Yo!"; 

        //Set the options
        var options = {
            body: message || "Demo message",
            icon: imgUrl || "https://unsplash.it/150/?random",
            tag: tag || "DemoN",
            lang: lang || "en-us"
        };
        
        // Web notifications
        if (Notification.permission === "granted") {
			// If it's okay let's create a notification
			var n = new Notification(_title, options);
            n.addEventListener("click", clicked);
			setTimeout(n.close.bind(n), 5000);
			}
			
			// Otherwise, we need to ask the user for permission
			else if (Notification.permission !== 'denied') {
    			Notification.requestPermission(function (permission) {
      			// If the user accepts, let's create a notification
      				if (permission === "granted") {
        				var n = new Notification(_title, options);
                        n.addEventListener("click", clicked);
        				setTimeout(n.close.bind(n), 5000);
      				}
    			});
			}
    } else {
    	// Fallback if no native notifications are supported
    	// In this case revert to alert
        // Build modal UI for better notifications support
        var alertText = title || "Demo Title";

        alert(alertText);
    }
}

function notify () {
    "use strict";

    var title, message, imgUrl, imgAlt, tag, lang;

    title = document.getElementById("title").value;
    message = document.getElementById("message").value;
    imgUrl = document.getElementById("image").value;
    imgAlt = document.getElementById("image").value;

    createToast(title, message, imgUrl, imgAlt, tag, lang);
}

function clicked (e) {
    "use strict";

    // Web notification has been clicked
    document.getElementById("userInteraction").innerHTML = "Clicked";
    document.getElementById("titleOut").innerHTML = e.target.title;
    document.getElementById("messageOut").innerHTML = e.target.body;
    document.getElementById("imageOut").innerHTML = e.target.icon;
}
