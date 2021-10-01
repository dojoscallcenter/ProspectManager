//DECLARE ANY GLOBAL VARIABLES HERE


let GoogleAuth;
const SCOPE = 'https://www.googleapis.com/auth/script.send_mail https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/script.projects https://www.googleapis.com/auth/script.scriptapp https://www.googleapis.com/auth/script.deployments https://www.googleapis.com/auth/script.external_request https://www.googleapis.com/auth/presentations';
const spreadsheetId = "1HdgnSTtfFPBr5obA2hyuhLOqdaA2bmqIShW9IKVWNn0"; //prosepect manager
//ORIGINAL 
const appURL = "https://script.google.com/macros/s/AKfycbyCDw5q27hAzTXTFcPkQYwRPFIRCU0D8fYftC-pnZsgd-6dD6kCgUecgrOYbU7Pks8/exec"
//const appURL = "https://script.google.com/macros/s/AKfycbyKg5mLu1i9U16Cq_GLRLe-j4UEQgAdlVDzEG6S-BQ70HYc7T_t350oH5Z9_C5pDrLd/exec"; LAST WORKING
//const appURL = "https://script.google.com/a/macros/mydojos.com/s/AKfycbzsxmJeXvPY4cNQXGs1nX_I-O5iKJ1_yCgMaW4V8Ti0MXjLrmb8VePJvKAGmnJvIdd4/exec";
var childRows = $('#newLeads tr.shown');
var userFilter;
//const isMobile = navigator.userAgentData.mobile; //resolves true/false
//console.log(isMobile);

    //All dropdown variables
    var dojoLocations = [
        "",
        "Ankeny",
        "Johnston",
        "Waukee",
        "WDM"
      ];
    //this is important for the "add to calendar" functionality
    var dojoAddresses = [
        "1810 SW White Birch Cir Suite 100, Ankeny, IA 50023",
        "8805 Chambery Blvd, Johnston, IA 50131",
        "1960 Grand Ave #17, West Des Moines, IA 50265",
        "120 SE Laurel St, Waukee, IA 50263"
    ]
  
      var studentStatuses = [
        "",
        "Prospect",
        "Student",
        "Alumni",
        "Group Prospect"
      ];
  
      var ageClasses = [
        "",
        "Ages 4-5",
        "Ages 6-7",
        "Ages 8-9",
        "Ages 10-12",
        "Ages 13-20",
        "Ages 21-99"
      ];
      
      var intro1Times = [
        "",
        "2:00",
        "2:15",
        "2:30",
        "2:45",
        "3:00",
        "3:15",
        "3:30",
        "3:45",
        "4:00",
        "4:15",
        "4:30",
        "4:45",
        "5:00",
        "5:15",
        "5:30",
        "5:45",
        "6:00",
        "6:15",
        "6:30",
        "6:45",
        "7:00",
        "7:15",
        "7:30",
        "7:45",
        "8:00",
        "8:15",
        "8:30",
        "8:45",
        "9:00"
      ];
      var intro2Times = [
        "",
        "2:00",
        "2:15",
        "2:30",
        "2:45",
        "3:00",
        "3:15",
        "3:30",
        "3:45",
        "4:00",
        "4:15",
        "4:30",
        "4:45",
        "5:00",
        "5:15",
        "5:30",
        "5:45",
        "6:00",
        "6:15",
        "6:30",
        "6:45",
        "7:00",
        "7:15",
        "7:30",
        "7:45",
        "8:00",
        "8:15",
        "8:30",
        "8:45",
        "9:00"
      ];
      
      var prospectPhases = [
        "",
        "00-Pre-Paid/Not Yet Contacted",
        "01-New Lead/Not Yet Contacted",
        "02-Too Young/Future Date",
        "10-Intro 1 Scheduled",
        "11-Intro 1 No Show-Needs Contacts",
        "12-Intro 1 Phone Tag",
        "20-Intro 2 Scheduled",
        "21-Intro 2 No Show-Needs Contacts",
        "22-Intro 2 Phone Tag",
        "70-Intro Completed -Enrolled",
        "30-Intro Completed -Waiting For Reply",
        "60-Intro Completed -Did Not Enroll",
        "40-Never Attended Intro 1 -Lost Intros",
        "50-Never Attended Intro 2 -Lost Intros",
        "80-Formerly Enrolled",
        "90-Text and Email Marketing",
        "99-Hard No / Do Not Contact"  
      ];
  
      var leadSources = [
        "",
        "Online",
        "Phone",
        "Walk-In",
        "Event"
      ];
      
      var leadSourceSubcategories = [
        "",
        "Websearch",
        "Facebook",
        "Print Ad",
        "Online Ad",
        "Internal Event",
        "External Event",
        "Signage"
      ];
  
      var introOffers = [
        "",
        "1 Free Class Uniform Not Included",
        "1 Week $19.95 Includes Uniform",
        "6 Weeks $149 Includes Uniform"
      ];
  
      var introNotes = [
        "",
        "No Charge for class.",
        "Paid online.",
        "Paid at Call Center.",
        "Planning to pay at time of intro."
      ];

$(document).ready(function() {
    handleClientLoad();
});




function maskUp(){
    $("#phone1, #phone2").inputmask("(999) 999-9999");}

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    // In practice, your app can retrieve one or more discovery documents.
    var discoveryDocs = [
        "https://sheets.googleapis.com/$discovery/rest?version=v4",
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        "https://script.googleapis.com/$discovery/rest?version=v1"
        ]
    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    gapi.client.init({
        'apiKey': 'AIzaSyArmBSmCY-VxB3XIlgFuS5SdwG9p-skggs',
        'clientId': '230900590151-d6jdsn67t1n58v2hbof63pm0jg682lni.apps.googleusercontent.com',
        'discoveryDocs': discoveryDocs,
        'scope': SCOPE
    }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen(updateSigninStatus);

      // Handle initial sign-in state. (Determine if user is already signed in.)
      var user = GoogleAuth.currentUser.get();
      setSigninStatus();

      // Call handleAuthClick function when user clicks on
      //      "Sign In/Authorize" button.
      $('#sign-in-or-out-button').click(function() {
        handleAuthClick();
      });          
    });
}

function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get()) {
      // User is authorized and has clicked "Sign out" button.
      //GoogleAuth.signOut();
      GoogleAuth.disconnect();

    } else {
      // User is not signed in. Start Google auth flow.
      GoogleAuth.signIn();
    }
}

function revokeAccess() {
    GoogleAuth.disconnect();
}

function setSigninStatus() {
    var user = GoogleAuth.currentUser.get();
    //console.log(user);
    var isSignedIn = GoogleAuth.isSignedIn.get();
    //console.log(isSignedIn);
    if (isSignedIn) {
        
        userProfile = user.getBasicProfile();
        userProfileEmail = userProfile.getEmail();
        //console.log(userProfileEmail);
        if (gapi.auth2.getAuthInstance().isSignedIn.get()){
        if (userProfileEmail === "info@mydojos.com"){
            userFilter = "";
        }else{
            if (userProfileEmail === "info-ankeny@mydojos.com"){
                userFilter = "Ankeny";
            }else{
                if (userProfileEmail === "info-johnston@mydojos.com"){
                    userFilter = "Johnston";
                     }else{
                        if (userProfileEmail === "info-wdm@mydojos.com"){
                            userFilter = "WDM";
                             }else{
                                 if (userProfileEmail === "info-waukee@mydojos.com"){
                                    userFilter = "Waukee";
                                 }
                             }
                     }
                 }
            }
        }
        //console.log(userFilter);
    }
  
    //console.log(userFilter);
    var isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
      //console.log ("I am signed in as: "+ user.getBasicProfile().getName());
      $('#sign-in-or-out-button').html('Sign out');
      $('#sign-in-or-out-button').removeClass('btn btn-warning').addClass('btn btn-outline-light me-2');
      //$('#auth-status').html('You are currently signed in and have granted ' +
          //'access to this app.');
          newLeadsInit();
    ////////////////////Put dataTables init function here.
        //console.log("Login initialization complete...");
    } else {
      GoogleAuth.disconnect();
      $('#sign-in-or-out-button').html('Sign In');
      $('#sign-in-or-out-button').removeClass('btn btn-outline-light me-2').addClass('btn btn-warning');
      $('#auth-status').html('You have not authorized this app or you are ' +
          'signed out.');
        if ($.fn.DataTable.isDataTable( '#newLeads' ) ) {
        //console.log("Signing out...");
        $('#newLeads').DataTable().clear().destroy();
        location.reload();
        //$('#newLeads').empty();
        }
    }
}


function updateSigninStatus() {
    setSigninStatus();
}

function handleFormSubmit(formObject) {
    addNewRecord(formObject);
    ajaxReload();
}





function checkCalendarEvents(d) {
    $('#intro1Calendar, #intro2Calendar').prop("disabled",true);
    $('#intro1Calendar, #intro2Calendar').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span>Adding event...</span>');

    introStage = "";
    dojoAddress = "";
    if (d[13] !=="" && d[18] === ""){
        introStage = "Intro 1";
    }else if(d[13] !=="" && d[18] !== "" && d[18] !== "NaN:NaN"){
        introStage = "Intro 2";
    }
    if (d[3] === "Ankeny"){
        dojoAddress = dojoAddresses[0];
    }else if (d[3] === "Johnston"){
        dojoAddress = dojoAddresses[1];
    }else if(d[3] === "WDM"){
        dojoAddress = dojoAddresses[2];
    }else if (d[3] === "Waukee"){
        dojoAddress = dojoAddresses[3];
    }

    return gapi.client.calendar.events.list({
        "calendarId": "info-"+d[3]+"@mydojos.com",
        "maxResults": 10000,
        "q": "intro",
        //"showDeleted": false,
        "singleEvents": false,
        'timeMin': (new Date()).toISOString(),
    })
        .then(function(response) {
            resultItems = response.result.items;
            valueArray = [];
            matchArray = [];
            calendarId = "info-"+d[3]+"@mydojos.com";
 
            var eventTitle = introStage+" - " +d[10]+" "+d[11];
            var description = "First Name: "+d[10]+"\r\nLast Name: "+d[11]+"\r\nAge: "+(getAge(d[38]))+"\r\nAge Class: "+d[12]+"\r\nPhone: "+d[7]+"\r\nEmail: "+d[8]+"\r\nIntro Notes: "+d[29];
            var sT = "";
            if (introStage === "Intro 1"){
                sT = new Date(new Date(d[13]+" " +d[14]));
                sT2 = sT.toLocaleString()
            }else if(introStage === "Intro 2"){
                sT = new Date(new Date(d[18]+" " +d[19]));
            }
            var sYear = sT.getFullYear();
            var sMonth = sT.getMonth()+1;
            var sM = (sMonth < 10) ? '0' + sMonth : sMonth;
            var sDay = sT.getDate();
            //console.log("sDay: "+sDay);
            var sD = (sDay < 10) ? '0' + sDay : sDay;
            var hours = sT.getHours();
            var hr = (hours < 10) ? '0' + hours : hours;

            var minutes = sT.getMinutes();
            var min = (minutes < 10) ? '0' + minutes : minutes;

            var seconds = sT.getSeconds();
            var sec = (seconds < 10) ? '0' + seconds : seconds;

            var newDateString = sYear + '-' + sM  + '-' + sD;
            var newTimeString = hr + ':' + min + ':' + sec;

            var sDateTimeString = newDateString + 'T' + newTimeString;

            var add_minutes =  function (dt, minutes) {
                return new Date(dt.getTime() + minutes*60000);
            }
            var eT = add_minutes(sT, 30);
            var eHours = eT.getHours();
            var eHr = eHours < 10 ? '0' + eHours : eHours;
            var eSeconds = eT.getSeconds();
            var eSec = (eSeconds < 10) ? '0' + eSeconds : eSeconds;

            var eMinutes = eT.getMinutes();
            var eMin = (eMinutes < 10) ? '0' + eMinutes : eMinutes;
            eTimeString = eHr+':'+eMin+':'+eSec;
            var eDateTimeString = newDateString +'T'+eTimeString;

            for (let index = 0; index < resultItems.length; index++) {

                if((resultItems[index].summary != undefined && resultItems[index].start.dateTime != undefined)){
                    if(resultItems[index].summary === eventTitle && resultItems[index].start.dateTime.includes(sDateTimeString)){
                        valueArray.push(resultItems[index].summary);
                    }
                }
            }
                    if (valueArray.length > 0){
                        alert("The calendar entry already exists!");
                        $('#intro1Calendar, #intro2Calendar').prop("disabled",false);
                        $('#intro1Calendar, #intro2Calendar').html('Add to Calendar');
                    }else{
                        var event = {
                            'summary': eventTitle,
                            'location': dojoAddress,
                            'description': description,
                            'start': {
                            'dateTime': sDateTimeString,
                              'timeZone': 'America/Chicago'
                            },
                            'end': {
                              'dateTime': eDateTimeString,
                              'timeZone': 'America/Chicago'
                            },
                            'recurrence': [
                              'RRULE:FREQ=DAILY;COUNT=1'
                            ],
                            'attendees': [
                              {'email': d[8]},
                            ],
                            'reminders': {
                              'useDefault': false,
                              'overrides': [
                                {'method': 'email', 'minutes': 24 * 60},
                                {'method': 'popup', 'minutes': 60 * 2}
                              ]
                            }
                          };
                          
                          var request = gapi.client.calendar.events.insert({
                            'calendarId': calendarId,
                            'resource': event
                          });
                          
                          request.execute(function(event) {
                            //console.log("request complete!");
                            alert("Successfully added intro to calendar!!");
                          })
                            $('#intro1Calendar, #intro2Calendar').prop("disabled",false);
                            $('#intro1Calendar, #intro2Calendar').html('Add to Calendar');
                         
                    }
        },
                function(err) { 
                    alert("An error occured. See the debugger console for details.")
                    $('#intro1Calendar, #intro2Calendar').prop("disabled",false);
                    $('#intro1Calendar, #intro2Calendar').html('Add to Calendar');
                    console.error("Execute error", err); });
}

function sendWelcomeForm(d){
    $('#welcomeForm').prop("disabled",true);
    $('#welcomeForm').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span>Sending...</span>');
    //USE DEPLOYMENT ID INSTEAD OF SCRIPT ID
    //var scriptId = "AKfycbzsxmJeXvPY4cNQXGs1nX_I-O5iKJ1_yCgMaW4V8Ti0MXjLrmb8VePJvKAGmnJvIdd4"; OLD
    var scriptId = "AKfycbyCDw5q27hAzTXTFcPkQYwRPFIRCU0D8fYftC-pnZsgd-6dD6kCgUecgrOYbU7Pks8";
    var formInfo = {
        add_constantcontact: "",
        age_class: d[12],
        city: d[35],
        communication_notes: d[27],
        date_ofbirth: d[38],
        dojo_location: d[3],
        dojo_notes: d[30],
        email: d[8],
        gender: d[33],
        inquire_date: d[2],
        interest: "",
        intro1_attended: "",
        intro1_date: d[13],
        intro1_endtime: "",
        intro1_starttime: "",
        intro1_time: d[14],
        intro2_attended:"",
        intro2_date:"",
        intro2_endtime:"",
        intro2_starttime:"",
        intro2_time:"",
        intro_notes: d[29],
        intro_offer: d[28],
        lastcontact_date: d[9],
        lead_date: d[1],
        lead_firstname: d[5],
        lead_lastname: d[6],
        leadsource: d[24],
        leadsource_subcategory: d[25],
        participant_firstname: d[10],
        participant_lastname: d[11],
        phone: d[7],
        prospect_phase: d[23],
        send_introsheet: "",
        state: d[36],
        street_address: d[34],
        student_status: "",
        zip: d[37]
    }
    // Call the Apps Script API run method
    //   'scriptId' is the URL parameter that states what script to run
    //   'resource' describes the run request body (with the function name
    //              to execute)
    gapi.client.script.scripts.run({
      'scriptId': scriptId,
      'resource': {
        'function': 'sendWelcomeForm',
        "parameters": [
            formInfo            
          ],
      }
    }).then(function(resp) {
        // The API encountered a problem before the script
        // started executing.
      var result = resp.result;
      if (result.error && result.error.status) {
          console.log("Error calling API!");
          $('#welcomeForm').prop("disabled",false);
          $('#welcomeForm').html("Send Welcome Form");
      } else if (result.error) {
        // The API executed, but the script returned an error.
        // Extract the first (and only) set of error details.
        // The values of this object are the script's 'errorMessage' and
        // 'errorType', and an array of stack trace elements.
        var error = result.error.details[0];
        console.log('Script error message: ' + error.errorMessage);
        $('#welcomeForm').prop("disabled",false);
        $('#welcomeForm').html("Send Welcome Form");

  
        if (error.scriptStackTraceElements) {
          // There may not be a stacktrace if the script didn't start
          // executing.            
            console.log("Stack Trace Elements present!");
            $('#welcomeForm').prop("disabled",false);
            $('#welcomeForm').html("Send Welcome Form");



        }
      } else {
        // The structure of the result will depend upon what the Apps
        // Script function returns.
        //console.log(resp.result);
        alert("Welcome form sent!");
        $('#welcomeForm').prop("disabled",false);
        $('#welcomeForm').html("Send Welcome Form");
      }
    });
  }
  



function readGS(){
    //console.log("Reading all data...");
    const searchValue = 50;
    return gapi.client.sheets.spreadsheets.values.get({
        "range": "GAS",
        "spreadsheetId": spreadsheetId,
    })
        .then(function(response) {
            // Handle the results here (response.result has the parsed body).
            var valueArray = response.result.values;

            valueArray.shift();
            valueArray.find(function (){
                for (let index = 0; index < valueArray.length; index++) {
                    const element = valueArray[index];
                    //console.log("the element index number is: "+index+", the value of the currently inspected element is: "+valueArray[index][0]+", the search value is: "+searchValue);
                    if(searchValue == valueArray[index][0]){
                        //console.log("element located");
                        //It's index +2 because I have removed the headers from the array to return only the values in the array
                        //console.log("the row index of the searched value is: "+(index+2));
                        var test = (index+2);
                        return gapi.client.sheets.spreadsheets.batchUpdate({
                            "spreadsheetId": spreadsheetId,
                            "resource": {
                              "requests": [
                                {
                                  "deleteDimension": {
                                    "range": {
                                      "sheetId": 0,
                                      "dimension": "ROWS",
                                      "startIndex": test-1,
                                      "endIndex":test
                                    }
                                  }
                                }
                              ]
                            }
                          })
                              .then(function(response) {
                                      // Handle the results here (response.result has the parsed body).
                                      //console.log("Response", response);
                                    },
                                    function(err) { console.error("Execute error", err); });
                    }else{
                    }
                }
            });
        },
        function(err) { console.error("Execute error", err); });
}

function deleteRow(rowData) {
    const searchValue = rowData[0];
    return gapi.client.sheets.spreadsheets.values.get({
        "range": "CC_AllData",
        "spreadsheetId": spreadsheetId,
    })
        .then(function(response) {
            // Handle the results here (response.result has the parsed body).
            var valueArray = response.result.values;
            valueArray.shift();
            valueArray.find(function (){
                for (let index = 0; index < valueArray.length; index++) {
                    const element = valueArray[index];
                    if(searchValue == valueArray[index][0]){
                        //console.log("element located");
                        //It's index +2 because I have removed the headers from the array to return only the values in the array
                        //console.log("the row index of the searched value is: "+(index+2));
                        var test = (index+2);
                        //console.log(test);
                        return gapi.client.sheets.spreadsheets.batchUpdate({
                            "spreadsheetId": spreadsheetId,
                            "resource": {
                              "requests": [
                                {
                                  "deleteDimension": {
                                    "range": {
                                      "sheetId": 81311297,
                                      "dimension": "ROWS",
                                      "startIndex": test-1,
                                      "endIndex":test
                                    }
                                  }
                                }
                              ]
                            }
                          })
                              .then(function(response) {
                                    },
                                    function(err) { console.error("Execute error", err); })
                                .then(
                                    function(){
                                        ajaxReload();
                                    });
                    }else{
                    }
                }
            });
        },
        function(err) { console.error("Execute error", err); });
}



function updateRow(formData, searchValue) {
  var options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
    //console.log("Reading all data for update...");
    $('#formSubmitButton').prop("disabled",true);
    $('#formSubmitButton').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span>Saving...</span>');

    return gapi.client.sheets.spreadsheets.values.get({
        "range": "CC_AllData",
        "spreadsheetId": spreadsheetId,
    })
        .then(function(response) {
            // Handle the results here (response.result has the parsed body).
            var valueArray = response.result.values;

            //console.log(valueArray);
            //console.log(valueArray.length);
            if(formData.intro1_time.value == ""){
                intro1TimeValue = "";
            }else{
                intro1TimeValue = new Date("2021-01-01 "+ formData.intro1_time.value).toLocaleTimeString('en-US', options);
              }
            if(formData.intro2_time.value == ""){
                intro2TimeValue = "";
            }else {
                intro2TimeValue = new Date("2021-01-01 "+ formData.intro2_time.value).toLocaleTimeString('en-US', options);
            }

            valueArray.find(function (){
                for (let index = 0; index < valueArray.length; index++) {
                    const element = valueArray[index];
                    //console.log("the element index number is: "+index+", the value of the currently inspected element is: "+valueArray[index][0]+", the search value is: "+searchValue);
                    if(searchValue == valueArray[index][0]){
                        var test = (index+1);
                        var updateRange = "CC_AllData!A"+test+":"+test;

                        return gapi.client.sheets.spreadsheets.values.batchUpdate({
                            "spreadsheetId": spreadsheetId,
                            "valueInputOption": "RAW",
                            "data": [{
                                "majorDimension" : "ROWS",
                                "range": updateRange,
                                "values":[
                                    [
                                        searchValue,
                                        formData.lead_date.value,
                                        formData.inquire_date.value,
                                        formData.dojo_location.value,
                                        formData.student_status.value,
                                        formData.lead_firstname.value,
                                        formData.lead_lastname.value,
                                        formData.phone.value,
                                        formData.email.value,
                                        formData.lastcontact_date.value,
                                        formData.participant_firstname.value,
                                        formData.participant_lastname.value,
                                        formData.age_class.value,
                                        formData.intro1_date.value,
                                        intro1TimeValue,
                                        "",
                                        "",
                                        formData.intro1_attended.value,
                                        formData.intro2_date.value,
                                        intro2TimeValue,
                                        "",
                                        "",
                                        formData.intro2_attended.value,
                                        formData.prospect_phase.value,
                                        formData.lead_source.value,
                                        formData.leadsource_subcategory.value,
                                        formData.interest.value,
                                        formData.communication_notes.value,
                                        formData.intro_offer.value,
                                        formData.intro_notes.value,
                                        formData.dojo_notes.value,
                                        "",
                                        "",
                                        formData.gender.value,
                                        formData.street_address.value,
                                        formData.city.value,
                                        formData.state.value,
                                        formData.zip.value,
                                        formData.date_ofbirth.value
                                    ]
                                ]
                            }]                                
                            })
                              .then(function(response) {
                                      // Handle the results here (response.result has the parsed body).
                                      //console.log("Response", response.result);
                                      $('#formSubmitButton').prop("disabled",false);
                                      $('#formSubmitButton').html("Save");
                                    ajaxReload();
                                    },
                                    function(err) { console.error("Execute error", err); });
                    }
                    
                }
            });
        },
        function(err) { console.error("Execute error", err); });
}

function addNewRecord(formObject){
    var formInfo = {
        add_constantcontact: "",
        age_class: testUndefined(formObject.new_age_class.value),
        city: "",
        communication_notes: testUndefined(formObject.communication_notes.value),
        date_ofbirth:"",
        dojo_location: testUndefined(formObject.new_dojo_location.value),
        dojo_notes: testUndefined(formObject.dojo_notes.value),
        email: testUndefined(formObject.email.value),
        gender: testUndefined(formObject.gender.value),
        inquire_date: testUndefined(formObject.inquire_date.value),
        interest: "",
        intro1_attended: "",
        intro1_date: testUndefined(formObject.intro1_date.value),
        intro1_endtime: "",
        intro1_starttime: "",
        intro1_time: testUndefined((new Date("2021-01-01 "+formObject.new_intro1_time.value)).toLocaleTimeString()),//.toLocaleTimeString(),
        intro2_attended:"",
        intro2_date:"",
        intro2_endtime:"",
        intro2_starttime:"",
        intro2_time:"",
        intro_notes: testUndefined(formObject.new_intro_notes.value),
        intro_offer: testUndefined(formObject.new_intro_offer.value),
        lastcontact_date: testUndefined(formObject.lastcontact_date.value),
        lead_date: testUndefined(formObject.lead_date.value),
        lead_firstname: testUndefined(formObject.lead_firstname.value),
        lead_lastname: testUndefined(formObject.lead_lastname.value),
        leadsource: testUndefined(formObject.new_lead_source.value),
        leadsource_subcategory: testUndefined(formObject.new_leadsource_subcategory.value),
        participant_firstname: testUndefined(formObject.participant_firstname.value),
        participant_lastname: testUndefined(formObject.participant_lastname.value),
        phone: testUndefined(formObject.phone.value),
        prospect_phase: testUndefined(formObject.new_prospect_phase.value),
        send_introsheet: "",
        state: "",
        street_address: "",
        student_status: testUndefined(formObject.new_student_status.value),
        zip: ""
    }
    console.log(JSON.stringify(formInfo));
    
    fetch(appURL,{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        mode: 'no-cors', 
        credentials: 'include',
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(formInfo) // body data type must match "Content-Type" header
      })
        .then($('#unCloseable').modal('show'))
        .then(res => {
          console.log(res);
          //console.log(res.headers.get('Access-Control-Allow-Origin'));
          console.log(res.json());
        })
        .then(function(){
            //console.log("Cleaning up modals...")
            ajaxReload();
        });
    //console.log("Transmission sent...");
}


function resetEditForm(){
    var tr = $('#newLeads tbody tr.shown');
    var row = $('#newLeads').DataTable().row(tr);
    document.getElementById("editForm").reset();
    $('div.slider',row.child()).slideUp(function(){
        row.child.hide();
        tr.removeClass('shown');
    } ); 

}

function getAge(dateString){
    if (dateString === undefined){
      return "";
    }
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
        age--;
    }
    return age;
}


function ajaxReload(formObject){
    //console.log("ajax reload begin");
      childRows = $('#newLeads').DataTable().rows($('.shown'));
      var row = $('#newLeads').DataTable().row(childRows);
      if (childRows != undefined && childRows.length > 0) {
          childRows.every(function (rowIdx, tableLoop, rowLoop) {
              //console.log("There is a shown child row present on Ajax load");
              d = this.data();
              this.child($(format(d))).show();
              dropdownStack();
              this.nodes().to$().addClass('shown');
              $('div.slider', row.child()).slideDown(); 
              //console.log('I was shown from Ajax reload');
          });
      };    
     $('#newLeads').DataTable().ajax.reload(null, false);
     //console.log("Table updated!");
     //console.log("Child Rows after Ajax reload: "+childRows);
     $('#myModal').modal('hide');
     $('#unCloseable').modal('hide'); 
  }

function dropdownStack(){
  if ($('#dojo_location option').length < 2){
      dojoLocationDropdown(dojoLocations);
  }
  if ($('#student_status option').length < 2){
    //console.log("Student Status length: "+$('#student_status option').length)
      studentStatusDropdown(studentStatuses);
  }
  if ($('#age_class option').length < 2){
      ageClassDropdown(ageClasses);
  }
  if ($('#intro1_time option').length < 2){
      intro1TimeDropdown(intro1Times);
  }
  if ($('#intro2_time option').length < 2){
      intro2TimeDropdown(intro2Times);
  }
  if ($('#lead_source option').length < 2){
      leadSourceDropdown(leadSources);
  }
  if ($('#leadsource_subcategory option').length < 2){
      leadSourceSubcategoryDropdown(leadSourceSubcategories);
  }
  if ($('#prospect_phase option').length < 2){
      prospectPhaseDropdown(prospectPhases);
  }    
  if ($('#intro_offer option').length < 3){
      introOfferDropdown(introOffers);
  }
  if ($('#intro_notes option').length < 3){
      introNotesDropdown(introNotes);
  }
}
  
function newEntryDropdownStack(){
  if ($('#new_dojo_location option').length == 0){
      newDojoLocationDropdown(dojoLocations);
  }
  if ($('#new_student_status option').length == 0){
      newStudentStatusDropdown(studentStatuses);
  }
  if ($('#age_class option').length == 0){
      newAgeClassDropdown(ageClasses);
  }
  if ($('#new_intro1_time option').length == 0){
      newIntro1TimeDropdown(intro1Times);
  }
  if ($('#new_lead_source option').length == 0){
      newLeadSourceDropdown(leadSources);
  }
  if ($('#new_leadsource_subcategory option').length == 0){
      newLeadSourceSubcategoryDropdown(leadSourceSubcategories);
  }
  if ($('#new_prospect_phase option').length == 0){
      newProspectPhaseDropdown(prospectPhases);
  }
  if ($('#new_intro_offer option').length == 0){
      newIntroOfferDropdown(introOffers);
  }
  if ($('#intro_notes option').length == 0){
      newIntroNotesDropdown(introNotes);
  }
}

  //POPULATE DROPDOWN SELECTORS
function dojoLocationDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('dojo_location');
    for (var i = 0; i < values.length; i++) {
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      if (list != null){
        list.appendChild(option);
      }
    }
}

function newDojoLocationDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
  var list = document.getElementById('new_dojo_location');
  for (var i = 0; i < values.length; i++) {
    var option = document.createElement("option");
    option.value = values[i];
    option.text = values[i];
    if (list != null){
      list.appendChild(option);
    }
  }
}


function studentStatusDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('student_status');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      if (list != null){
        list.appendChild(option);
      }
    }
}

function newStudentStatusDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
  var list = document.getElementById('new_student_status');   
  for (var i = 0; i < values.length; i++){
    var option = document.createElement("option");
    option.value = values[i];
    option.text = values[i];
    if (list != null){
      list.appendChild(option);
    }
  }
}

function ageClassDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('age_class');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      if (list != null){
        list.appendChild(option);
      }
    }
}

function newAgeClassDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
  var list = document.getElementById('new_age_class');   
  for (var i = 0; i < values.length; i++){
    var option = document.createElement("option");
    option.value = values[i];
    option.text = values[i];
    if (list != null){
      list.appendChild(option);
    }
  }
}

function intro1TimeDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('intro1_time');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = new Date("2020-01-01 "+ values[i]+":00 PM").getHours() +":"+ new Date("2020-01-01 "+ values[i]+":00 PM").getMinutes();
      option.text = values[i];
      if (list != null){
        list.appendChild(option);
      }
    }
}

function newIntro1TimeDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
  var list = document.getElementById('new_intro1_time');   
  for (var i = 0; i < values.length; i++){
    var option = document.createElement("option");
    option.value = new Date("2020-01-01 "+ values[i]+":00 PM").getHours() +":"+ new Date("2020-01-01 "+ values[i]+":00 PM").getMinutes();
    option.text = values[i];
    if (list != null){
      list.appendChild(option);
    }
  }
}

function intro2TimeDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('intro2_time');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = new Date("2020-01-01 "+ values[i]+":00 PM").getHours() +":"+ new Date("2020-01-01 "+ values[i]+":00 PM").getMinutes();
      option.text = values[i];
      if (list != null){
        list.appendChild(option);
      }
    }
}  

function leadSourceDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('lead_source');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      if (list != null){
        list.appendChild(option);
      }
    }
}

function newLeadSourceDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
  var list = document.getElementById('new_lead_source');   
  for (var i = 0; i < values.length; i++){
    var option = document.createElement("option");
    option.value = values[i];
    option.text = values[i];
    if (list != null){
      list.appendChild(option);
    }
  }
}

function leadSourceSubcategoryDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('leadsource_subcategory');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      if (list != null){
        list.appendChild(option);
      }
    }
}  

function newLeadSourceSubcategoryDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
  var list = document.getElementById('new_leadsource_subcategory');   
  for (var i = 0; i < values.length; i++){
    var option = document.createElement("option");
    option.value = values[i];
    option.text = values[i];
    if (list != null){
      list.appendChild(option);
    }
  }
} 

function prospectPhaseDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('prospect_phase');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      if (list != null){
        list.appendChild(option);
      }
    }
}

function newProspectPhaseDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
  var list = document.getElementById('new_prospect_phase');   
  for (var i = 0; i < values.length; i++){
    var option = document.createElement("option");
    option.value = values[i];
    option.text = values[i];
    if (list != null){
      list.appendChild(option);
    }
  }
}

function introOfferDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('intro_offer');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      if (list != null){
        list.appendChild(option);
      }
    }
}

function newIntroOfferDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
  var list = document.getElementById('new_intro_offer');   
  for (var i = 0; i < values.length; i++){
    var option = document.createElement("option");
    option.value = values[i];
    option.text = values[i];
    if (list != null){
      list.appendChild(option);
    }
  }
}

function introNotesDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('intro_notes');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      if (list != null){
        list.appendChild(option);
      }
    }
}

function newIntroNotesDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
  var list = document.getElementById('new_intro_notes');   
  for (var i = 0; i < values.length; i++){
    var option = document.createElement("option");
    option.value = values[i];
    option.text = values[i];
    if (list != null){
      list.appendChild(option);
    }
  }
}

$("#myModal").on('hidden.bs.modal',function(){
        $(this).find('#myForm')[0].reset();
        $(this).find('.modal-title').text("New Record");
});

function testUndefined(value){
    if (value === undefined || value === NaN || value === "NaN:NaN" || value === "Invalid Date"){
      return "";
    }else{
      return value;
    }
};

function format(d){
    // `d` is the original data object for the row
  return '<div class="slider" style="width:100%">'+
        '<form id="editForm">'+
        '<div class="container">'+
                '<div class="row p-2">'+
                  '<div class="col-3 text-start border border-5 border-secondary border-end-0">'+
                  '<br>'+
                    '<label for="dojo_location">Dojo Location</label>'+
                      '<select class="form-control" id="dojo_location" name="dojo_location">'+
                        '<option>'+(testUndefined(d[3]))+'</option>'+
                      '</select>'+
                    '<label for="lead_date ">Lead Date</label>'+
                      '<input class="form-control" type="date" id="lead_date" name="lead_date" value="'+(testUndefined(d[1]))+'">'+
                    '<label for="inquire_date">Inquire Date</label>'+
                      '<input class="form-control" type="date" id="inquire_date" name="inquire_date" value="'+(testUndefined(d[2]))+'">'+
                    '<label for="student_status">Student Status</label>'+
                      '<select class="form-control" id="student_status" name="student_status">'+
                        '<option>'+(testUndefined(d[4]))+'</option>'+
                      '</select>'+
                  '</div>'+
                  '<div class="col-3 text-start border border-5 border-secondary border-end-0">'+
                    '<br>'+
                    '<label for="lead_firstname">First Name</label>'+
                      '<input class="form-control" type="text" id="lead_firstname" name="lead_firstname" value="'+(testUndefined(d[5]))+'">'+
                    '<label for="lead_lastname">Last Name</label>'+
                      '<input class="form-control" type="text"  id="lead_lastname" name="lead_lastname" value="'+(testUndefined(d[6]))+'">'+
                    '<label for="email">Email</label>'+
                      '<input class="form-control" type="email"  id="email" name="email" value="'+(testUndefined(d[8]))+'">'+
                    '<label for="phone">Phone</label>'+
                      '<input class="form-control phone" type="text"  id="phone2" name="phone" value="'+(testUndefined(d[7]))+'">'+
                  '</div>'+
                  '<div class="col-3 text-start border border-5 border-secondary">'+
                    '<br>'+
                    '<label for="lastcontact_date">Last Contact Date</label>'+
                      '<input class="form-control" type="date"  id="lastcontact_date" name="lastcontact_date" value="'+(testUndefined(d[9]))+'">'+
                    '<label for="leadsource">Lead Source</label>'+
                      '<select class="form-control"  id="lead_source" name="leadsource">'+
                        '<option>'+(testUndefined(d[24]))+'</option>'+
                      '</select>'+
                    '<label for="leadsource_subcategory">Leadsource Subcategory</label>'+
                      '<select class="form-control"  id="leadsource_subcategory" name="leadsource_subcategory">'+
                        '<option>'+(testUndefined(d[25]))+'</option>'+
                      '</select>'+
                    '<label for="prospect_phase">Prospect Phase</label>'+
                      '<select class="form-control"  id="prospect_phase" name="prospect_phase">'+
                        '<option>'+(testUndefined(d[23]))+'</option>'+
                      '</select>'+
                  '</div>'+
                  '<div class="col-3 text-start border border-5 border-secondary border-start-0">'+
                    '<br>'+
                      '<label for="address" class="" >Address</label>'+
                        '<input class="form-control" type="text" id="address" name="street_address" value="'+(testUndefined(d[34]))+'">'+
                      '<label for="city" class="" >'+"City"+'</label>'+
                        '<input class="form-control" type="text" id="city" name="city" value="'+(testUndefined(d[35]))+'">'+
                      '<label for="state" class="">'+"State"+'</label>'+
                        '<input class="form-control" type="text"  id="state" name="state" value="'+(testUndefined(d[36]))+'">'+
                      '<label for="zip" class="" >'+"Zip"+'</label>'+
                        '<input class="form-control" type="text" id="zip" name="zip" value="'+(testUndefined(d[37]))+'">'+
                      '<br>'+
                  '</div>'+ 
                '</div>'+  

                '<div class="row p-2">'+
                    '<div class="col-6 text-start border border-5 border-secondary border-end-0">'+
                        '<label for="communication_notes" class="p-2 ">Call Center Notes</label>'+
                          '<textarea class="form-control" id="communication_notes" name="communication_notes" rows="5">'+(testUndefined(d[27]))+'</textarea>'+
                      '<br>'+
                    '</div>'+
                    '<div class="col-6 text-start border border-5 border-secondary border-start-0">'+
                        '<label for ="dojo_notes" class="p-2" >Dojo Notes</label>'+
                          '<textarea class="form-control" id="dojo_notes" rows="5" name="dojo_notes">'+(testUndefined(d[30]))+'</textarea>'+
                        '<br>'+
                    '</div>'+
                '</div>'+

                '<div class="row p-2">'+
                    '<div class="col-3 text-start border border-5 border-secondary border-end-0">'+
                        '<br>'+
                        '<label for="participant_firstname" class="" >'+"Participant First Name"+'</label>'+
                          '<input class="form-control" type="text" id="participant_firstname" name="participant_firstname" value="'+(testUndefined(d[10]))+'">'+
                        '<label for="participant_lastname" class="" >'+"Participant Last Name"+'</label>'+
                          '<input class="form-control" type="text" id="particpant_lastname" name="participant_lastname" value="'+(testUndefined(d[11]))+'">'+
                        '<label for="gender" class="" >'+"Gender"+'</label>'+
                          '<select class="form-control" id="gender" name="gender">'+
                              '<option>'+(testUndefined(d[33]))+'</option>'+
                              '<option>Male</option>'+
                              '<option>Female</option>'+
                              '<option>Non-binary / other</option>'+
                          '</select>'+
                      '<div class="row">'+
                      '<div class="col-8">'+
                        '<label for="date_ofbirth" class="">'+"DOB"+'</label>'+
                          '<input class="form-control " type="date" id="date_ofbirth" name="date_ofbirth" value="'+(testUndefined(d[38]))+'">'+
                      '</div>'+                           
                        //AGE NEEDS TO BE AUTOMATICALLY CALCULATED
                      '<div class="col-4">'+
                        '<label for="age" class="">'+"Age"+'</label>'+
                          '<input class="form-control" type="text" id="age" value="'+(getAge(d[38]))+'">'+ 
                      '</div>'+ 
                      '</div>'+
                        '<label for="age_class" class="" >'+"Age Class"+'</label>'+
                          '<select class="form-control" id="age_class" name="age_class">'+
                            '<option>'+(testUndefined(d[12]))+'</option>'+
                          '</select>'+
                        '<br>'+                                                                                         
                    '</div>'+
                    '<div class="col-3 text-start border border-5 border-secondary border-end-0">'+
                        '<br>'+
                        '<label for="intro1_date" class="" >'+"Intro 1 Date"+'</label>'+
                          '<input class="form-control" type="date" id="intro1_date" name="intro1_date" value="'+(testUndefined(d[13]))+'">'+
                        '<label for="intro1_time" class="" >'+"Intro 1 Time"+'</label>'+
                          '<select class="form-control" id="intro1_time" name="intro1_time">'+
                              '<option>'+(testUndefined(d[14]))+'</option>'+
                          '</select>'+
                        '<label for="intro1_attended" class="">'+"Intro 1 Attended"+'</label>'+
                          '<select class="form-control" id="intro1_attended" name="intro1_attended">'+
                            '<option>'+(testUndefined(d[17]))+'</option>'+
                            '<option></option>'+
                            '<option>Yes</option>'+
                            '<option>No</option>'+
                          '</select>'+
                        '<br>'+
                        '<div class="text-center">'+
                          '<button class="btn btn-secondary intro1Calendar" id="intro1Calendar" type="button">Add to Calendar</button>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-3 text-start border border-5 border-secondary border-end-0">'+
                        '<br>'+
                        '<label for="intro2_date" class="" >'+"Intro 2 Date"+'</label>'+
                          '<input class="form-control" type="date" id="intro2_date" name="intro2_date" value="'+(testUndefined(d[18]))+'">'+
                        '<label for="intro2_time" class="" >'+"Intro 2 Time"+'</label>'+
                          '<select class="form-control" id="intro2_time" name="intro2_time">'+
                              '<option>'+(testUndefined(d[20]))+'</option>'+
                          '</select>'+
                        '<label for="intro2_attended" class="">'+"Intro 2 Attended"+'</label>'+
                          '<select class="form-control" id="intro2_attended" name="intro2_attended">'+
                            '<option>'+(testUndefined(d[22]))+'</option>'+
                            '<option></option>'+
                            '<option>Yes</option>'+
                            '<option>No</option>'+
                          '</select>'+
                        '<br>'+
                        '<div class="text-center">'+
                          '<button class="btn btn-secondary intro2Calendar" id="intro2Calendar" type="button">Add to Calendar</button>'+
                        '</div>'+
                        '<br>'+
                    '</div>'+                    
                    '<div class="col-3 text-start border border-5 border-secondary">'+  
                      '<br>'+
                        '<label for="interest" class="" >'+"Interest"+'</label>'+
                          '<input class="form-control" type="text" id="interest" name="interest" value="'+(testUndefined(d[26]))+'">'+  
                        '<label for="intro_offer" class="" >'+"Offer"+'</label>'+
                          '<select class="form-control" id="intro_offer" name="intro_offer">'+
                            '<option>'+(testUndefined(d[28]))+'</option>'+
                            '<option></option>'+   
                          '</select>'+ 
                        '<label for="dojo_notes" class="" >'+"Intro Notes"+'</label>'+
                          '<select class="form-control" id="intro_notes" name="intro_notes">'+
                            '<option>'+(testUndefined(d[29]))+'</option>'+
                            '<option></option>'+   
                          '</select>'+ 
                        '<br>'+
                        '<div class="text-center">'+
                          '<button class="btn btn-secondary welcomeForm" id="welcomeForm" type="button">Send Welcome Form</button>'+
                        '</div>'+                                                                                                                    
                    '</div>'+               
                '</div>'+
                '<div class="text-center">'+
                  '<button type="button" class="btn btn-secondary col" id="editFormReset" onClick="resetEditForm()">Cancel</button>'+
                  '<button type="button" class="btn btn-primary col save-btn" id="formSubmitButton" formtarget="_blank" onClick="updateRow(editForm,'+d[0]+')">Save</button>'+  
                '</div>'+          
        '</div>'+
        '</form>'+
    '</div>';
}

function newLeadsInit(){
        var table = $('#newLeads').DataTable({
            dom: "Britp",
            displayLength: 50,
            stateSave: true,
            ajax:{
                url:"https://sheets.googleapis.com/v4/spreadsheets/1HdgnSTtfFPBr5obA2hyuhLOqdaA2bmqIShW9IKVWNn0/values/CC_AllData!A2:AM?key=AIzaSyArmBSmCY-VxB3XIlgFuS5SdwG9p-skggs",
                dataSrc: "values",
            },
            columns: [
                {
                    data: null,
                    defaultContent: "",
                    className: "details-control-symbol",
                    width: "5px",
                },
                {
                    title: "Inquire Date",
                    data: 2,
                    render: function ( data, type, full, meta ) {
                      if(data != ""){
                        return moment(data).format('MM-DD-YYYY');
                      }else{
                        return moment("1111-11-11").format('MM-DD-YYYY');
                      }
                    },
                    width: "auto",
                },
                {
                    title: "Location",
                    data: 3,
                    width: "auto",

                },
                {
                    title: "Lead Name",
                    data: null,
                    render: function (data,type,row){
                    let firstName;
                    let lastName;
                    if(row[5] != null){
                      firstName = row[5];
                      }else{
                        firstName = "";
                      }
                      if(row[6] != null){
                        lastName = row[6];
                        }else{
                          lastName = "";
                        }


                      return firstName + " " + lastName;
                    },
                    width: "auto",

                },
                {
                  title: "Participant Name",
                  data: null,
                  render: function (data,type,row){
                    let firstName;
                    let lastName;
                    if(row[10] != null){
                      firstName = row[10];
                      }else{
                        firstName = "";
                      }
                      if(row[11] != null){
                        lastName = row[11];
                        }else{
                          lastName = "";
                        }


                      return firstName + " " + lastName;
                    },
                  width: "auto",

                },
                {
                    title: "Phone",
                    data: 7,
                    render: function ( data, type, full, meta ) {
                      if(data === "" || data === "undefined" || data == null){
                        return "1111111111";
                      }else{
                        return data;
                      }
                    },

                    width: "auto",

                },
                /*{
                    title: "Email",
                    data: 8,
                },*/
                {
                    title: "Last Action Date",
                    data: 9,
                    "render": function ( data, type, full, meta ) {
                    return moment(data).format('MM-DD-YYYY');
                    },
                    width: "auto",

                },
                {
                    title: "Source",
                    data: 24,
                    render: function ( data, type, full, meta ) {
                      if(data === "" || data === "undefined" || data == null){
                        return "";
                      }else{
                        return data;
                      }
                    },
                    width: "auto",

                },
                {
                    title: "Prospect Phase",
                    data: 23,
                    render: function ( data, type, full, meta ) {
                      if(data === "" || data === "undefined" || data == null){
                        return "";
                      }else{
                        return data;
                      }
                    },
                    width: "auto",

                },
                {   data: null,
                    title: "", 
                    defaultContent : '<i class="fa fa-backspace"></i>',
                    className: "delete-button",
                    width: "auto",

                }, 
            ],

            
            "buttons":
            {
                "buttons":[
                    { "extend": "csv", 
                      "text":'<i class="far fa-file-excel"></i>', 
                      "title": "Data Export",
                      "className": 'btn btn-secondary btn-block' 
                    },
                    { "extend": 'pdf', "text":'<i class="far fa-file-pdf"></i>', "className": 'btn btn-secondary btn-block' },
                    {
                    "text": '<i class="fas fa-sync"></i>',
                    "action": function (dt){
                        ajaxReload();
                    },
                    "className": "btn btn-secondary btn-block",
                    },
                    {
                    "text": '<i class="fas fa-plus"></i>',
                    "className": "btn btn-danger btn-block attr-test-btn",
                    "action": function (dt){
                        document.getElementById("myForm").reset();
                        $('.attr-test-btn')
                            .attr('data-toggle', 'modal')
                            .attr('data-target', '.modal-attr-test');
                    }
                    },
                    {
                        "extend": "searchPanes",
                        "className": "btn btn-primary searchPaneButton",
                        "config": {
                            cascadePanes: true,
                            layout: "columns-3",
                            columns: [2,7,8],
                            panes: [
                              {
                                header: "Ankeny",
                                options: [
                                  {
                                    label: "New Leads",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Ankeny" && rowData[23] === "01-New Lead/Not Yet Contacted") || (rowData[3] === "Ankeny" && rowData[23] === "00-Pre-Paid/Not Yet Contacted");
                                    }
                                  },
                                  {
                                    label: "Phone Tag",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Ankeny" && rowData[23] === "12-Intro 1 Phone Tag") || (rowData[3] === "Ankeny" && rowData[23] === "22-Intro 2 Phone Tag");
                                    }
                                  },
                                  {
                                    label: "Awaiting Response",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Ankeny" && rowData[23] === "30-Intro Completed -Waiting For Reply");
                                    }
                                  },
                                  {
                                    label: "Intro 1 Scheduled",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Ankeny" && rowData[23] === "10-Intro 1 Scheduled");
                                    }
                                  },
                                  {
                                    label: "Intro 2 Scheduled",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Ankeny" && rowData[23] === "20-Intro 2 Scheduled");
                                    }
                                  },
                                  {
                                    label: "No Shows",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Ankeny" && rowData[23] === "11-Intro 1 No Show-Needs Contacts") || (rowData[3] === "Ankeny" && rowData[23] === "21-Intro 2 No Show-Needs Contacts");
                                    }
                                  },
                                  {
                                    label: "Text/Email Marketing",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Ankeny" && rowData[23] === "90-Text and Email Marketing");
                                    }
                                  },
                                ],
                              },

                              {
                                header: "Johnston",
                                options: [
                                  {
                                    label: "New Leads",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Johnston" && rowData[23] === "01-New Lead/Not Yet Contacted") || (rowData[3] === "Ankeny" && rowData[23] === "00-Pre-Paid/Not Yet Contacted");
                                    }
                                  },
                                  {
                                    label: "Phone Tag",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Johnston" && rowData[23] === "12-Intro 1 Phone Tag") || (rowData[3] === "Ankeny" && rowData[23] === "22-Intro 2 Phone Tag");
                                    }
                                  },
                                  {
                                    label: "Awaiting Response",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Johnston" && rowData[23] === "30-Intro Completed -Waiting For Reply");
                                    }
                                  },
                                  {
                                    label: "Intro 1 Scheduled",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Johnston" && rowData[23] === "10-Intro 1 Scheduled");
                                    }
                                  },
                                  {
                                    label: "Intro 2 Scheduled",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Johnston" && rowData[23] === "20-Intro 2 Scheduled");
                                    }
                                  },
                                  {
                                    label: "No Shows",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Johnston" && rowData[23] === "11-Intro 1 No Show-Needs Contacts") || (rowData[3] === "Ankeny" && rowData[23] === "21-Intro 2 No Show-Needs Contacts");
                                    }
                                  },
                                  {
                                    label: "Text/Email Marketing",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Johnston" && rowData[23] === "90-Text and Email Marketing");
                                    }
                                  },
                                ],
                              },
                              {
                                header: "WDM",
                                options: [
                                  {
                                    label: "New Leads",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "WDM" && rowData[23] === "01-New Lead/Not Yet Contacted") || (rowData[3] === "Ankeny" && rowData[23] === "00-Pre-Paid/Not Yet Contacted");
                                    }
                                  },
                                  {
                                    label: "Phone Tag",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "WDM" && rowData[23] === "12-Intro 1 Phone Tag") || (rowData[3] === "Ankeny" && rowData[23] === "22-Intro 2 Phone Tag");
                                    }
                                  },
                                  {
                                    label: "Awaiting Response",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "WDM" && rowData[23] === "30-Intro Completed -Waiting For Reply");
                                    }
                                  },
                                  {
                                    label: "Intro 1 Scheduled",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "WDM" && rowData[23] === "10-Intro 1 Scheduled");
                                    }
                                  },
                                  {
                                    label: "Intro 2 Scheduled",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "WDM" && rowData[23] === "20-Intro 2 Scheduled");
                                    }
                                  },
                                  {
                                    label: "No Shows",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "WDM" && rowData[23] === "11-Intro 1 No Show-Needs Contacts") || (rowData[3] === "Ankeny" && rowData[23] === "21-Intro 2 No Show-Needs Contacts");
                                    }
                                  },
                                  {
                                    label: "Text/Email Marketing",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "WDM" && rowData[23] === "90-Text and Email Marketing");
                                    }
                                  },
                                ],
                              },

                              {
                                header: "Waukee",
                                options: [
                                  {
                                    label: "New Leads",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Waukee" && rowData[23] === "01-New Lead/Not Yet Contacted") || (rowData[3] === "Ankeny" && rowData[23] === "00-Pre-Paid/Not Yet Contacted");
                                    }
                                  },
                                  {
                                    label: "Phone Tag",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Waukee" && rowData[23] === "12-Intro 1 Phone Tag") || (rowData[3] === "Ankeny" && rowData[23] === "22-Intro 2 Phone Tag");
                                    }
                                  },
                                  {
                                    label: "Awaiting Response",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Waukee" && rowData[23] === "30-Intro Completed -Waiting For Reply");
                                    }
                                  },
                                  {
                                    label: "Intro 1 Scheduled",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Waukee" && rowData[23] === "10-Intro 1 Scheduled");
                                    }
                                  },
                                  {
                                    label: "Intro 2 Scheduled",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Waukee" && rowData[23] === "20-Intro 2 Scheduled");
                                    }
                                  },
                                  {
                                    label: "No Shows",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Waukee" && rowData[23] === "11-Intro 1 No Show-Needs Contacts") || (rowData[3] === "Ankeny" && rowData[23] === "21-Intro 2 No Show-Needs Contacts");
                                    }
                                  },
                                  {
                                    label: "Text/Email Marketing",
                                    value: function(rowData, rowIdx){
                                      return (rowData[3] === "Waukee" && rowData[23] === "90-Text and Email Marketing");
                                    }
                                  },
                                ],
                              },

                            ],

                            action: function(dt){
                            table.searchPanes.container().toggle();
                            }
                        }
                    },
                    {
                      "extend": "searchBuilder",
                      "className": "btn btn-primary searchBuilderButton",     
                    },
                    {
                      //"text": "Find Duplicates",
                      "className": "btn btn-primary findDuplicatesButton",
                      "action": function (e, dt, node, config){
                        var records = [];
                        table.column(5).data().each(function(value,index){
                          //console.log(value);
                          records.push(value);
                        });

                        $.fn.dataTable.ext.search.push(
                          function(settings, data, dataIndex){
                            var count = records.reduce(function(n, val){
                              //console.log(data[5]);
                              return n + (val == data[5]);
                            }, 0);

                            if (count >= 2){
                              return true;
                            }
                            return false;
                          }
                        );
                        
                      table.column(3).order('asc').draw();
                      }
                    },
                    {
                      //"text": "Restore Defaults",
                      "className": "btn btn-primary restoreDefaults",
                    },
                ],       
            },
            "initComplete": function(){
                newEntryDropdownStack();
                maskUp(); 
                $("div.dt-buttons").detach().appendTo('#headerList');  
                $('#darkSearchBox').keyup(function(){
                    table.search($(this).val()).draw();
                });   
                $('button.searchPaneButton').html('<i class="fas fa-filter"></i>'); 
                $('button.searchBuilderButton').html('<i class="fa fa-bullseye" aria-hidden="true"></i>'); 
                $('button.findDuplicatesButton').html('<i class="far fa-clone"></i>');
                $('button.restoreDefaults').html('<i class="fas fa-undo-alt"></i>');
                $('button.dt-button').removeClass('dt-button');
                $('table th').addClass('sticky')
            },
        });

    $('#newLeads tbody').on('click', 'td.details-control-symbol', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
        if ( row.child.isShown() ) {
          $('div.slider',row.child()).slideUp(function(){
                    row.child.hide();
                    tr.removeClass('shown');
                } );     
            }
        else
            {
            if ( table.row( '.shown' ).length  ) {
                      $('.details-control-symbol', table.row( '.shown' ).node()).click();
              }
              row.child( format(row.data()) ).show();
              tr.addClass('shown');
              dropdownStack();
              maskUp();
              $('div.slider', row.child()).slideDown();
        }
    });

    $('#newLeads tbody').on('click', 'button.intro1Calendar',function(){
        //console.log("Calendar1 button clicked!");
        var tr = $('#newLeads tbody tr.shown');
        //console.log(tr);
        var row = table.row(tr);
        //console.log(row.data());
        var data = row.data();
        checkCalendarEvents(data);
      });
    
      $('#newLeads tbody').on('click', 'button.intro2Calendar',function(){
        //console.log("Calendar2 button clicked!");
        var tr = $('#newLeads tbody tr.shown');
        var row = table.row(tr);
        //console.log(row.data());
        var data = row.data();
        checkCalendarEvent(data);
      });

      $('#newLeads tbody').on('click', 'button.welcomeForm',function(){
        //console.log("Welcome Form button clicked!!");
        var tr = $('#newLeads tbody tr.shown');
        var row = table.row(tr);
        //console.log(row.data());
        var data = row.data();
        sendWelcomeForm(data);
      });

    $('#newLeads tbody').on('click', 'td.delete-button', function(){
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        var response = confirm("Would you like to delete this record for "+row.data()[5]+" "+row.data()[6]+"?");
        if (response){
            deleteRow(row.data());
        }
      });

      $('.restoreDefaults').on('click', function(){
        console.log("Test Button Clicked!");
        $('#newLeads').DataTable().clear().destroy();
        //ajaxReload();
        //$('#newLeads').empty();
        //newLeadsInit();
        location.reload();
        
      });
      
      $('#newLeads').on('draw.dt', function (){  
        //console.log("Child rows at draw: "+childRows);
          //var tr = $(this).closest('tr');
          var row = table.row(childRows);
          if (childRows != undefined && childRows.length > 0) {
              childRows.every(function (rowIdx, tableLoop, rowLoop) {
                 //console.log("There was a child row present on draw.");
                  d = this.data();
                  this.child($(format(d))).show();
                  dropdownStack();
                  this.nodes().to$().addClass('shown');
                  $('div.slider', row.child()).slideDown();
                  //console.log('I was shown on table draw');
              });
          } else {
            //console.log("Nothing to see here...")
          }
        //console.log("Table drawn");              
      })//.dataTable();
      table.order([[1,'desc'],[3,'asc']]).draw();
      table.searchPanes.container().addClass('overflow-auto');
      table.columns(2).search(userFilter).draw();
      table.searchBuilder.container().addClass('w-100');
      //table.column(10).visible(false);
      //table.searchBuilder.container().prependTo(table.table().container());

}
