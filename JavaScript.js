//DECLARE ANY GLOBAL VARIABLES HERE


let GoogleAuth;
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/script.projects https://www.googleapis.com/auth/script.scriptapp https://www.googleapis.com/auth/script.deployments https://www.googleapis.com/auth/script.external_request https://www.googleapis.com/auth/presentations';
const spreadsheetId = "1HdgnSTtfFPBr5obA2hyuhLOqdaA2bmqIShW9IKVWNn0"; //prosepect manager
const appURL = "https://script.google.com/macros/s/AKfycbyKg5mLu1i9U16Cq_GLRLe-j4UEQgAdlVDzEG6S-BQ70HYc7T_t350oH5Z9_C5pDrLd/exec";
var childRows = $('#newLeads tr.shown');

    //All dropdown variables
    var dojoLocations = [
        "",
        "Ankeny",
        "Johnston",
        "Waukee",
        "WDM"
      ];
    
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
        "Alumni"
      ];
  
      var ageClasses = [
        "",
        "Ages 4-5",
        "Ages 6-7",
        "Ages 8-12",
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
        "10-Intro 1 Scheduled",
        "11-Intro 1 No Show-Needs Contacts",
        "12-Intro 1 Phone Tag",
        "20-Intro 2 Scheduled",
        "21-Intro 2 No Show-Needs Contacts",
        "22-Intro 2 Phone Tag",
        "70-Intro Completed -Enrolled",
        "30-Intro Completed -Waiting For Reply",
        "60-Intro Completed -Did Not Enrolled",
        "40-Never Attended Intro 1 -Lost Intros",
        "50-Never Attended Intro 2 -Lost Intros",
        "80-Formerly Enrolled"  
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
      GoogleAuth.signOut();
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
    var isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
      //console.log ("I am signed in as: "+ user.getBasicProfile().getName());
      $('#sign-in-or-out-button').html('Sign out');
      $('#sign-in-or-out-button').removeClass('btn btn-warning').addClass('btn btn-outline-light me-2');
      $('#auth-status').html('You are currently signed in and have granted ' +
          'access to this app.');
          newLeadsInit();
    ////////////////////Put dataTables init function here.
        //console.log("Login initialization complete...");
    } else {
      $('#sign-in-or-out-button').html('Sign In');
      $('#sign-in-or-out-button').removeClass('btn btn-outline-light me-2').addClass('btn btn-warning');
      $('#auth-status').html('You have not authorized this app or you are ' +
          'signed out.');
        if ($.fn.DataTable.isDataTable( '#newLeads' ) ) {
        //console.log("Signing out...");
        $('#newLeads').DataTable().destroy();
        $('#newLeads').empty();
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
    if (d.gsx$intro1date.$t !=="" && d.gsx$intro2date.$t === ""){
        introStage = "Intro 1";
    }else if(d.gsx$intro1date.$t !=="" && d.gsx$intro2date.$t !== "" && d.gsx$intro2Date.$t !== "NaN:NaN"){
        introStage = "Intro 2";
    }
    if (d.gsx$dojolocation.$t === "Ankeny"){
        dojoAddress = dojoAddresses[0];
    }else if (d.gsx$dojolocation.$t === "Johnston"){
        dojoAddress = dojoAddresses[1];
    }else if(d.gsx$dojolocation.$t === "WDM"){
        dojoAddress = dojoAddresses[2];
    }else if (d.gsx$dojolocation.$t === "Waukee"){
        dojoAddress = dojoAddresses[3];
    }

    return gapi.client.calendar.events.list({
        "calendarId": "info-"+d.gsx$dojolocation.$t+"@mydojos.com",
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
            calendarId = "info-"+d.gsx$dojolocation.$t+"@mydojos.com";
 
            var eventTitle = introStage+" - " +d.gsx$participantfirstname.$t+" "+d.gsx$participantlastname.$t;
            var description = "First Name: "+d.gsx$participantfirstname.$t+"\r\nLast Name: "+d.gsx$participantlastname.$t+"\r\nAge: "+(getAge(d.gsx$dateofbirth.$t))+"\r\nAge Class: "+d.gsx$ageclass.$t+"\r\nPhone: "+d.gsx$phone.$t+"\r\nEmail: "+d.gsx$email.$t+"\r\nIntro Notes: "+d.gsx$intronotes.$t;
            var sT = "";
            if (introStage === "Intro 1"){
                sT = new Date(new Date(d.gsx$intro1date.$t+" " +d.gsx$intro1time.$t));
                sT2 = sT.toLocaleString()
            }else if(introStage === "Intro 2"){
                sT = new Date(new Date(d.gsx$intro2date.$t+" " +d.gsx$intro2Time.$t));//add_minutes(d.gsx$intro2time.$t,12*60));
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
                              {'email': d.gsx$email.$t},
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
    var scriptId = "AKfycbyKg5mLu1i9U16Cq_GLRLe-j4UEQgAdlVDzEG6S-BQ70HYc7T_t350oH5Z9_C5pDrLd";
    var formInfo = {
        add_constantcontact: "",
        age_class: d.gsx$ageclass.$t,
        city: d.gsx$city.$t,
        communication_notes: d.gsx$communicationnotes.$t,
        date_ofbirth:d.gsx$dateofbirth.$t,
        dojo_location: d.gsx$dojolocation.$t,
        dojo_notes: d.gsx$dojonotes.$t,
        email: d.gsx$email.$t,
        gender: d.gsx$gender.$t,
        inquire_date: d.gsx$inquiredate.$t,
        interest: "",
        intro1_attended: "",
        intro1_date: d.gsx$intro1date.$t,
        intro1_endtime: "",
        intro1_starttime: "",
        intro1_time: d.gsx$intro1time.$t,
        intro2_attended:"",
        intro2_date:"",
        intro2_endtime:"",
        intro2_starttime:"",
        intro2_time:"",
        intro_notes: d.gsx$intronotes.$t,
        intro_offer: d.gsx$introoffer.$t,
        lastcontact_date: d.gsx$lastcontactdate.$t,
        lead_date: d.gsx$leaddate.$t,
        lead_firstname: d.gsx$leadfirstname,
        lead_lastname: d.gsx$leadlastname,
        leadsource: d.gsx$leadsource,
        leadsource_subcategory: d.gsx$leadsourcesubcategory.$t,
        participant_firstname: d.gsx$participantfirstname.$t,
        participant_lastname: d.gsx$participantlastname.$t,
        phone: d.gsx$phone.$t,
        prospect_phase: d.gsx$prospectphase.$t,
        send_introsheet: "",
        state: d.gsx$state.$t,
        street_address: d.gsx$streetaddress.$t,
        student_status: "",
        zip: d.gsx$zip.$t
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
          alert.log("Error calling API!");
          $('#welcomeForm').prop("disabled",false);
          $('#welcomeForm').html("Send Welcome Form");
      } else if (result.error) {
        // The API executed, but the script returned an error.
        // Extract the first (and only) set of error details.
        // The values of this object are the script's 'errorMessage' and
        // 'errorType', and an array of stack trace elements.
        var error = result.error.details[0];
        alert.log('Script error message: ' + error.errorMessage);
        $('#welcomeForm').prop("disabled",false);
        $('#welcomeForm').html("Send Welcome Form");

  
        if (error.scriptStackTraceElements) {
          // There may not be a stacktrace if the script didn't start
          // executing.            
            alert.log("Stack Trace Elements present!");
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
    const searchValue = rowData.gsx$recordid.$t;
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
                intro1TimeValue = ""
            }else {
                intro1TimeValue = new Date("2021-01-01 "+ formData.intro1_time.value).toLocaleTimeString();
            }
            if(formData.intro2_time.value == ""){
                intro2TimeValue = ""
            }else {
                intro2TimeValue = new Date("2021-01-01 "+ formData.intro2_time.value).toLocaleTimeString();
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
        age_class: formObject.age_class.value,
        city: "",
        communication_notes: formObject.communication_notes.value,
        date_ofbirth:"",
        dojo_location: formObject.dojo_location.value,
        dojo_notes: formObject.dojo_notes.value,
        email: formObject.email.value,
        gender: formObject.gender.value,
        inquire_date: formObject.inquire_date.value,
        interest: "",
        intro1_attended: "",
        intro1_date: formObject.intro1_date.value,
        intro1_endtime: "",
        intro1_starttime: "",
        intro1_time: (new Date("2021-01-01 "+formObject.intro1_time.value)).toLocaleTimeString(),//.toLocaleTimeString(),
        intro2_attended:"",
        intro2_date:"",
        intro2_endtime:"",
        intro2_starttime:"",
        intro2_time:"",
        intro_notes: formObject.intro_notes.value,
        intro_offer: formObject.intro_offer.value,
        lastcontact_date: formObject.lastcontact_date.value,
        lead_date: formObject.lead_date.value,
        lead_firstname: formObject.lead_firstname.value,
        lead_lastname: formObject.lead_lastname.value,
        leadsource: formObject.lead_source.value,
        leadsource_subcategory: formObject.leadsource_subcategory.value,
        participant_firstname: formObject.participant_firstname.value,
        participant_lastname: formObject.participant_lastname.value,
        phone: formObject.phone.value,
        prospect_phase: formObject.prospect_phase.value,
        send_introsheet: "",
        state: "",
        street_address: "",
        student_status: "",
        zip: ""
    }

    fetch(appURL,{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(formInfo) // body data type must match "Content-Type" header
      })
        .then($('#unCloseable').modal('show'))
        .then(res => res.json())
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
    dojoLocationDropdown(dojoLocations);
    studentStatusDropdown(studentStatuses);
    ageClassDropdown(ageClasses);
    intro1TimeDropdown(intro1Times);
    intro2TimeDropdown(intro2Times);
    leadSourceDropdown(leadSources);
    leadSourceSubcategoryDropdown(leadSourceSubcategories);
    prospectPhaseDropdown(prospectPhases);
    introOfferDropdown(introOffers);
    introNotesDropdown(introNotes); 
}
  
function newEntryDropdownStack(){
    dojoLocationDropdown(dojoLocations);
    studentStatusDropdown(studentStatuses);
    ageClassDropdown(ageClasses);
    intro1TimeDropdown(intro1Times);
    leadSourceDropdown(leadSources);
    leadSourceSubcategoryDropdown(leadSourceSubcategories);
    prospectPhaseDropdown(prospectPhases);
    introOfferDropdown(introOffers);
    introNotesDropdown(introNotes);
}

  //POPULATE DROPDOWN SELECTORS
function dojoLocationDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('dojo_location');  
    for (var i = 0; i < values.length; i++) {
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
}

function studentStatusDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('student_status');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
}

function ageClassDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('age_class');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
}

function intro1TimeDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('intro1_time');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = new Date("2020-01-01 "+ values[i]+":00 PM").getHours() +":"+ new Date("2020-01-01 "+ values[i]+":00 PM").getMinutes();
      option.text = values[i];
      list.appendChild(option);
    }
}

function intro2TimeDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('intro2_time');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = new Date("2020-01-01 "+ values[i]+":00 PM").getHours() +":"+ new Date("2020-01-01 "+ values[i]+":00 PM").getMinutes();
      option.text = values[i];
      list.appendChild(option);
    }
}  

function leadSourceDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('lead_source');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
}

function leadSourceSubcategoryDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('leadsource_subcategory');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
}  

function prospectPhaseDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('prospect_phase');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
}

function introOfferDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('intro_offer');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
}

function introNotesDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('intro_notes');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
}

$("#myModal").on('hidden.bs.modal',function(){
        $(this).find('#myForm')[0].reset();
        $(this).find('.modal-title').text("New Record");
});

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
                        '<option>'+d.gsx$dojolocation.$t+'</option>'+
                      '</select>'+
                    '<label for="lead_date ">Lead Date</label>'+
                      '<input class="form-control" type="date" id="lead_date" name="lead_date" value="'+d.gsx$leaddate.$t+'">'+
                    '<label for="inquire_date">Inquire Date</label>'+
                      '<input class="form-control" type="date" id="inquire_date" name="inquire_date" value="'+d.gsx$inquiredate.$t+'">'+
                    '<label for="student_status">Student Status</label>'+
                      '<select class="form-control" id="student_status" name="student_status">'+
                        '<option>'+d.gsx$studentstatus.$t+'</option>'+
                      '</select>'+
                  '</div>'+
                  '<div class="col-3 text-start border border-5 border-secondary border-end-0">'+
                    '<br>'+
                    '<label for="lead_firstname">First Name</label>'+
                      '<input class="form-control" type="text" id="lead_firstname" name="lead_firstname" value="'+d.gsx$leadfirstname.$t+'">'+
                    '<label for="lead_lastname">Last Name</label>'+
                      '<input class="form-control" type="text"  id="lead_lastname" name="lead_lastname" value="'+d.gsx$leadlastname.$t+'">'+
                    '<label for="email">Email</label>'+
                      '<input class="form-control" type="email"  id="email" name="email" value="'+d.gsx$email.$t+'">'+
                    '<label for="phone">Phone</label>'+
                      '<input class="form-control phone" type="text"  id="phone2" name="phone" value="'+d.gsx$phone.$t+'">'+
                  '</div>'+
                  '<div class="col-3 text-start border border-5 border-secondary">'+
                    '<br>'+
                    '<label for="lastcontact_date">Last Contact Date</label>'+
                      '<input class="form-control" type="date"  id="lastcontact_date" name="lastcontact_date" value="'+d.gsx$lastcontactdate.$t+'">'+
                    '<label for="leadsource">Lead Source</label>'+
                      '<select class="form-control"  id="lead_source" name="leadsource">'+
                        '<option>'+d.gsx$leadsource.$t+'</option>'+
                      '</select>'+
                    '<label for="leadsource_subcategory">Leadsource Subcategory</label>'+
                      '<select class="form-control"  id="leadsource_subcategory" name="leadsource_subcategory">'+
                        '<option>'+d.gsx$leadsourcesubcategory.$t+'</option>'+
                      '</select>'+
                    '<label for="prospect_phase">Prospect Phase</label>'+
                      '<select class="form-control"  id="prospect_phase" name="prospect_phase">'+
                        '<option>'+d.gsx$prospectphase.$t+'</option>'+
                      '</select>'+
                  '</div>'+
                  '<div class="col-3 text-start border border-5 border-secondary border-start-0">'+
                    '<br>'+
                      '<label for="address" class="" >Address</label>'+
                        '<input class="form-control" type="text" id="address" name="street_address" value="'+d.gsx$streetaddress.$t+'">'+
                      '<label for="city" class="" >'+"City"+'</label>'+
                        '<input class="form-control" type="text" id="city" name="city" value="'+d.gsx$city.$t+'">'+
                      '<label for="state" class="">'+"State"+'</label>'+
                        '<input class="form-control" type="text"  id="state" name="state" value="'+d.gsx$state.$t+'">'+
                      '<label for="zip" class="" >'+"Zip"+'</label>'+
                        '<input class="form-control" type="text" id="zip" name="zip" value="'+d.gsx$zip.$t+'">'+
                      '<br>'+
                  '</div>'+ 
                '</div>'+  

                '<div class="row p-2">'+
                    '<div class="col-6 text-start border border-5 border-secondary border-end-0">'+
                        '<label for="communication_notes" class="p-2 ">Call Center Notes</label>'+
                          '<textarea class="form-control" id="communication_notes" name="communication_notes" rows="5">'+d.gsx$communicationnotes.$t+'</textarea>'+
                      '<br>'+
                    '</div>'+
                    '<div class="col-6 text-start border border-5 border-secondary border-start-0">'+
                        '<label for ="dojo_notes" class="p-2" >Dojo Notes</label>'+
                          '<textarea class="form-control" id="dojo_notes" rows="5" name="dojo_notes">'+d.gsx$dojonotes.$t+'</textarea>'+
                        '<br>'+
                    '</div>'+
                '</div>'+

                '<div class="row p-2">'+
                    '<div class="col-3 text-start border border-5 border-secondary border-end-0">'+
                        '<br>'+
                        '<label for="participant_firstname" class="" >'+"Participant First Name"+'</label>'+
                          '<input class="form-control" type="text" id="participant_firstname" name="participant_firstname" value="'+d.gsx$participantfirstname.$t+'">'+
                        '<label for="participant_lastname" class="" >'+"Participant Last Name"+'</label>'+
                          '<input class="form-control" type="text" id="particpant_lastname" name="participant_lastname" value="'+d.gsx$participantlastname.$t+'">'+
                        '<label for="gender" class="" >'+"Gender"+'</label>'+
                          '<select class="form-control" id="gender" name="gender">'+
                              '<option>'+d.gsx$gender.$t+'</option>'+
                              '<option>Male</option>'+
                              '<option>Female</option>'+
                              '<option>Non-binary / other</option>'+
                          '</select>'+
                      '<div class="row">'+
                      '<div class="col-8">'+
                        '<label for="date_ofbirth" class="">'+"DOB"+'</label>'+
                          '<input class="form-control " type="date" id="date_ofbirth" name="date_ofbirth" value="'+d.gsx$dateofbirth.$t+'">'+
                      '</div>'+                           
                        //AGE NEEDS TO BE AUTOMATICALLY CALCULATED
                      '<div class="col-4">'+
                        '<label for="age" class="">'+"Age"+'</label>'+
                          '<input class="form-control" type="text" id="age" value="'+(getAge(new Date(d.gsx$dateofbirth.$t).toString()))+'">'+ 
                      '</div>'+ 
                      '</div>'+
                        '<label for="age_class" class="" >'+"Age Class"+'</label>'+
                          '<select class="form-control" id="age_class" name="age_class">'+
                            '<option>'+d.gsx$ageclass.$t+'</option>'+
                          '</select>'+
                        '<br>'+                                                                                         
                    '</div>'+
                    '<div class="col-3 text-start border border-5 border-secondary border-end-0">'+
                        '<br>'+
                        '<label for="intro1_date" class="" >'+"Intro 1 Date"+'</label>'+
                          '<input class="form-control" type="date" id="intro1_date" name="intro1_date" value="'+d.gsx$intro1date.$t+'">'+
                        '<label for="intro1_time" class="" >'+"Intro 1 Time"+'</label>'+
                          '<select class="form-control" id="intro1_time" name="intro1_time">'+
                              '<option>'+d.gsx$intro1time.$t+'</option>'+
                          '</select>'+
                        '<label for="intro1_attended" class="">'+"Intro 1 Attended"+'</label>'+
                          '<select class="form-control" id="intro1_attended" name="intro1_attended">'+
                            '<option>'+d.gsx$intro1attended.$t+'</option>'+
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
                          '<input class="form-control" type="date" id="intro2_date" name="intro2_date" value="'+d.gsx$intro2date.$t+'">'+
                        '<label for="intro2_time" class="" >'+"Intro 2 Time"+'</label>'+
                          '<select class="form-control" id="intro2_time" name="intro2_time">'+
                              '<option>'+d.gsx$intro2time.$t+'</option>'+
                          '</select>'+
                        '<label for="intro2_attended" class="">'+"Intro 2 Attended"+'</label>'+
                          '<select class="form-control" id="intro2_attended" name="intro2_attended">'+
                            '<option>'+d.gsx$intro2attended.$t+'</option>'+
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
                          '<input class="form-control" type="text" id="interest" name="interest" value="'+d.gsx$interest.$t+'">'+  
                        '<label for="intro_offer" class="" >'+"Offer"+'</label>'+
                          '<select class="form-control" id="intro_offer" name="intro_offer">'+
                            '<option>'+d.gsx$introoffer.$t+'</option>'+
                            '<option></option>'+   
                          '</select>'+ 
                        '<label for="dojo_notes" class="" >'+"Intro Notes"+'</label>'+
                          '<select class="form-control" id="intro_notes" name="intro_notes">'+
                            '<option>'+d.gsx$intronotes.$t+'</option>'+
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
                  '<button type="button" class="btn btn-primary col save-btn" id="formSubmitButton" formtarget="_blank" onClick="updateRow(editForm,'+d.gsx$recordid.$t+')">Save</button>'+  
                '</div>'+          
        '</div>'+
        '</form>'+
    '</div>';
}

function newLeadsInit(){
        var table = $('#newLeads').DataTable( {
        "searchHighlight": true,
        //"dom": "BQlfritp",
        "dom": "Britp",
        "iDisplayLength":50,
        "stateSave": true,
        "bServerSide":false,
        "bProcessing":true,
        "sAjaxDataProp": "feed.entry",
        "sAjaxSource": "https://spreadsheets.google.com/feeds/list/1HdgnSTtfFPBr5obA2hyuhLOqdaA2bmqIShW9IKVWNn0/1/public/full?alt=json",
        "aoColumns": [
        {   "data": null, 
            "defaultContent" : "",
            "className": "details-control-symbol",
            "width": "5px"
        }, 
        {   "title": "Inquiry Date",
            "mDataProp": "gsx$inquiredate.$t",

            "render": function ( data, type, full, meta ) {
              return moment(data).format('MM-DD-YYYY');
             }
        },
        {   "title": "Location",
            "mDataProp": "gsx$dojolocation.$t"
        },
        {
            "title": "Lead Name",
            "data": null,
            "render": function (data,type,row){
            return row.gsx$leadfirstname.$t+" "+row.gsx$leadlastname.$t
            }
        },
        {
            "title": "Phone",
            "mDataProp": "gsx$phone.$t"
        },
        {
            "title": "Email",
            "mDataProp": "gsx$email.$t"
        },
        {
            "title": "Last Action Date",
            "mDataProp": "gsx$lastcontactdate.$t",
            "render": function ( data, type, full, meta ) {
              return moment(data).format('MM-DD-YYYY');
             }
        },
        {
            "title": "Source",
            "mDataProp": "gsx$leadsource.$t"
        },
        {
            "title": "Prospect Phase",
            "mDataProp": "gsx$prospectphase.$t"
        },
        {   "data": null,
            "title": "", 
            "defaultContent" : '<i class="fa fa-backspace"></i>',
            "className": "delete-button",
        },  
        ],
        "buttons":
        {
        "buttons":[
            { "extend": "csv", "text":'<i class="far fa-file-excel"></i>', "className": 'btn btn-secondary btn-block' },
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
                "extend": 'searchPanes',
                "className": "btn btn-primary searchPaneButton",
                "config": {
                    cascadePanes: true,
                    layout: "columns-3",
                    action: function(dt){
                      table.searchPanes.container().toggle();
                    }
                }
            },
            {
              "extend": "searchBuilder",
              "className": "btn btn-primary searchBuilderButton",

            }, 
        ],       
        },
        "initComplete": function(){
        newEntryDropdownStack();
        maskUp(); 
        $("div.dt-buttons").detach().appendTo('#headerList');  
        //$('#darkSearchBox').addClass('dataTables_filter');
        $('#darkSearchBox').keyup(function(){
            table.search($(this).val()).draw() ;
        });   
        $('button.searchPaneButton').html('<i class="fas fa-filter"></i>'); 
        $('button.searchBuilderButton').html('<i class="fa fa-bullseye" aria-hidden="true"></i>'); 
        $('button.dt-button').removeClass('dt-button');
        $('table th').addClass('sticky')
    },            
    });

    $('#newLeads tbody').on('click', 'td.details-control-symbol', function () {
        var tr = $(this).closest('tr');
        //console.log(tr);
        var row = table.row( tr );
        //console.log(row);
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
        var response = confirm("Would you like to delete this record for "+row.data().gsx$leadfirstname.$t+" "+row.data().gsx$participantlastname.$t+"?");
        if (response){
            deleteRow(row.data());
        }
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
      }).dataTable();
      table.order([2,"desc"]);
      table.column(1).visible(false);
      //table.searchBuilder.container().prependTo(table.table().container());

}
