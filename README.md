Demo: Notifications
============

This demo shows a quick way to add a notification to your website. It's intended purpose is to show native notifications from remote code in a Hosted Web App on Windows 10 but has fallbacks to web notifications, followed by alerts if the website is run in the browser.

In order for the Windows Toast code to work you need to be running this project as a Universal Windows App on a Windows 10 device. Otherwise you'll be able to check it out in the browser.

> You'll want to install our [yo generator](https://github.com/MicrosoftEdge/generator-appx) first.

#### Step 1
Create a new yo project

```
mkdir toast
cd toast
yo appx
``` 

Complete the generator by answering the questions.

#### Step 2
Let's get the project started, and do some live Code!

- Make sure you have [developer mode](https://msdn.microsoft.com/en-us/library/windows/apps/dn706236.aspx) enabled.
- Setup Microsoft Edge [Loopback exception](http://dev.modern.ie/platform/faq/how-can-i-debug-localhost/)
- Then from the command line, type:
```
gulp appx:dev
```

#### Step 3
Code! - Add some code to **main.js**, **index.html**, and **app.scss**

- Copy and paste the code from this project into the corresponding files
- Save and let the app update

#### Step 4
Create a Notification

- Enter the values you'd like to see in the notification
- Hit notify then click ands interact with the notification
- You'll see the values from the notification passed back to the site